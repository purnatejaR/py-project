import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import ViewVehicles from './ViewVehicles';
import ContactUs from './ContactUs';
import './Home.css';

const Home = ({ onLogin }) => {
    const [activeComponent, setActiveComponent] = useState(null);

    const renderComponent = () => {
        switch (activeComponent) {
            case 'register':
                return <Register />;
            case 'login':
                return <Login onLogin={onLogin} />;
            case 'vehicles':
                return <ViewVehicles />;
            case 'contactUs':
                return <ContactUs />;
            default:
                return null;
        }
    };

    return (
        <div className="home-container">
            <h1>Welcome to SR Electric Vehicles</h1>
            <div className="home-buttons">
                <button onClick={() => setActiveComponent('register')}>Register</button>
                <button onClick={() => setActiveComponent('login')}>Login</button>
                <button onClick={() => setActiveComponent('vehicles')}>Digital Showroom</button>
                <button onClick={() => setActiveComponent('contactUs')}>Contact Us</button>
            </div>
            <div className="component-container">
                {renderComponent()}
            </div>
        </div>
    );
};

export default Home;
