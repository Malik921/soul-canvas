
import "./MyDailyPages.css"; // Make sure to import the new CSS!

function MyDiaryPages({ pages, onEdit, onDelete, onBack }) {
  return (
    <div className="form-box page-center">
      <div className="saved-pages-header">
        <button className="page-back" onClick={onBack}>
          Back to Styles
        </button>
        <h2 className="form-heading">My Saved Pages 📚</h2>
      </div>

      {pages.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>No pages yet ✨</p>
          <button className="page-continue" onClick={onBack}>Create your first page</button>
        </div>
      ) : (
        <div className="saved-pages-grid">
          {pages.map((page) => (
            <div key={page._id} className="saved-page-card" style={{ backgroundColor: page.pageColor || "#fff" }}>
              <small>{new Date(page.createdAt).toDateString()}</small>
              <div className="page-preview" dangerouslySetInnerHTML={{ __html: page.content }} />
              <div className="page-actions">
                <button onClick={() => onEdit(page)}>Edit ✏️</button>
                <button onClick={() => onDelete(page._id)}>Delete 🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDiaryPages;