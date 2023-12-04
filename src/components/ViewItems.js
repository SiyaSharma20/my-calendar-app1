import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewItems.css';
import AuthenticatedHeader from './AuthenticatedHeader';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/events');
      if (response.status === 200) {
        setItems(response.data);
      } else {
        setError(`Failed to fetch items. Server returned: ${response.status} ${response.data}`);
      }
    } catch (error) {
      setError(`Error fetching items: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      console.log('Sending DELETE request for item with id:', itemId);

      const response = await axios.delete(`http://localhost:4000/api/events/${itemId}`);

      console.log('DELETE request successful. Server response:', response);

      if (response.status === 200) {
        setItems((prevItems) => prevItems.filter(item => item._id !== itemId));
        clearSelectedEvent();
      } else {
        console.error('Failed to delete item. Server returned:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const clearSelectedEvent = () => {
    setSelectedEvent(null);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  const events = items.map(item => ({
    id: item._id,
    title: item.itemName,
    start: new Date(item.selectedDate),
    end: new Date(item.selectedDate),
  }));

  return (
    <div>
      <AuthenticatedHeader />
      <div className="container">
        <div className="header">
          <h2>View Items</h2>
        </div>
        <div className="content">
          <div className="calendar-container">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={event => setSelectedEvent(event)}
            />
          </div>
          <div className="event-list-container">
            <h2>To Do</h2>
            <ul className="item-list">
              {items.map((item) => (
                <li key={item._id} className="item">
                  <h3>{item.itemName}</h3>
                  <p><strong>Date:</strong> {moment(item.selectedDate).format('MMMM D, YYYY')}</p>
                  <img src={item.itemImage} alt={item.itemDescription} width="500px"/>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                  <button onClick={() => console.log('Edit button clicked')}>Edit</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewItems;
