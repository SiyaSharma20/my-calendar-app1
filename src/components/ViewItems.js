import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewItems.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h2>View Items</h2>
      </div>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item">
            <h3>{item.itemName}</h3>
            <p><strong>Description:</strong> {item.itemDescription}</p>
            <p><strong>Date:</strong> {formatDate(item.selectedDate)}</p>
            <p><strong>Tag:</strong> {item.itemTag}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewItems;
