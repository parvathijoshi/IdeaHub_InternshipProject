// server.js

// Import dependencies and models
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js'; // Import connectDB correctly
import ideasRouter from './routes/Ideas.js';
import loginRouter from './routes/Auth.js';
import commentsRouter from './routes/Comments.js';

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5050;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Route handling
app.use('/api/ideas', ideasRouter);
app.use('/api/auth', loginRouter);
app.use('/api/comments', commentsRouter);
// Connect to the database
connectDB(); // Use the imported `connectDB` function

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
