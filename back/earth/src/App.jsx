import React, { useState } from 'react';
import axios from 'axios';
import DateInput from './component/DateInput';
import AsteroidList from './component/AsteroidList';
import AsteroidDetail from './component/AsteroidDetails';
import CanvasRenderer from './component/Canvas'

const App = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchAsteroids = async (startDate, endDate) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/asteroids/?start_date=${startDate}&end_date=${endDate}`
      );
      console.log(response)
      setAsteroids(response.data.asteroids);
    } catch (error) {
      console.error('Error fetching asteroids:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage(`Error: ${error.response.data.error_message}`);
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('Error: No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage(`Error: ${error.message}`);
      }
    }
  };

  const handleItemClick = async (asteroid) => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${asteroid.id}?api_key=C19kqwt7QP6bxW07ckplyYYedRVjrpAOiuaagRbB`
      );
      setSelectedAsteroid(response.data);
      console.log(selectedAsteroid)
    } catch (error) {
      console.error('Error fetching asteroid details:', error);
    }
  };

  return (
    <div>
      <h1 class="tiltle">NASA Asteroids</h1>
      <DateInput onSubmit={fetchAsteroids} />
      <div class="bg">
      <img src='/static/images/MotleyFool-TMOT-6b0d4105-space.webp'alt="background" class="background-image"/>   
      </div>
      <section class="content">
        <CanvasRenderer asteroids={asteroids} onItemClick={handleItemClick} />
      </section>
    </div>
  );
};

export default App;
