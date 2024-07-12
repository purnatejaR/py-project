import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDashboard from './UserDashboard';
import './ContactMessage.css';

const ContactMessage = ({username, onLogout}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [contactMessages, setContactMessages] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newMessage = { name, email, message };

        try {
            const response = await axios.post('http://localhost:5000/api/contact_messages', newMessage);
            setContactMessages([...contactMessages, response.data]);
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.error('There was an error submitting the contact message!', error);
        }
    };

    useEffect(() => {
        const fetchContactMessages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/contact_messages');
                setContactMessages(response.data);
            } catch (error) {
                console.error('There was an error fetching the contact messages!', error);
            }
        };

        fetchContactMessages();
    }, []);

    return (
        <div>
          <UserDashboard username={username} onLogout={onLogout} />
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>

        </div>
    );
};

export default ContactMessage;
