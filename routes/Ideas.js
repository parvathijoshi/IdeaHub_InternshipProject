// routes/Ideas.js
import express from 'express';
import Idea from '../models/Idea.js'; // Adjust the import path as necessary

const router = express.Router();

// Route to get all ideas
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.findAll();
        res.json(ideas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to create a new idea
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newIdea = await Idea.create({ title, description });
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
router.put('/:id', async (req, res) => { // Fixed this line
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const updatedIdea = await Idea.update(
            { title, description },
            { where: { id } }
        );
        
        if (updatedIdea[0] === 0) {
            return res.status(404).send({ message: 'Idea not found' });
        }

        res.send({ id, title, description });
    } catch (error) {
        res.status(500).send({ message: 'Error updating idea', error });
    }
});
  


// Export the router as default
export default router;
