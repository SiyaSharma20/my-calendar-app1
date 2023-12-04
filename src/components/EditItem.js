import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './EditItem.css';
import AuthenticatedHeader from './AuthenticatedHeader';

const EditItem = ({ itemsList, onEditSubmit }) => {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [editedItem, setEditedItem] = useState({
    itemName: '',
    itemDescription: '',
    itemImage: '',
    itemTag: '',
    selectedDate: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedItemId) {
      const selected = itemsList.find((item) => item.id === selectedItemId);
      if (selected) {
        setEditedItem(selected);
      }
    }
  }, [selectedItemId, itemsList]);

  const handleItemChange = (e) => {
    setSelectedItemId(e.target.value);
  };

  const validate = () => {
    let isValid = true;
    if (!editedItem.itemName) {
      isValid = false;
      console.log('Item name is required.');
    }

    if (!editedItem.itemDescription) {
      isValid = false;
      console.log('Description is required.');
    }

    if (!editedItem.selectedDate) {
      isValid = false;
      console.log('Date is required.');
    }

    if (!editedItem.itemImage) {
      isValid = false;
      console.log('Link is required.');
    }
    return isValid;
  };

  const resetForm = () => {
    setSelectedItemId('');
    setEditedItem({ itemName: '', itemDescription: '', itemImage: '', itemTag: '', selectedDate: null });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Edited Item Data:', editedItem);
      onEditSubmit(editedItem);
      resetForm();
    }
  };

  return (
    <div>
      <AuthenticatedHeader />
      <div className="EditItem">
        <h2>Edit Item</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Select Item
            <select value={selectedItemId} onChange={handleItemChange}>
              <option value="" disabled>
                Select an item
              </option>
              {itemsList &&
                itemsList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.itemName}
                  </option>
                ))}
            </select>
          </label>
          <br />
          <button type="submit">Save Changes</button>
        </form>
        {selectedItemId && (
          <div>
            <h3>Edit Item Details</h3>
            <p>Item Name: {editedItem.itemName}</p>
            <p>Description: {editedItem.itemDescription}</p>
            <p>Link to Image: {editedItem.itemImage}</p>
            <p>Tag: {editedItem.itemTag}</p>
            <p>
              Date:{' '}
              {editedItem.selectedDate &&
                editedItem.selectedDate.toDateString()}
            </p>
          </div>
        )}
        {isSubmitted && (
          <div className="success-message">Item edited successfully!</div>
        )}
      </div>
    </div>
  );
};

export default EditItem;
