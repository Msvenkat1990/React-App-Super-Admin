import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

function Registration() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  async function registerUser(userData) {
    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.status === 201) {
        // Registration successful, you can redirect or perform any other action here.
        console.log('Registration successful');
      } else {
        // Registration failed, handle the error (e.g., display an error message).
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }
  

  const handleRegistration = () => {
    // Implement registration logic here, e.g., form validation
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
  
    // Create an object with the registration data
    const registrationData = {
      username,
      fullName,
      contactNumber,
      password,
    };
  
    // Call the registerUser function to make the API request
    registerUser(registrationData);
  };
  

  return (
    <div className="container mt-3 custom-container">
    <h2 className='center-text'>Registration</h2>
      <form>
        <div className="form-group p-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group p-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group p-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter contact number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
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
        <div className="form-group p-3">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary custom-button" onClick={handleRegistration}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Registration;

