import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import AuthenticatedView from './pages/AuthenticatedView';
import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';
import SignupPage from './pages/SignupPage';
import EditItem from './components/EditItem';
import NotFound from './components/NotFound';

import ReactDOM from 'react-dom';
import { AppProvider } from './components/AppContext';

function App() {
  const isUserSignedIn = !!localStorage.getItem('token');

  const isAuth = false;
  const [selectedItem, setSelectedItem] = useState(null);
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

  const handleEditClick = (item) => {
    setSelectedItem(item);
    // Additional logic if needed
  };

  return (
    ReactDOM.render(
      <React.StrictMode>
        <Router>
          <AppProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/additem" element={<AddItem />} />
              <Route path="/viewitems" element={<ViewItems onEditClick={handleEditClick} />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="*" element={<NotFound loggedIn={isAuth} />} />
              {isUserSignedIn && (
                <Route path="/authenticatedview" element={<AuthenticatedView />} />
              )}
              {selectedItem && (
                <Route path="/edititems" element={<EditItem selectedItem={selectedItem} onEditSubmit={onEditSubmit} />} />
              )}
            </Routes>
          </AppProvider>
        </Router>
      </React.StrictMode>,
      document.getElementById('root')
    )
  );
}

export default App;
