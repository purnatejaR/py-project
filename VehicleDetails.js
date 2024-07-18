import React from 'react';
import './VehicleDetails.css';

const VehicleDetails = ({ vehicle, handleCloseDetails }) => {
    return (
        <div className="vehicle-details">
            <h2>{vehicle.make} {vehicle.model} ({vehicle.year})</h2>
            <p>Battery Capacity: {vehicle.battery_capacity} kWh</p>
            <p>Range: {vehicle.range_km} km</p>
            <p>Charging Time: {vehicle.charging_time} hours</p>
            <p>Price: ${vehicle.price}</p>
            <p>Availability: {vehicle.availability}</p>
            <p>Additional details if any...</p>
            <button onClick={handleCloseDetails}>Close</button>
        </div>
    );
};

export default VehicleDetails;
