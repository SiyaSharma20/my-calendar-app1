import React from 'react';
import './ButtonContainer.css';
import { useNavigate } from 'react-router-dom';

const ButtonContainer = () => {
  const navigate = useNavigate();
  return (
    <div className="button-container">
      <button onClick={() => navigate('/viewitems')} className="new-button">
        My Items
      </button>
      <button onClick={() => navigate('/additem')} className="new-button">
        Add Item
      </button>
      <button className="new-button">Edit Item</button>
      <button className="new-button">Delete Item</button>
    </div>
  );
};

export default ButtonContainer;
