import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './EditItem.css';
import AuthenticatedHeader from './AuthenticatedHeader';

const EditItem = ({ itemsList, onEditSubmit, selectedItemId }) => {
  const [editedItem, setEditedItem] = useState({
    _id: '',
    itemName: '',
    itemDescription: '',
    selectedDate: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Find the selected item by ID and set it to state
    const selectedItem = itemsList.find(item => item._id === selectedItemId);
    if (selectedItem) {
      setEditedItem({
        ...selectedItem,
        // Ensure the date is in the correct format for the date input field
        selectedDate: selectedItem.selectedDate ? new Date(selectedItem.selectedDate).toISOString().split('T')[0] : ''
      });
    }
  }, [itemsList, selectedItemId]);

  const validate = () => {
    // Check if all fields are filled
    if (
      !editedItem.itemName ||
      !editedItem.itemDescription ||
      !editedItem.selectedDate
    ) {
      console.log('Please fill in all fields.');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setEditedItem({
      _id: '',
      itemName: '',
      itemDescription: '',
      selectedDate: '',
    });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Edited Item Data:', editedItem);
      onEditSubmit({
        ...editedItem,
        selectedDate: new Date(editedItem.selectedDate) // Convert back to Date object for submission
      });
      resetForm();
    }
  };

  return (
    <div>
      <div className="EditItem">
        <h2>Edit Item</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Item Name
              <input
                type="text"
                value={editedItem.itemName}
                onChange={(e) => setEditedItem({ ...editedItem, itemName: e.target.value })}
              />
            </label>
            <br />
            <label>
              Description
              <input
                type="text"
                value={editedItem.itemDescription}
                onChange={(e) => setEditedItem({ ...editedItem, itemDescription: e.target.value })}
              />
            </label>
            <br />
            <label>
              Date
              <input
                type="date"
                value={editedItem.selectedDate}
                onChange={(e) => setEditedItem({ ...editedItem, selectedDate: e.target.value })}
              />
            </label>
          </div>
          <br />
          <button type="submit">Save Changes</button>
        </form>
        {isSubmitted && <div className="success-message">Item edited successfully!</div>}
      </div>
    </div>
  );
};

export default EditItem;