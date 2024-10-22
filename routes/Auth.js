// routes/Auth.js

import express from 'express';
import User from '../models/User.js'; // Adjust the import based on your structure

const router = express.Router();

// Post: Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { username } }); // Fetch user based on username

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords (consider using bcrypt for hashing in a production app)
    if (user.password === password) {
      return res.status(200).json({ 
        message: 'Login successful', 
        userId: user.id, // Return user ID
        username: user.username // Return username
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Error logging in' });
  }
});

export default router;
