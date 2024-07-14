import React from 'react';
import { Link } from 'react-router-dom';


const AdminDashboard = ({ username, onLogout }) => {
    const handleLogout = () => {
        if (typeof onLogout === 'function') {
            onLogout(); // Ensure onLogout is properly passed and invoked
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Welcome to Your Dashboard, {username}!</h1>
            <nav>
                <ul>
                    <li><Link to="/api/admin/vehicles">Manage Vehicles</Link></li>
                    <li><Link to="/api/admin/chargingstations">ManageChargingStations</Link></li>
                    <li><Link to="/api/admin/chargingstations">ManageChargingStations</Link></li>
                    <li><Link to="/api/admin/reviews">ManageReviews</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminDashboard;
