import React from 'react';

const AsteroidDetail = ({ asteroid }) => {
  return (
    <div>
      <p>Name: {asteroid.name}</p>
      <p>Size: {asteroid.size}</p>
      <p>Distance: {asteroid.distance}</p>
      <p>Next Pass Date: {asteroid.next_pass_date}</p>
    </div>
  );
};

export default AsteroidDetail;
