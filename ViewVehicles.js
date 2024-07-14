import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState({ field: '', order: 'asc' });

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field) => {
    const sortOrder = sortBy.field === field && sortBy.order === 'asc' ? 'desc' : 'asc';
    setSortBy({ field, order: sortOrder });

    let sortedVehicles = [...vehicles];
    switch (field) {
      case 'make':
        sortedVehicles.sort((a, b) => (sortOrder === 'asc' ? a.make.localeCompare(b.make) : b.make.localeCompare(a.make)));
        break;
      case 'model':
        sortedVehicles.sort((a, b) => (sortOrder === 'asc' ? a.model.localeCompare(b.model) : b.model.localeCompare(a.model)));
        break;
      case 'year':
        sortedVehicles.sort((a, b) => (sortOrder === 'asc' ? a.year - b.year : b.year - a.year));
        break;
      default:
        break;
    }
    setVehicles(sortedVehicles);
  };

  const filteredVehicles = vehicles.filter((v) =>
    v.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Vehicles List</h2>
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by Make"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="sort-buttons">
          <button onClick={() => handleSort('make')}>
            Sort by Make {sortBy.field === 'make' && (sortBy.order === 'asc' ? '↑' : '↓')}
          </button>
          <button onClick={() => handleSort('model')}>
            Sort by Model {sortBy.field === 'model' && (sortBy.order === 'asc' ? '↑' : '↓')}
          </button>
          <button onClick={() => handleSort('year')}>
            Sort by Year {sortBy.field === 'year' && (sortBy.order === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>
      <ul>
        {filteredVehicles.map((v) => (
          <li key={v.vehicle_id}>
            {v.make} {v.model} ({v.year}) - ${v.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewVehicles;
