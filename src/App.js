import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import AuthenticatedView from './pages/AuthenticatedView';
import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';
import SignupPage from './pages/SignupPage';
import EditItem from './components/EditItem';

function App() {
  const isUserSignedIn = !!localStorage.getItem('token');

  const isAuth = false;
  // Placeholder
  const itemToEdit = {
    itemName: 'Example Item to Edit',
    itemDescription: 'Example Description to Edit',
    selectedDate: new Date(),
  };

  // Placeholder
  const onEditSubmit = (editedItem) => {
    console.log('Submit edited item:', editedItem);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/viewitems" element={<ViewItems />} />
        <Route path="/signup" element={<SignupPage />} />
        {isUserSignedIn && (
          <Route path="authenticatedview" element={<AuthenticatedView />} />
        )}

        <Route
          path="/edititems"
          element={
            <EditItem itemToEdit={itemToEdit} onEditSubmit={onEditSubmit} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
