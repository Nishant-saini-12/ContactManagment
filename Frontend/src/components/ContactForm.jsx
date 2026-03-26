// ContactForm.jsx - Form for creating or editing a contact

import { useState, useEffect } from 'react';

/**
 * Reusable form component for add and edit operations.
 * @param {Object}   editing        - Contact object being edited (null if adding)
 * @param {Function} onSubmit       - Called with form data on submit
 * @param {Function} onCancelEdit   - Called when user cancels an edit
 */
function ContactForm({ editing, onSubmit, onCancelEdit }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [error, setError] = useState('');

  // Populate form fields when editing an existing contact
  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || '',
        phone: editing.phone || '',
        email: editing.email || '',
      });
    } else {
      setForm({ name: '', phone: '', email: '' });
    }
    setError('');
  }, [editing]);

  // Update form state on input change
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Name and phone are required.');
      return;
    }

    setError('');
    onSubmit(form);

    // Reset form only when adding (not editing)
    if (!editing) setForm({ name: '', phone: '', email: '' });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>{editing ? 'Edit Contact' : 'Add Contact'}</h2>

      {/* Error message */}
      {error && <p className="form-error">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Name *"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone *"
        value={form.phone}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email (optional)"
        value={form.email}
        onChange={handleChange}
      />

      <div className="form-actions">
        <button type="submit">{editing ? 'Update' : 'Add Contact'}</button>
        {/* Show cancel button only in edit mode */}
        {editing && (
          <button type="button" className="btn-cancel" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
