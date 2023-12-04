import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewItems.css';
import AuthenticatedHeader from './AuthenticatedHeader';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (item) => {
    try {
      console.log('Redirecting to Edit Items with item details:', item);
      // Redirect to the specified URL for editing with item details as parameters
      navigate(`/edititems?itemId=${item._id}&itemName=${encodeURIComponent(item.itemName)}&itemDescription=${encodeURIComponent(item.itemDescription)}&selectedDate=${item.selectedDate}&itemTag=${encodeURIComponent(item.itemTag)}`);
    } catch (error) {
      console.error('Error redirecting to Edit Items:', error);
    }
  };
  

  const handleUpdate = async (updatedItem) => {
    try {
      console.log('Sending PUT request for item with id:', updatedItem._id);

      const response = await axios.put(`http://localhost:4000/api/events/${updatedItem._id}`, updatedItem);

      console.log('PUT request successful. Server response:', response);

      if (response.status === 200) {
        // Update the item in the state
        setItems((prevItems) =>
          prevItems.map((item) => (item._id === updatedItem._id ? updatedItem : item))
        );
        // Redirect back to the View Items page after successful update
        navigate('/view-items');
      } else {
        console.error('Failed to update item. Server returned:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
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
            <button onClick={() => handleEdit(item._id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default ViewItems;

