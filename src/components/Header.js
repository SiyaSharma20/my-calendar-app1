import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="logo">CalendarApp</div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <button className="sign-in">Sign In</button>
      </nav>
    </header>
  );
};

export default Header;
