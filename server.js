// server.js

// Import dependencies and models
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js'; // Import connectDB correctly
import ideasRouter from './routes/Ideas.js';
import Role from './models/Role.js';
import User from './models/User.js';
import Idea from './models/Idea.js';

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5050;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// In-memory user data for authentication (replace with your database logic)
const users = [
    { id: 1, username: 'admin123', password: '12345' } // Updated user credentials
];

// Login route
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    // Check user credentials
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Route handling
app.use('/api/ideas', ideasRouter);

// Connect to the database
connectDB(); // Use the imported `connectDB` function

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
