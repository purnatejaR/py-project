import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

const ManageChargingStations = ({ username, onLogout }) => {
  const [stations, setStations] = useState([]);
  const [stationFormData, setStationFormData] = useState({
    name: '',
    location: '',
    charger_type: '',
    availability: 'available',
    pricing: ''
  });
  const [showAddStationForm, setShowAddStationForm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStationId, setCurrentStationId] = useState(null);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/chargingstations');
      setStations(response.data);
    } catch (error) {
      console.error('Error fetching charging stations', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStationFormData({ ...stationFormData, [name]: value });
  };

  const handleAddOrUpdateStation = async () => {
    try {
      if (isUpdating) {
        await axios.put(`http://localhost:5000/api/admin/chargingstations/${currentStationId}`, stationFormData);
      } else {
        await axios.post('http://localhost:5000/api/admin/chargingstations', stationFormData);
      }
      fetchStations();
      setStationFormData({
        name: '',
        location: '',
        charger_type: '',
        availability: 'available',
        pricing: ''
      });
      setShowAddStationForm(false);
      setIsUpdating(false);
      setCurrentStationId(null);
    } catch (error) {
      console.error('Error adding/updating charging station', error);
    }
  };

  const handleDeleteStation = async (station_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/chargingstations/${station_id}`);
      fetchStations();
    } catch (error) {
      console.error('Error deleting charging station', error);
    }
  };

  const populateFormForUpdate = (station) => {
    setStationFormData({
      name: station.name,
      location: station.location,
      charger_type: station.charger_type,
      availability: station.availability,
      pricing: station.pricing.toString() // Convert pricing to string for input field
    });
    setShowAddStationForm(true);
    setIsUpdating(true);
    setCurrentStationId(station.station_id);
  };

  const toggleAddStationForm = () => {
    setShowAddStationForm(!showAddStationForm);
    setIsUpdating(false);
    setCurrentStationId(null);
    setStationFormData({
      name: '',
      location: '',
      charger_type: '',
      availability: 'available',
      pricing: ''
    });
  };

  return (
    <div>
      <AdminDashboard username={username} onLogout={onLogout} />
      <h2>Manage Charging Stations</h2>
      <button onClick={toggleAddStationForm}>{isUpdating ? 'Cancel Update' : 'Add Charging Station'}</button>
      {showAddStationForm && (
        <div>
          <h3>{isUpdating ? 'Update Charging Station' : 'Add Charging Station'}</h3>
          <div>
            <input type="text" name="name" placeholder="Name" value={stationFormData.name} onChange={handleInputChange} />
            <input type="text" name="location" placeholder="Location" value={stationFormData.location} onChange={handleInputChange} />
            <input type="text" name="charger_type" placeholder="Charger Type" value={stationFormData.charger_type} onChange={handleInputChange} />
            <select name="availability" value={stationFormData.availability} onChange={handleInputChange}>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
            <input type="number" name="pricing" placeholder="Pricing" value={stationFormData.pricing} onChange={handleInputChange} />
            <button onClick={handleAddOrUpdateStation}>Submit</button>
            <button onClick={toggleAddStationForm}>Cancel</button>
          </div>
        </div>
      )}
      <ul>
        {stations.map((station) => (
          <li key={station.station_id}>
            {station.name} - {station.location} ({station.charger_type})
            <button onClick={() => populateFormForUpdate(station)}>Update</button>
            <button onClick={() => handleDeleteStation(station.station_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageChargingStations;
