// server.js - Express app entry point

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import contactRouter from './routers/contact.router.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());                // Enable Cross-Origin Resource Sharing
app.use(express.json());        // Parse incoming JSON request bodies

// --- Routes ---
// Base route: /api/contacts
app.use('/api/contacts', contactRouter);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Contact Management API is running.' });
});

// --- Start Server ---
async function startServer() {
  try {
    // Connect to MongoDB before starting the server
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();
