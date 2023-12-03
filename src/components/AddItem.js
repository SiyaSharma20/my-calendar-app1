/*
 * Second view for my-calendar-app.
 * Allows user to add new item.
 */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // imported calendar API
import 'react-datepicker/dist/react-datepicker.css'; // Styling for calendar selection
import './AddItem.css';
import AuthenticatedHeader from './AuthenticatedHeader';

/**
 * Component for adding a new item with a form.
 * @component
 */
const AddItem = () => {
  /**
   * State to manage the new item data.
   * @type {Object}
   * @property {string} itemName - The name of the item.
   * @property {string} itemDescription - The description of the item.
   * @property {Date | null} selectedDate - The selected date for the item.
   */
  const [newItem, setNewItem] = useState({
    itemName: '',
    itemDescription: '',
    selectedDate: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Handles changes in input fields.
   *
   * @param {Object} e - The event object.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  /**
   * Handles changes in the selected date.
   *
   * @param {Date} date - The selected date.
   */
  const handleDateChange = (date) => {
    setNewItem((prevItem) => ({ ...prevItem, selectedDate: date }));
  };

  /**
   * Validates the form input fields.
   *
   * Checks each input field for validity and updates the `errors`
   * state with appropriate error messages.
   *
   * @returns {boolean} True if all fields are valid, false otherwise.
   */
  const validate = () => {
    let tempErrors = {};
    tempErrors.itemName = newItem.itemName ? '' : 'Item name is required.';
    tempErrors.itemDescription = newItem.itemDescription
      ? ''
      : 'Description is required.';
    tempErrors.selectedDate = newItem.selectedDate ? '' : 'Date is required.';

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  /**
   * Resets the form fields and clears any existing errors.
   *
   * Sets the `newItem` state back to its initial values (empty), clears any validation errors,
   * sets `isSubmitted` to true, and then sets it back to false
   * after a delay
   * called after successful form submission.
   */
  const resetForm = () => {
    setNewItem({ itemName: '', itemDescription: '', selectedDate: null });
    setErrors({});
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  /**
   * Handles form submission.
   *
   * @param {Object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('New Item Data:', newItem);
      resetForm();
    }
  };

  return (
    <div>
      <AuthenticatedHeader />
      <div className="AddItem">
        <h2>Add Item</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Item Name
            <input
              type="text"
              name="itemName"
              value={newItem.itemName}
              onChange={handleInputChange}
            />
            {errors.itemName && <div className="error">{errors.itemName}</div>}
          </label>
          <br />
          <label>
            Item Description
            <input
              type="text"
              name="itemDescription"
              value={newItem.itemDescription}
              onChange={handleInputChange}
            />
            {errors.itemDescription && (
              <div className="error">{errors.itemDescription}</div>
            )}
          </label>
          <br />
          <label>
            Select Date
            <DatePicker
              selected={newItem.selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
            />
            {errors.selectedDate && (
              <div className="error">{errors.selectedDate}</div>
            )}
          </label>
          <br />
          <button type="submit">Add Item</button>
        </form>
        {isSubmitted && (
          <div className="success-message">Item added successfully!</div>
        )}
      </div>
    </div>
  );
};

export default AddItem;
