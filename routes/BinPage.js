// routes/Auth.js

import express from 'express';
import { sequelize } from '../config/db.js';  // Use named import

const router = express.Router();

// Route to get deleted ideas (bin page) using raw SQL query
router.get('/', async (req, res) => {
    try {
        const { createdBy } = req.query; // Get the createdBy query parameter if it exists
        // Execute raw SQL query to fetch deleted ideas where deletedStatus = 1
        let query = `
            SELECT "Ideas".id, "Ideas".title, "Ideas".description, "Ideas"."createdAt", "Ideas".likes, "Ideas"."deletedStatus", "Ideas"."createdBy", "Users".username 
            FROM public."Ideas"
            INNER JOIN public."Users" ON "Ideas"."createdBy" = "Users".id
            WHERE "Ideas"."deletedStatus" = 1`;        
            
        // Add WHERE clause if createdBy is provided
        if (createdBy) {
            query += ` AND "Ideas"."createdBy" = :createdBy `;
        }

        query += ' ORDER BY "Ideas"."createdAt" DESC;';

        // Execute the query with or without the createdBy parameter
        const deletedIdeas = await sequelize.query(query, {
            replacements: createdBy ? { createdBy } : {},  // Pass the createdBy value if it's provided
            type: sequelize.QueryTypes.SELECT
        });
        // Check if any deleted ideas are found
        if (deletedIdeas.length === 0) {
            return res.status(404).json({ message: 'No deleted ideas found' });
        }

       // Send the deleted ideas in the response
        res.status(200).json(deletedIdeas);
    } catch (error) {
        console.error("Error fetching deleted ideas:", error);
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/ideas/:id - Permanently delete idea by ID
router.delete('/:id', async (req, res) => {  // Adjust path if needed to match client URL
    const { id } = req.params;
    try {
      await Idea.findByIdAndDelete(id); // Ensure model name matches your database schema
      res.status(200).json({ message: 'Idea permanently deleted' });
    } catch (error) {
      console.error('Error in backend deletion:', error);
      res.status(500).json({ error: 'Failed to delete idea' });
    }
  });
  
  
export default router;
