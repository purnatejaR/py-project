import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', {
        username,
        password,
        email,
        full_name: fullName,
        role
      });
      alert(response.data.message);
      // Redirect to login page after successful registration
      window.location.href = '/login';
    } catch (error) {
      alert(error.response.data.error || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
