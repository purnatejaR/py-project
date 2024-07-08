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

  useEffect(() => {
    axios.get('http://localhost:5000/ev')
      .then(response => setEvs(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
