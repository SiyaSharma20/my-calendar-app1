import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import AuthenticatedView from './pages/AuthenticatedView';
import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';
import SignupPage from './pages/SignupPage';

function App() {
  const isUserSignedIn = !!localStorage.getItem('token');

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
      </Routes>
    </Router>
  );
}

export default App;
