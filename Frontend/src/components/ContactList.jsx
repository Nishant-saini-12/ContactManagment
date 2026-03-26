// ContactList.jsx - Search bar, contact grid, and pagination

import { useEffect, useState, useCallback } from 'react';
import { fetchContacts, deleteContact } from '../api/contacts';
import ContactCard from './ContactCard';
import Pagination from './Pagination';

const LIMIT = 10; // contacts per page

/**
 * @param {Object}   editingId  - ID of contact currently being edited
 * @param {Function} onEdit     - Called with contact object to trigger edit
 * @param {number}   refreshKey - Incremented by parent to trigger a re-fetch
 */
function ContactList({ editingId, onEdit, refreshKey }) {
  const [contacts, setContacts]   = useState([]);
  const [search, setSearch]       = useState('');
  const [page, setPage]           = useState(1);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  const totalPages = Math.ceil(total / LIMIT);

  // Fetch contacts whenever search, page, or refreshKey changes
  const loadContacts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchContacts(search, page, LIMIT);
      setContacts(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      setError('Failed to load contacts. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, [search, page, refreshKey]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  // Reset to page 1 whenever search query changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // Delete a contact and refresh the list
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    try {
      await deleteContact(id);
      loadContacts();
    } catch {
      setError('Failed to delete contact.');
    }
  };

  return (
    <div className="contact-list">
      {/* Search input */}
      <input
        type="text"
        className="search-input"
        placeholder="Search by name or phone..."
        value={search}
        onChange={handleSearchChange}
      />

      {/* Status messages */}
      {loading && <p className="status-msg">Loading...</p>}
      {error   && <p className="status-msg error">{error}</p>}

      {/* Contact cards */}
      {!loading && contacts.length === 0 && !error && (
        <p className="status-msg">No contacts found.</p>
      )}

      <div className="cards-grid">
        {contacts.map((contact) => (
          <ContactCard
            key={contact._id}
            contact={contact}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Total count */}
      {total > 0 && (
        <p className="total-count">Total: {total} contact{total !== 1 ? 's' : ''}</p>
      )}
    </div>
  );
}

export default ContactList;
