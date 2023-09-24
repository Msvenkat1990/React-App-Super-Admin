import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from 'jwt-decode';
import '../App.css';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Create an object with the user's credentials
    const credentials = {
      username: username,
      password: password,
    };

    // Make an API POST request to the login endpoint
    fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (response.ok) {
          // Parse the response body as JSON to access the token
          return response.json();
        } else {
          console.error('Login failed');
          alert('Login failed');
          throw new Error('Login failed');
        }
      })
      .then((data) => {
        // Handle the response data
        console.log('Login successful');
        alert('Login successful');
        const token = data.token;
        localStorage.setItem('token', token);
        
        // Determine the user's role from the token
        const decodedToken = jwt_decode(token);
        const userRole = decodedToken.role;

        // Redirect the user based on their role
        if (userRole === 'superadmin') {
          window.location.href = '/dashboard/admin';
        } else if (userRole === 'user') {
          window.location.href = '/dashboard/user';
        } else {
          // Handle other roles or scenarios
          console.error('Unknown role:', userRole);
          // You can add custom logic here for other roles
        }
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  return (
    <div className="container mt-5 custom-container">
      <h2 className="center-text">Login</h2>
      <form>
        <div className="form-group p-3 ">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group p-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary move-down p-2" onClick={handleLogin} >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
