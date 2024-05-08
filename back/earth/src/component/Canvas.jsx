import React, { useState, useEffect, useRef, useMemo } from 'react';

const CanvasRenderer = ({ asteroids }) => {
  const canvasRef = useRef(null);
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const backgroundImage = new Image();
  backgroundImage.src = "/static/images/MotleyFool-TMOT-6b0d4105-space.webp";

  // Transform the data using useMemo to optimize performance
  const transformedAsteroids = useMemo(() => {
    return asteroids.map(asteroid => {
      const x = Math.random() * window.innerWidth; // Random starting X position
      const y = Math.random() * window.innerHeight; // Random starting Y position
      const velocityX = Number(asteroid.close_approach_data[0].relative_velocity['kilometers_per_second']) / 10; // Random velocity in X direction

      return {
       ...asteroid,
        x, // Position
        y, // Position
        velocityX, // Velocity in X direction
      };
    });
  }, [asteroids]); // Re-compute if asteroidsData changes

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
        context.beginPath();
        context.arc(asteroid.x, asteroid.y, asteroid.estimated_diameter.meters['estimated_diameter_min'] / 20, 0, 2 * Math.PI);
        context.fillStyle = 'white';
        context.fill();
        context.closePath();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [transformedAsteroids]);

  // Add click event listener to the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const handleClick = (event) => {
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

      setSelectedAsteroid(clickedAsteroid);
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
    canvas.height = window.innerHeight;
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
      {selectedAsteroid && (
        <div style={{ position: 'absolute', top: 0, right: 0, color: 'white', background: 'black'}}>
          <h3>{selectedAsteroid.name}</h3>
          <p>Estimated Diameter: {selectedAsteroid.estimated_diameter.meters['estimated_diameter_min']} meters</p>
          <p>Relative Velocity: {selectedAsteroid.velocityX} km/s</p>
          <p>Closest Approach Date: {selectedAsteroid.close_approach_data[0].close_approach_date}</p>
          <p>Orbit Class: {selectedAsteroid.orbit_class}</p>
          <p>Is Potentially Hazardous: {selectedAsteroid.is_potentially_hazardous_asteroid? 'Yes' : 'No'}</p>
          <p><a href={selectedAsteroid.nasa_jpl_url} target="_blank">NASA/JPL Data</a></p>
          <p><a href={selectedAsteroid.links.self} target="_blank">NASA API Data</a></p>
        </div>
      )}
    </div>
  );
};

export default CanvasRenderer;
