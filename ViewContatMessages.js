import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewContactMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/admin/contactmessages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`/api/admin/contactmessages/${id}`);
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message', error);
    }
  };

  return (
    <div>
      <h2>View Contact Messages</h2>
      <ul>
        {messages.map((m) => (
          <li key={m.id}>
            {m.name}: {m.message}
            <button onClick={() => handleDeleteMessage(m.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewContactMessages;
