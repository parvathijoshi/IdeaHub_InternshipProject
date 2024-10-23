// routes/Ideas.js
import express from 'express';
import Idea from '../models/Idea.js'; // Adjust the import path as necessary
import { sequelize } from '../config/db.js';  // Use named import

const router = express.Router();
// Route to get all ideas with the username of the creator using raw SQL query
router.get('/', async (req, res) => {
    try {
        const ideas = await sequelize.query(`
            SELECT "Ideas".id, "Ideas".title, "Ideas".description, "Ideas"."createdAt", "Ideas".likes, "Users".username 
            FROM public."Ideas"
            INNER JOIN public."Users" ON "Ideas"."createdBy" = "Users".id
            ORDER BY "Ideas"."createdAt" DESC;
        `, {
            type: sequelize.QueryTypes.SELECT
        });

        res.json(ideas);
    } catch (error) {
        console.error("Error fetching ideas:", error);  // Log error to the console
        res.status(500).json({ message: error.message });
    }
});

// GET endpoint to fetch an idea by ID
router.get('/:id', async (req, res) => {
    try {
        const ideaId = req.params.id;

        // Find the idea by ID
        const idea = await Idea.findOne({
            where: { id: ideaId },
            // Optionally, include any associated models or attributes you need
        });

        if (idea) {
            res.status(200).json(idea);
        } else {
            res.status(404).json({ message: 'Idea not found.' });
        }
    } catch (error) {
        console.error("Error fetching idea:", error);
        res.status(500).json({ message: error.message });
    }
});

// Route to create a new idea
router.post('/', async (req, res) => {
    const { title, description, createdBy } = req.body;
    try {
        const newIdea = await Idea.create({ title, description, createdBy });
        res.status(201).json(newIdea);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a specific idea by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the idea from the database
        const deletedIdea = await Idea.destroy({ where: { id: id } });
        
        if (deletedIdea) {
            res.status(200).json({ message: 'Idea deleted successfully' });
        } else {
            res.status(404).json({ message: 'Idea not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the idea', error });
    }
});

// Route for updating an idea
router.put('/:id', async (req, res) => { 
    const { id } = req.params;
    const { title, description, createdBy } = req.body;
    try {
        const updated = await Idea.update(
            { title, description, createdBy },
            { where: { id } }
        );
        
        if (updated[0] === 0) {
            return res.status(404).send({ message: 'Idea not found' });
        }

        // Fetch the updated idea
        const updatedIdea = await Idea.findOne({ where: { id } });

        // Return the updated idea
        res.send(updatedIdea);
    } catch (error) {
        res.status(500).send({ message: 'Error updating idea', error });
    }
});
  
// In your routes/Ideas.js (or similar file)
router.post('/:id/like', async (req, res) => {
    try {
        const ideaId = req.params.id;
 
        // Update likes
        const result = await sequelize.query(`
            UPDATE public."Ideas"
            SET "likes" = "likes" + 1
            WHERE id = :id
        `, {
            replacements: { id: ideaId }
        });
        
        if (result[1].rowCount > 0) {
            res.status(200).json({ message: 'Idea liked successfully.' });
        } else {
            res.status(404).json({ message: 'Idea not found.' });
        }
    } catch (error) {
        console.error("Error liking idea:", error);
        res.status(500).json({ message: error.message });
    }
});

// Export the router as default
export default router;
