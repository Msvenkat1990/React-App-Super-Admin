import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Navbar from '../src/NavBar/navBar';
import Login from './Login/login';
import Registration from './User-Registration/registration';
import AdminDashboard from './UserDetails/adminDashboard';
import UserDashboard from './UserDetails/userDashboard';
import { useEffect, useState } from 'react';

function App() {
  const token = localStorage.getItem('token');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const role = decodedToken.role;
        setUserRole(role);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [token]);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          {userRole === 'superadmin' ? (
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
          ) : userRole === 'user' ? (
            <Route path="/dashboard/user" element={<UserDashboard />} />
          ) : (
            <Route path="/login" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
