import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDashboard from './UserDashboard';

const ChargingStationsList = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/chargingstations');
      setStations(response.data);
    } catch (error) {
      console.error('Error fetching stations', error);
    }
  };

  return (
    <div>
      <UserDashboard />
      <h2>Charging Stations List</h2>
      <ul>
        {stations.map((s) => (
          <li key={s.station_id}>
            {s.name} ({s.charger_type}) - {s.location} - ${s.pricing}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChargingStationsList;
