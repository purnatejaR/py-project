import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

const ManageContactMessages = ({ username, onLogout }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios.get('http://localhost:5000/api/admin/contact_messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/admin/contact_messages/${id}`)
      .then(response => {
        alert('Message deleted successfully');
        fetchMessages();
      })
      .catch(error => {
        console.error('Error deleting message:', error);
      });
  };

  return (
    <div className="container">
        <AdminDashboard username={username} onLogout={onLogout} />
      <h2>Contact Messages</h2>
      <div className="messages-list">
        {messages.map(message => (
          <div key={message.id} className="message">
            <p><strong>Name:</strong> {message.name}</p>
            <p><strong>Email:</strong> {message.email}</p>
            <p><strong>Message:</strong> {message.message}</p>
            <p><strong>Date:</strong> {new Date(message.created_at).toLocaleString()}</p>
            <button onClick={() => handleDelete(message.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageContactMessages;
