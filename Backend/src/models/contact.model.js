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
 * Retrieve all contacts from the database
 */
export async function getAllContacts() {
  return await Contact.find({}).sort({ createdAt: -1 });
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
