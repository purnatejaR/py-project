import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform login logic (e.g., authentication against a database)
        // For simplicity, assuming login is successful and role is retrieved from backend
        const role = username === 'admin' ? 'admin' : 'user'; // Example logic for role determination
        onLogin({ username, role });
        navigate(role === 'admin' ? '/api/admin/dashboard' : '/api/user/dashboard');
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;