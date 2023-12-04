import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import AuthenticatedView from './pages/AuthenticatedView';
import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';
import SignupPage from './pages/SignupPage';
import EditItem from './components/EditItem';

function App() {
  const [itemsList, setItemsList] = useState([]);
  const isUserSignedIn = !!localStorage.getItem('token');

  const handleAddItem = (newItem) => {
    setItemsList((prevItems) => [...prevItems, newItem]);
  };

  const handleEditItem = (editedItem) => {
    const editedItemId = editedItem.id;
    const itemIndexToEdit = itemsList.findIndex((item) => item.id === editedItemId);
  
    if (itemIndexToEdit !== -1) {
      const updatedItemsList = [...itemsList];
      updatedItemsList[itemIndexToEdit] = editedItem;
      setItemsList(updatedItemsList);
  
      console.log('Submit edited item:', editedItem);
    } else {
      console.error('Item not found in the list.');
    }
  };
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/additem"
          element={<AddItem onAddSubmit={handleAddItem} />}
        />
        <Route path="/viewitems" element={<ViewItems />} />
        <Route path="/signup" element={<SignupPage />} />
        {isUserSignedIn && (
          <Route path="authenticatedview" element={<AuthenticatedView />} />
        )}

        <Route
          path="/edititems"
          element={<EditItem itemsList={itemsList} onEditSubmit={handleEditItem} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
