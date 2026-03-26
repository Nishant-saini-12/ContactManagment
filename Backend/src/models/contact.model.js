// contact.model.js - DB interaction functions for Contact

import Contact from './contact.mongo.js';

/**
 * Create a new contact in the database
 * @param {Object} data - { name, phone, email }
 */
export async function createContact(data) {
  const contact = new Contact(data);
  return await contact.save();
}

/**
 * Retrieve contacts with optional search and pagination
 * @param {string} search - Search query (numbers → phone, letters → name)
 * @param {number} page   - Current page number (default: 1)
 * @param {number} limit  - Results per page (default: 10)
 */
export async function getAllContacts(search = '', page = 1, limit = 10) {
  const query = {};

  const trimmed = search.trim();

  if (trimmed) {
    // If search contains ANY alphabet character → search by name (case-insensitive)
    // If search contains ONLY numbers → search by phone (partial match)
    const isNumericOnly = /^\d+$/.test(trimmed);

    if (isNumericOnly) {
      query.phone = { $regex: trimmed, $options: '' };
    } else {
      query.name = { $regex: trimmed, $options: 'i' };
    }
  }

  const skip = (page - 1) * limit;

  // Run count and data fetch in parallel for efficiency
  const [total, data] = await Promise.all([
    Contact.countDocuments(query),
    Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
  ]);

  return { data, total };
}

/**
 * Retrieve a single contact by its MongoDB ID
 * @param {string} id - MongoDB ObjectId
 */
export async function getContactById(id) {
  return await Contact.findById(id);
}

/**
 * Update a contact by ID with new data
 * @param {string} id - MongoDB ObjectId
 * @param {Object} data - Fields to update
 */
export async function updateContact(id, data) {
  return await Contact.findByIdAndUpdate(id, data, {
    new: true,           // Return the updated document
    runValidators: true, // Run schema validators on update
  });
}

/**
 * Delete a contact by ID
 * @param {string} id - MongoDB ObjectId
 */
export async function deleteContact(id) {
  return await Contact.findByIdAndDelete(id);
}
