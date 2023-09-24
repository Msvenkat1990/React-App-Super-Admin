const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/model');

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, fullName, contactNumber, password,role } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      fullName,
      contactNumber,
      role,
      password:hashedPassword,
    });
    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by userName
    const user = await User.findOne({ username });

    // If the user does not exist, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create and send a JWT for authentication
    const token = jwt.sign({ userId: user._id ,role:user.role }, '224872rvs');

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});
function authenticateRole(role) {
  return (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
      const decoded = jwt.verify(token, '224872rvs'); // Replace with your actual secret key
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
      }
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).json({ message: 'Invalid token' });
    }
  };
}
router.get('/superadmin', authenticateRole('superadmin'), (req, res) => {
  // Only accessible by superadmins 
  res.json({ message: 'Superadmin data' });
});
router.get('/user', authenticateRole('user'), (req, res) => {
  // Only accessible by user
  res.json({ message: 'userdate data' });
});

module.exports = router;
