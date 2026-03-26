// contact.router.js - Route definitions for contacts

import express from 'express';
import {
  httpCreateContact,
  httpGetAllContacts,
  httpGetContact,
  httpUpdateContact,
  httpDeleteContact,
} from './contact.controller.js';

const contactRouter = express.Router();

// POST   /api/contacts       - Create a new contact
contactRouter.post('/', httpCreateContact);

// GET    /api/contacts       - Get all contacts
contactRouter.get('/', httpGetAllContacts);

// GET    /api/contacts/:id   - Get a single contact
contactRouter.get('/:id', httpGetContact);

// PUT    /api/contacts/:id   - Update a contact
contactRouter.put('/:id', httpUpdateContact);

// DELETE /api/contacts/:id   - Delete a contact
contactRouter.delete('/:id', httpDeleteContact);

export default contactRouter;
