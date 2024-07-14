import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDashboard from './UserDashboard';

const VehiclesList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles', error);
    }
  };

  return (
    <div>
      <UserDashboard />
      <h2>Vehicles List</h2>
      <ul>
        {vehicles.map((v) => (
          <li key={v.vehicle_id}>
            {v.make} {v.model} ({v.year}) - ${v.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehiclesList;
