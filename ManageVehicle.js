import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageVehicles.css';
import AdminDashboard from './AdminDashboard';
import AddVehicle from './AddVehicle';
import UpdateVehicle from './UpdateVehicle';

const ManageVehicles = ({ username, onLogout }) => {
    const [vehicles, setVehicles] = useState([]);
    const [newVehicle, setNewVehicle] = useState({ name: '', brand: '', type: '', price: '', availability: true });
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('name_asc');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/vehicles');
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles', error);
        }
    };

    const handleAddVehicle = async () => {
        try {
            const newVehicleData = {
                name: newVehicle.name,
                brand: newVehicle.brand,
                type: newVehicle.type,
                price: newVehicle.price,
                availability: newVehicle.availability
            };

            await axios.post('http://localhost:5000/api/admin/vehicles', newVehicleData);
            fetchVehicles();
            setNewVehicle({ name: '', brand: '', type: '', price: '', availability: true });
            setShowAddForm(false);
            alert('New vehicle added successfully.');
        } catch (error) {
            console.error('Error adding vehicle', error);
            setError('Failed to add vehicle.');
        }
    };

    const handleDeleteVehicle = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/vehicles/${id}`);
            fetchVehicles();
            alert('Vehicle deleted successfully.');
        } catch (error) {
            console.error('Error deleting vehicle', error);
        }
    };

    const handleUpdateVehicle = async (vehicle) => {
        try {
            const updatedVehicleData = {
                name: vehicle.name,
                brand: vehicle.brand,
                type: vehicle.type,
                price: vehicle.price,
                availability: vehicle.availability
            };

            await axios.put(`http://localhost:5000/api/admin/vehicles/${vehicle.id}`, updatedVehicleData);
            fetchVehicles();
            alert('Vehicle updated successfully.');
        } catch (error) {
            console.error('Error updating vehicle', error);
            setError('Failed to update vehicle.');
        }
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setNewVehicle({ ...newVehicle, [name]: newValue });
    };

    const handleVehicleInputChange = (event, id) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setVehicles(vehicles.map(vehicle => (vehicle.id === id ? { ...vehicle, [name]: newValue } : vehicle)));
    };

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
        setError('');
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (type) => {
        setSortType(type);
    };

    const handleToggleEdit = (id) => {
        setVehicles(vehicles.map(vehicle => (vehicle.id === id ? { ...vehicle, isEditing: !vehicle.isEditing } : vehicle)));
    };

    const handleCancelUpdate = (id) => {
        setVehicles(vehicles.map(vehicle => (vehicle.id === id ? { ...vehicle, isEditing: false } : vehicle)));
    };

    const filteredVehicles = vehicles.filter(vehicle => 
        vehicle.name && vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedVehicles = filteredVehicles.sort((a, b) => {
        if (sortType === 'name_asc') {
            return a.name.localeCompare(b.name);
        } else if (sortType === 'name_desc') {
            return b.name.localeCompare(a.name);
        } else if (sortType === 'price_asc') {
            return a.price - b.price;
        } else if (sortType === 'price_desc') {
            return b.price - a.price;
        } else {
            return 0;
        }
    });

    return (
        <div className="manage-vehicles">
            <AdminDashboard username={username} onLogout={onLogout} />
            <h1>Manage Vehicles</h1>

            <div className="add-vehicle">
                {!showAddForm && (
                    <button className="small-button" onClick={toggleAddForm}>Add Vehicle</button>
                )}

                {showAddForm && (
                    <AddVehicle
                        newVehicleData={newVehicle}
                        handleInputChange={handleInputChange}
                        handleAddVehicle={handleAddVehicle}
                        error={error}
                        handleCancelAddVehicle={toggleAddForm}
                    />
                )}
            </div>

            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar"
            />

            <div className="sorting-buttons">
                <button className={sortType === 'name_asc' ? 'active' : ''} onClick={() => handleSort('name_asc')}>Name A-Z</button>
                <button className={sortType === 'name_desc' ? 'active' : ''} onClick={() => handleSort('name_desc')}>Name Z-A</button>
                <button className={sortType === 'price_asc' ? 'active' : ''} onClick={() => handleSort('price_asc')}>Price Low-High</button>
                <button className={sortType === 'price_desc' ? 'active' : ''} onClick={() => handleSort('price_desc')}>Price High-Low</button>
            </div>

            <div className="vehicles-list">
                {sortedVehicles.map(vehicle => (
                    <div key={vehicle.id} className="vehicle-item">
                        {vehicle.isEditing ? (
                            <UpdateVehicle
                                vehicleData={vehicle}
                                handleInputChange={(e) => handleVehicleInputChange(e, vehicle.id)}
                                handleUpdateVehicle={() => handleUpdateVehicle(vehicle)}
                                handleCancelUpdate={() => handleCancelUpdate(vehicle.id)}
                                error={error}
                            />
                        ) : (
                            <>
                                <h3>{vehicle.name}</h3>
                                <p>Brand: {vehicle.brand}</p>
                                <p>Type: {vehicle.type}</p>
                                <p>Price: ${vehicle.price}</p>
                                <p>Availability: {vehicle.availability ? 'Available' : 'Not Available'}</p>
                                <div className="vehicle-item-buttons">
                                    <button className="small-button" onClick={() => handleToggleEdit(vehicle.id)}>Update</button>
                                    <button className="small-button" onClick={() => handleDeleteVehicle(vehicle.id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageVehicles;
