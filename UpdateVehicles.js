import React from 'react';

const UpdateVehicle = ({ vehicleData, handleInputChange, handleUpdateVehicle, handleCancelUpdate, error }) => {
    return (
        <div className="update-vehicle-form">
            <h2>Update Vehicle</h2>
            {error && <p className="error">{error}</p>}
            <label>Make:</label>
            <input
                type="text"
                name="make"
                value={vehicleData.make || ''}
                onChange={handleInputChange}
            />
            <label>Model:</label>
            <input
                type="text"
                name="model"
                value={vehicleData.model || ''}
                onChange={handleInputChange}
            />
            <label>Year:</label>
            <input
                type="number"
                name="year"
                value={vehicleData.year || ''}
                onChange={handleInputChange}
            />
            <label>Battery Capacity (kWh):</label>
            <input
                type="number"
                name="battery_capacity"
                value={vehicleData.battery_capacity || ''}
                onChange={handleInputChange}
            />
            <label>Range (km):</label>
            <input
                type="number"
                name="range_km"
                value={vehicleData.range_km || ''}
                onChange={handleInputChange}
            />
            <label>Charging Time (hours):</label>
            <input
                type="number"
                name="charging_time"
                value={vehicleData.charging_time || ''}
                onChange={handleInputChange}
            />
            <label>Price:</label>
            <input
                type="number"
                name="price"
                value={vehicleData.price || ''}
                onChange={handleInputChange}
            />
            <label>
                <input
                    type="checkbox"
                    name="availability"
                    checked={vehicleData.availability === 'available'}
                    onChange={(e) => handleInputChange({
                        target: {
                            name: 'availability',
                            value: e.target.checked ? 'available' : 'unavailable'
                        }
                    })}
                />
                Available
            </label>

            <div className="form-buttons">
                <button onClick={handleUpdateVehicle}>Update Vehicle</button>
                <button onClick={handleCancelUpdate}>Cancel</button>
            </div>
        </div>
    );
};

export default UpdateVehicle;
