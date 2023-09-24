import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch user data:', error);
      });
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      <div>
        <p>Welcome, {userData.fullName}</p>
        {/* Display user-specific data */}
      </div>
    </div>
  );
}

export default UserDashboard;
