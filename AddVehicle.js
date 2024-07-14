import React from 'react';

const AddVehicle = ({ newVehicleData, handleInputChange, handleAddVehicle, error, handleCancelAddVehicle }) => {
    return (
        <div className="add-vehicle-form">
            <h2>Add New Vehicle</h2>
            {error && <p className="error">{error}</p>}
            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={newVehicleData.name}
                onChange={handleInputChange}
            />
            <label>Brand:</label>
            <input
                type="text"
                name="brand"
                value={newVehicleData.brand}
                onChange={handleInputChange}
            />
            <label>Type:</label>
            <input
                type="text"
                name="type"
                value={newVehicleData.type}
                onChange={handleInputChange}
            />
            <label>Price:</label>
            <input
                type="number"
                name="price"
                value={newVehicleData.price}
                onChange={handleInputChange}
            />
            <label>
                <input
                    type="checkbox"
                    name="availability"
                    checked={newVehicleData.availability}
                    onChange={handleInputChange}
                />
                Availability
            </label>
            <button onClick={handleAddVehicle}>Add Vehicle</button>
            <button onClick={handleCancelAddVehicle}>Cancel</button>
        </div>
    );
};

export default AddVehicle;
