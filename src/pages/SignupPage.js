import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';
import axios from 'axios';
import AuthenticatedHeader from '../components/AuthenticatedHeader';

const SignupPage = () => {
  const [user, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:4000/register').then((res) => {
      console.log(res.data);
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/register', { email, password })
      .then(() => {
        alert('Registration Successful');
        setEmail('');
        setPassword('');
        fetchUsers();
        navigate('/');
      })
      .catch((error) => {
        console.log('Unable to register user');
      });
  };

  return (
    <div className="signup-page">
      <AuthenticatedHeader />
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              placeholder="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
