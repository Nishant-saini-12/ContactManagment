// contact.mongo.js

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      index: true, // 🔍 for search
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      unique: true, // 🚀 ensures no duplicate numbers
      index: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
      unique: true, // optional but good
      sparse: true, // ⚠️ allows multiple null values
    },
  },
  {
    timestamps: true,
  }
);

// Optional: compound index (for advanced queries)
contactSchema.index({ name: 1, phone: 1 });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;