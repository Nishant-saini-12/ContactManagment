// App.jsx - Root component, manages editing state and refresh trigger

import { useState } from 'react';
import { createContact, updateContact } from './api/contacts';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  // Contact currently being edited (null = add mode)
  const [editing, setEditing]       = useState(null);
  // Incrementing this triggers ContactList to re-fetch
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((k) => k + 1);

  // Handle form submit for both add and edit
  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        await updateContact(editing._id, formData);
        setEditing(null);
      } else {
        await createContact(formData);
      }
      refresh();
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📒 Contact Manager</h1>
      </header>

      <main className="app-main">
        {/* Left panel: Add / Edit form */}
        <aside className="form-panel">
          <ContactForm
            editing={editing}
            onSubmit={handleSubmit}
            onCancelEdit={() => setEditing(null)}
          />
        </aside>

        {/* Right panel: Search + List + Pagination */}
        <section className="list-panel">
          <ContactList
            editingId={editing?._id}
            onEdit={setEditing}
            refreshKey={refreshKey}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
