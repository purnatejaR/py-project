import React, { useState } from 'react';
import axios from 'axios';
import UserDashboard from './UserDashboard';

const ContactForm = ({ username, onLogout }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await axios.post('http://localhost:5000/api/contact-messages', formData);
            alert('Message sent successfully!');
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="contact-form-container">
            <UserDashboard username={username} onLogout={onLogout} />
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Message:</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} required></textarea>
                </div>
                <button type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send Message'}</button>
            </form>
        </div>
    );
};

export default ContactForm;
