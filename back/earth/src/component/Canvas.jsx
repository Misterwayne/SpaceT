import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { RotatingLines } from "react-loader-spinner";

function Loader() {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  );
}


const CanvasRenderer = ({ asteroids, selected, description, loading }) => {
  const canvasRef = useRef(null);
  const [selectedAsteroid, setSelectedAsteroid] = useState(selected);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false); // État pour suivre le chargement
  const backgroundImage = new Image();
  backgroundImage.src = "/static/images/earth-space.jpg";
  const asteroidImage = new Image();
  asteroidImage.src = "/static/images/asteroid.png";
  const asteroidImage2 = new Image();
  asteroidImage2.src = "/static/images/select_asteroid.png";
  

  const fetchDescription = async (asteroid) => {
    const response = await axios.get(`http://localhost:8000/asteroids/description?name=${asteroid.name}`);
    return response.data.description; // Assuming the response structure is { description: '...' }
  };

  // Transform the data using useMemo to optimize performance
  const transformedAsteroids = useMemo(() => {
    return asteroids.map(asteroid => {
      const x = Math.floor(Math.random() * (window.innerWidth- 0)) + 0; // Random starting X position
      const y = Math.floor(Math.random() * (window.outerHeight + 10));// Random starting Y position
      const velocityX = Number(asteroid.close_approach_data[0].relative_velocity['kilometers_per_second']) / 10; // Random velocity in X direction
      const description = ''
      return {
       ...asteroid,
        x, // Position
        y, // Position
        velocityX,
        description, // Velocity in X direction
      };
    });
  }, [asteroids]); // Re-compute if asteroidsData changes

  useEffect(() =>{
    setIsLoading(loading)
  }, [loading])

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;


    const render = () => {
      // Clear the canvas for the next frame
      context.clearRect(0, 0, canvas.width, canvas.height);

      transformedAsteroids.forEach((asteroid) => {
        // Update asteroid position
        asteroid.x += asteroid.velocityX;

        // Check boundary conditions
        if (asteroid.x > canvas.width) {
          asteroid.x = 0; // Reset position if asteroid moves out of canvas
        } else if (asteroid.x < 0) {
          asteroid.x = canvas.width; // Reset position if asteroid moves out of canvas
        }

        // Draw asteroid
        // Use the color property to determine the fill color
        let name = null
        if (selected) {
          name = selected.name
        }
        if (asteroid.name === name) {
          context.drawImage(asteroidImage2, asteroid.x, asteroid.y, asteroid.estimated_diameter.meters['estimated_diameter_min'] / 10, asteroid.estimated_diameter.meters['estimated_diameter_min'] / 10);
        } else {
          context.drawImage(asteroidImage, asteroid.x, asteroid.y, asteroid.estimated_diameter.meters['estimated_diameter_min'] / 10, asteroid.estimated_diameter.meters['estimated_diameter_min'] / 10);
        }
        
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [transformedAsteroids, selected]);

  useEffect(() => {
    setSelectedAsteroid(selected)

    console.log('test', selected?.name)
  }, [selected])

  useEffect(() => {
    setSelectedDescription(description)
  }, [description])

  // Add click event listener to the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const handleClick = async (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Determine which asteroid was clicked
      const clickedAsteroid = transformedAsteroids.find((asteroid) => {
        const asteroidRect = {
          left: asteroid.x - asteroid.estimated_diameter.meters['estimated_diameter_min'] / 10,
          top: asteroid.y - asteroid.estimated_diameter.meters['estimated_diameter_min'] / 10,
          width: asteroid.estimated_diameter.meters['estimated_diameter_min'] / 5,
          height: asteroid.estimated_diameter.meters['estimated_diameter_min'] / 5,
        };
        return x > asteroidRect.left && x < asteroidRect.left + asteroidRect.width &&
               y > asteroidRect.top && y < asteroidRect.top + asteroidRect.height;
      });

      setIsLoading(true);
      const newdescription = await fetchDescription(clickedAsteroid);
      clickedAsteroid.description = newdescription
      // Update the selected asteroid state with the fetched description
      selected = clickedAsteroid
      setSelectedAsteroid(clickedAsteroid);
      setIsLoading(false) // Update the selected asteroid state
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [transformedAsteroids]);

  // Set canvas dimensions to full screen
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.outerHeight;
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
      {selectedAsteroid &&
        <div>
        {!isLoading ? (
          <div style={{ position: 'absolute', top: 0, right: 0, color: 'white', background: '#0000008f', padding: '10px', border: '2px solid white', width: '50vh'}}>
          <h3>{selectedAsteroid.name}</h3>
          <p>Estimated Diameter: {selectedAsteroid.estimated_diameter.meters['estimated_diameter_min']} meters</p>
          <p>Relative Velocity: {selectedAsteroid.velocityX} km/s</p>
          <p>Closest Approach Date: {selectedAsteroid.close_approach_data[0].close_approach_date}</p>
          <p>Orbit Class: {selectedAsteroid.orbit_class}</p>
          <p>Is Potentially Hazardous: {selectedAsteroid.is_potentially_hazardous_asteroid? 'Yes' : 'No'}</p>
          <p><a href={selectedAsteroid.nasa_jpl_url} target="_blank">NASA/JPL Data</a></p>
          <p><a href={selectedAsteroid.links.self} target="_blank">NASA API Data</a></p>
          {selectedAsteroid.description ? (
              <p style={{overflow: 'auto'}}>{selectedAsteroid.description}</p>
            ) : <p style={{overflow: 'auto'}}>{description}</p>
          }
          </div>
        ) : (
          <div style={{ position: 'absolute', top: 100, right: 100}}><Loader/></div>
        )}
        </div>
      }
    </div>
  );
};

export default CanvasRenderer;