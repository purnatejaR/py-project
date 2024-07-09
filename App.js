import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [evs, setEvs] = useState([]);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    battery_capacity: '',
    range: '',
    charging_time: '',
    price: ''
  });
}
  useEffect(() => {
    axios.get('http://localhost:5000/ev')
      .then(response => setEvs(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/ev', formData)
      .then(response => {
        setEvs([...evs, response.data]);
        setFormData({
          make: '',
          model: '',
          year: '',
          battery_capacity: '',
          range: '',
          charging_time: '',
          price: ''
        });
      })
      .catch(error => console.error('Error adding EV:', error));
  };
  return (
    <div className="App">
      <h1>Electric Vehicle Information System</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="make" placeholder="Make" onChange={handleChange} value={formData.make} />
        <input type="text" name="model" placeholder="Model" onChange={handleChange} value={formData.model} />
        <input type="number" name="year" placeholder="Year" onChange={handleChange} value={formData.year} />
        <input type="number" name="battery_capacity" placeholder="Battery Capacity" onChange={handleChange} value={formData.battery_capacity} />
        <input type="number" name="range" placeholder="Range" onChange={handleChange} value={formData.range} />
        <input type="number" name="charging_time" placeholder="Charging Time" onChange={handleChange} value={formData.charging_time} />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} value={formData.price} />
        <button type="submit">Add EV</button>
      </form>
      <ul>
        {evs.map(ev => (
          <li key={ev.id}>{ev.make} {ev.model} ({ev.year}) - {ev.range} miles</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
