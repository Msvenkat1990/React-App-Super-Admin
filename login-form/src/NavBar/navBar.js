import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

function Navbar() {
   const [isLoggedIn, setIsLoggedIn] = useState(true); // Initially, the user is not logged in

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear user data and token)
    setIsLoggedIn(false); // Set the isLoggedIn state to false
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* <Link className="navbar-brand" to="/">Your Logo</Link> */}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {!isLoggedIn ? 
          (<>
                    <li className="nav-item">
            <Link className="nav-link" to="/login" setIsLoggedIn={setIsLoggedIn} >Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          </>):
          ( <li className="nav-item move-left" >
          <Link className="nav-link" to="/login" onClick={handleLogout}>LogOut</Link>
        </li>)
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
