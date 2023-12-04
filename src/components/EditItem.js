
import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './EditItem.css';
import AuthenticatedHeader from './AuthenticatedHeader';

const EditItem = ({ itemsList, onEditSubmit }) => {
  const [editedItem, setEditedItem] = useState({
    itemName: '',
    itemDescription: '',
    selectedDate: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Assuming the first item is initially selected
    if (itemsList && itemsList.length > 0) {
      setEditedItem(itemsList[0]);
    }
  }, [itemsList]);

  const validate = () => {
    let isValid = true;
    if (
      !editedItem.itemName ||
      !editedItem.itemDescription ||
      !editedItem.selectedDate
    ) {
      isValid = false;
      console.log('Please fill in all fields.');
    }
    return isValid;
  };

  const resetForm = () => {
    setEditedItem({
      itemName: '',
      itemDescription: '',
      selectedDate: null,
    });
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
          <div>
            <h3>Edit Item Details</h3>
            <label>
              Item Name
              <input
                type="text"
                value={editedItem.itemName}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, itemName: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Description
              <input
                type="text"
                value={editedItem.itemDescription}
                onChange={(e) =>
                  setEditedItem({
                    ...editedItem,
                    itemDescription: e.target.value,
                  })
                }
              />
            </label>
            <br />
            <label>
              Date
              <input
                type="date"
                value={
                  editedItem.selectedDate
                    ? editedItem.selectedDate.toISOString().split('T')[0]
                    : ''
                }
                onChange={(e) =>
                  setEditedItem({
                    ...editedItem,
                    selectedDate: new Date(e.target.value),
                  })
                }
              />
            </label>
          </div>
          <br />
          <button type="submit">Save Changes</button>
        </form>
        {isSubmitted && (
          <div className="success-message">Item edited successfully!</div>
        )}
      </div>
    </div>
  );
};

export default EditItem;
