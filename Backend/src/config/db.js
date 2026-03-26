// db.js - MongoDB connection using Mongoose

import mongoose from 'mongoose';

/**
 * Connect to MongoDB using the MONGO_URL from environment variables
 */
export async function connectDB() {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error('MONGO_URL is not defined in environment variables.');
  }

  await mongoose.connect(mongoUrl);
  console.log('MongoDB connected successfully.');
}
