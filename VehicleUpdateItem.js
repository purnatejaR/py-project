import React from 'react';

const UpdateMenuItem = ({ itemData, handleInputChange, handleUpdateItem, handleCancelUpdate, error }) => {
    return (
        <div className="update-menu-item-form">
            <h2>Update Item</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateItem(); }}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={itemData.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={itemData.description}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={itemData.price}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Availability:
                    <input
                        type="checkbox"
                        name="availability"
                        checked={itemData.availability}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit" className="small-button">Update</button>
                <button type="button" className="small-button" onClick={handleCancelUpdate}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdateMenuItem;
