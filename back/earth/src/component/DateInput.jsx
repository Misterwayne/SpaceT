import React, { useState, useEffect } from 'react';

const DateInput = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  useEffect(() => {
    if (startDate !== '') {

      const today = new Date(startDate);
      // Calculez la date minimale et maximale pour restreindre la sélection à 7 jours
      console.log(startDate)
      const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
      
      document.querySelector('[type="date"][value="' + endDate + '"]').min = minDate.toISOString().split('T')[0];
      document.querySelector('[type="date"][value="' + endDate + '"]').max = maxDate.toISOString().split('T')[0];
    }
  }, [startDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(startDate, endDate);
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(6, 6, 6, 0.46)', padding: '20px', borderRadius: '10px' }}>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={{ width: '10%', height: '40px', margin: '10px 0' }}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={{ width: '10%', height: '40px', margin: '10px 0' }}
      />
      <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>Submit</button>
    </form>
  );
};

export default DateInput;

