// Pagination.jsx - Pagination controls

/**
 * @param {number}   page       - Current active page
 * @param {number}   totalPages - Total number of pages
 * @param {Function} onPageChange - Called with new page number
 */
function Pagination({ page, totalPages, onPageChange }) {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="page-btn"
      >
        ← Prev
      </button>

      {/* Page number buttons */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`page-btn ${p === page ? 'active' : ''}`}
        >
          {p}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="page-btn"
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
