// contact.controller.js - Business logic for contact routes

import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../models/contact.model.js';

/**
 * POST /api/contacts
 * Create a new contact
 */
export async function httpCreateContact(req, res) {
  const { name, phone, email } = req.body;

  // Validate required fields
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }

  try {
    const contact = await createContact({ name, phone, email });
    return res.status(201).json(contact);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/**
 * GET /api/contacts
 * Get all contacts with optional search and pagination
 * Query params: search, page, limit
 */
export async function httpGetAllContacts(req, res) {
  try {
    const search = req.query.search || '';
    const page   = Math.max(1, parseInt(req.query.page)  || 1);
    const limit  = Math.max(1, parseInt(req.query.limit) || 10);

    const { data, total } = await getAllContacts(search, page, limit);

    return res.status(200).json({ data, page, limit, total });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/**
 * GET /api/contacts/:id
 * Get a single contact by ID
 */
export async function httpGetContact(req, res) {
  try {
    const contact = await getContactById(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    return res.status(200).json(contact);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/**
 * PUT /api/contacts/:id
 * Update a contact by ID
 */
export async function httpUpdateContact(req, res) {
  try {
    const updated = await updateContact(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/**
 * DELETE /api/contacts/:id
 * Delete a contact by ID
 */
export async function httpDeleteContact(req, res) {
  try {
    const deleted = await deleteContact(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    return res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
