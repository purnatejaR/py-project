import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('/api/admin-activities')
      .then(response => setActivities(response.data))
      .catch(error => console.error('Error fetching admin activities:', error));
  }, []);

  return (
    <div>
      <h2>Admin Activities</h2>
      <ul>
        {activities.map(activity => (
          <li key={activity.activity_id}>{activity.action} ({activity.target_type})</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminActivities;
