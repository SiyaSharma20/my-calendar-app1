import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewItems.css';
import AuthenticatedHeader from './AuthenticatedHeader';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

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
      } else {
        console.error('Failed to delete item. Server returned:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
    <AuthenticatedHeader />
    <div className="container">
      <div className="header">
        <h2>View Items</h2>
      </div>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item._id} className="item">
            <h3>{item.itemName}</h3>
            <p><strong>Description:</strong> {item.itemDescription}</p>
            <p><strong>Date:</strong> {formatDate(item.selectedDate)}</p>
            <p><strong>Tag:</strong> {item.itemTag}</p>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default ViewItems;

