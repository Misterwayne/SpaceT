import React, { useState } from 'react';
import axios from 'axios';
import DateInput from './component/DateInput';
import CanvasRenderer from './component/Canvas'

const App = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const [Description, setSelectedDescription] = useState("");
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
      const description = await axios.get(`http://localhost:8000/asteroids/description?name=${asteroid.name}`);
      setSelectedDescription(description.data.description);
      asteroid.description = Description
      setSelectedAsteroid(asteroid)
      console.log(Description)
    } catch (error) {
      console.error('Error fetching asteroid details:', error);
    }
  };

  return (
    <div>
      <h1 class="tiltle">NASA Asteroids</h1>
      <DateInput onSubmit={fetchAsteroids} />
      <h1 className='tiltle'>Asteroids</h1>
      <ul style={{position: 'absolute', height: '60%', zIndex: 1, overflow: 'auto',background: '##0000008f'}}>
        {asteroids.map(asteroid => (
          <li key={asteroid.id} onClick={() => handleItemClick(asteroid)} style={{padding: '2px', border: '1px white solid', color:'white', background: '##0000008f'}}>
            {asteroid.name}
          </li>
        ))}
      </ul>
      <div class="bg">
      <img src='/static/images/MotleyFool-TMOT-6b0d4105-space.webp'alt="background" class="background-image"/>   
      </div>
      <section class="content">
        <CanvasRenderer asteroids={asteroids} onItemClick={handleItemClick} selected={selectedAsteroid} description={Description} />
      </section>
    </div>
  );
};

export default App;
