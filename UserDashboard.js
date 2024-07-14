import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [chargingStations, setChargingStations] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchVehicles();
    fetchChargingStations();
    fetchReviews();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vehicles');
      setVehicles(response.data);
    } catch (error) {
      alert('Error fetching vehicles');
    }
  };

  const fetchChargingStations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/chargingstations');
      setChargingStations(response.data);
    } catch (error) {
      alert('Error fetching charging stations');
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reviews');
      setReviews(response.data);
    } catch (error) {
      alert('Error fetching reviews');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/api/logout');
      window.location.href = '/';
    } catch (error) {
      alert('Error logging out');
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h3>Vehicles</h3>
        <ul>
          {vehicles.map(vehicle => (
            <li key={vehicle.vehicle_id}>{vehicle.make} {vehicle.model}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Charging Stations</h3>
        <ul>
          {chargingStations.map(station => (
            <li key={station.station_id}>{station.name} - {station.location}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Reviews</h3>
        <ul>
          {reviews.map(review => (
            <li key={review.review_id}>
              Rating: {review.rating} - {review.review_text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
