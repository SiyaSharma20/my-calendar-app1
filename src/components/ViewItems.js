import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewItems = () => {
  const [items, setItems] = useState([]);
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
      }
    };

    fetchItems();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>View Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>Name:</strong> {item.itemName},{' '}
            <strong>Description:</strong> {item.itemDescription}, <strong>Date:</strong>{' '}
            {item.selectedDate}, <strong>Tag:</strong> {item.itemTag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewItems;
