import React from 'react';
import Header from "./Header.js";
import AuthenticatedHeader from './AuthenticatedHeader.js';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = (props) => {
    const loggedIn = props.loggedIn;
    const navigate = useNavigate();
    if (loggedIn) {
        return (
            <div>
                <AuthenticatedHeader />
                <h1>Page not found!</h1>
                <h3>We can't find what you were looking for.</h3>
                <button onClick={() => navigate('/authenticatedview')}>Return Home</button>
            </div>
        )
    } else {
        return (
            <div>
                <Header />
                <h1>Page not found!</h1>
                <h3>We can't find what you were looking for.</h3>
                <button onClick={() => navigate('/')}>Return Home</button>
            </div>
        )
    }
}


export default NotFound;