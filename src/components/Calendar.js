import React from 'react';
import './Calendar.css';

const Calendar = () => {
  // Generate days for the month of October 2023
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="calendar-container">
      <h2>December 2023</h2>
      <div className="calendar-navigation">
        <button className="calendar-nav-button">{'<'}</button>
        <button className="calendar-nav-button">{'>'}</button>
      </div>
      <div className="calendar-grid">
        {days.map((day) => (
          <div key={day} className="calendar-day">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
