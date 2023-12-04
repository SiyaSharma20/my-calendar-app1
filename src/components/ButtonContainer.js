import React from 'react';
import './ButtonContainer.css';
import { useNavigate } from 'react-router-dom';

const ButtonContainer = () => {
  const navigate = useNavigate();
  const handleEditItemClick = () => {
    navigate('/edititems');
  };

  return (
    <div className="button-container">
      <button onClick={() => navigate('/viewitems')} className="new-button">
        My Items
      </button>
      <button onClick={() => navigate('/additem')} className="new-button">
        Add Item
      </button>
    </div>
  );
};

export default ButtonContainer;
