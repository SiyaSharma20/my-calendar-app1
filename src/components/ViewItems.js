import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewItems.css';
import AuthenticatedHeader from './AuthenticatedHeader';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

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

  const handleEdit = (itemId) => {
    try {
      console.log('Redirecting to Edit items with item ID:', itemId);
      navigate(`/edititems/${itemId}`);  // Pass the item ID as a parameter in the URL
    } catch (error) {
      console.error('Error redirecting to Edit Items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpdate = async (updatedItem) => {
    try {
      console.log('Sending PUT request for item with id:', updatedItem._id);

      const response = await axios.put(
        `http://localhost:4000/api/events/${updatedItem._id}`,
        updatedItem
      );

      console.log('PUT request successful. Server response:', response);

      if (response.status === 200) {
        // Update the item in the state
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedItem._id ? updatedItem : item
          )
        );
        // Redirect back to the View Items page after successful update
        navigate('/view-items');
      } else {
        console.error(
          'Failed to update item. Server returned:',
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

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
            <h2>Event List</h2>
            <ul className="item-list">
              {items.map((item) => (
                <li key={item._id} className="item">
                  <h3>{item.itemName}</h3>
                  <p><strong>Date:</strong> {moment(item.selectedDate).format('MMMM D, YYYY')}</p>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                  <button onClick={() => handleEdit(item._id)}>Edit</button>
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

