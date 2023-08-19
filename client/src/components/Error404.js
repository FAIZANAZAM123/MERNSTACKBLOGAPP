import React from 'react';
 import './Styles/Error404.css';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div className="error-container">
            <div className="error-content">
                <h1>404</h1>
                <h2>Oops! Page not found.</h2>
                <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <Link to="/" className="home-button">Go to Home</Link>
            </div>
        </div>
    );
}

export default Error404;
