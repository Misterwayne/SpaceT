import React from 'react';

const AsteroidList = ({ asteroids, onItemClick }) => {
  return (
    <ul>
      {asteroids?.map((asteroid) => (
        <li key={asteroid.name} onClick={() => onItemClick(asteroid)}>
          {asteroid.name} - {asteroid.size} - {asteroid.distance} -{' '}
          {asteroid.next_pass_date}
        </li>
      ))}
    </ul>
  );
};

export default AsteroidList;
