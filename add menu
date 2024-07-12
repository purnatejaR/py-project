import React from 'react';

const AddMenuItem = ({ newItemData, handleInputChange, handleAddItem, handleCancelAddItem, error }) => {
    return (
        <div className="add-menu-item-form">
            <h2>Add New Item</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={(e) => { e.preventDefault(); handleAddItem(); }}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={newItemData.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={newItemData.description}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={newItemData.price}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Availability:
                    <input
                        type="checkbox"
                        name="availability"
                        checked={newItemData.availability}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit" className="small-button">Add</button>
                <button type="button" className="small-button" onClick={handleCancelAddItem}>Cancel</button>
            </form>
        </div>
    );
};

export default AddMenuItem;
