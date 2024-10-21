// routes/Auth.js

import express from 'express';
import User from '../models/User.js'; // Adjust the import based on your structure

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }); // Adjust this based on your User model structure
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Here you can directly compare passwords since you mentioned storing it as plain text
    if (user.password === password) {
      return res.status(200).json({ message: 'Successful login' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Error logging in' });
  }
});

export default router;
