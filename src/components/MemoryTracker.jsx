

import { useState } from "react";
import "./MemoryTracker.css";

const tags = ["Happy", "Family", "Friends", "Study", "Travel", "Personal"];

function MemoryTracker({ onClose, onSave }) {
  const [memory, setMemory] = useState({
    title: "", date: "", note: "", tag: "",
  });

  const handleFinalSave = () => {
    const formattedContent = `
      <b>📸 Memory: ${memory.title}</b><br/>
      <i>Date: ${memory.date} | Tag: ${memory.tag}</i><br/><br/>
      ${memory.note}
    `;

    onSave({
      type: "journal",
      content: formattedContent,
      pageColor: "#E3F2FD", // Memory blue
    });
  };

  return (
    <div className="memory-wrapper">
      <div className="memory-card">
        <h2 className="memory-title">📸 Memory Tracker</h2>
        <label className="memory-label">Memory title
          <input type="text" placeholder="A moment worth remembering" value={memory.title} onChange={(e) => setMemory({ ...memory, title: e.target.value })} />
        </label>
        <label className="memory-label">When did this happen?
          <input type="date" value={memory.date} onChange={(e) => setMemory({ ...memory, date: e.target.value })} />
        </label>
        <label className="memory-label">Describe this memory
          <textarea placeholder="What made it special?" value={memory.note} onChange={(e) => setMemory({ ...memory, note: e.target.value })} />
        </label>
        <div className="memory-tags">
          <p>Tag this memory</p>
          <div className="tag-list">
            {tags.map((t) => (
              <button key={t} className={memory.tag === t ? "active" : ""} onClick={() => setMemory({ ...memory, tag: t })}>{t}</button>
            ))}
          </div>
        </div>
        <div className="memory-actions">
          <button className="secondary" onClick={onClose}>Close</button>
          <button className="primary" onClick={handleFinalSave}>Save Memory</button>
        </div>
      </div>
    </div>
  );
}

export default MemoryTracker;