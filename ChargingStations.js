import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChargingStations() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios.get('/api/charging-stations')
      .then(response => setStations(response.data))
      .catch(error => console.error('Error fetching charging stations:', error));
  }, []);

  return (
    <div>
      <h2>Charging Stations</h2>
      <ul>
        {stations.map(station => (
          <li key={station.station_id}>{station.name} ({station.charger_type})</li>
        ))}
      </ul>
    </div>
  );
}

export default ChargingStations;
