import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/admindata', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setAdminData(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch admin data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <p>Welcome, Admin</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
