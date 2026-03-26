// contacts.js - All API calls to the backend contact endpoints

import axios from 'axios';

// Base URL from environment variable (set in .env)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/**
 * Fetch all contacts with optional search and pagination
 * @param {string} search - Search query string
 * @param {number} page   - Page number
 * @param {number} limit  - Results per page
 * @returns {Promise<{ data, page, limit, total }>}
 */
export const fetchContacts = (search = '', page = 1, limit = 10) =>
  API.get('/contacts', { params: { search, page, limit } });

/**
 * Create a new contact
 * @param {{ name, phone, email }} contactData
 */
export const createContact = (contactData) =>
  API.post('/contacts', contactData);

/**
 * Update an existing contact by ID
 * @param {string} id
 * @param {{ name, phone, email }} contactData
 */
export const updateContact = (id, contactData) =>
  API.put(`/contacts/${id}`, contactData);

/**
 * Delete a contact by ID
 * @param {string} id
 */
export const deleteContact = (id) =>
  API.delete(`/contacts/${id}`);
