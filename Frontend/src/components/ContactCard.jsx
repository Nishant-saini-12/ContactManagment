// ContactCard.jsx - Displays a single contact with edit and delete actions

/**
 * @param {Object}   contact  - Contact data object
 * @param {Function} onEdit   - Called with contact when edit is clicked
 * @param {Function} onDelete - Called with contact._id when delete is clicked
 */
function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="contact-card">
      {/* Avatar using first letter of name */}
      <div className="contact-avatar">
        {contact.name.charAt(0).toUpperCase()}
      </div>

      <div className="contact-info">
        <h3 className="contact-name">{contact.name}</h3>
        <p className="contact-phone">📞 {contact.phone}</p>
        {/* Only render email if it exists */}
        {contact.email && (
          <p className="contact-email">✉️ {contact.email}</p>
        )}
      </div>

      <div className="contact-actions">
        <button className="btn-edit" onClick={() => onEdit(contact)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(contact._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ContactCard;
