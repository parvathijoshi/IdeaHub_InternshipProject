// routes/Auth.js

import express from 'express';
import { sequelize } from '../config/db.js';  // Use named import

const router = express.Router();

// Get ideas with likes greater than 10
router.get('/', async (req, res) => {
    try {
      // Query to fetch ideas with more than 10 likes
      const result = await sequelize.query('SELECT * FROM public."Ideas" WHERE likes > 10');
    
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'No ideas with more than 10 likes.' });
      }
    } catch (error) {
      console.error('Error fetching approval ideas:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


export default router;
