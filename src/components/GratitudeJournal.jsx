
import { useState } from "react";
import "./GratitudeJournal.css";

function GratitudeJournal({ onClose, onSave }) {
  const [gratitude, setGratitude] = useState({
    one: "", two: "", three: "",
    smile: "", moment: "",
  });

  const handleFinalSave = () => {
    const formattedContent = `
      <b>🌞 Gratitude List:</b><br/>1. ${gratitude.one}<br/>2. ${gratitude.two}<br/>3. ${gratitude.three}<br/><br/>
      <b>💌 Made me smile:</b><br/>${gratitude.smile}<br/><br/>
      <b>✨ Positive moment:</b><br/>${gratitude.moment}
    `;

    onSave({
      type: "journal",
      content: formattedContent,
      pageColor: "#FFFDE7", // Sunlight yellow
    });
  };

  return (
    <div className="gratitude-wrapper">
      <div className="gratitude-card">
        <h2 className="gratitude-title">💛 Gratitude Journal</h2>
        <div className="gratitude-section">
          <h4>🌞 Three things I’m grateful for today</h4>
          <input placeholder="1." value={gratitude.one} onChange={(e) => setGratitude({ ...gratitude, one: e.target.value })} />
          <input placeholder="2." value={gratitude.two} onChange={(e) => setGratitude({ ...gratitude, two: e.target.value })} />
          <input placeholder="3." value={gratitude.three} onChange={(e) => setGratitude({ ...gratitude, three: e.target.value })} />
        </div>
        <div className="gratitude-section">
          <h4>💌 Someone or something that made me smile</h4>
          <textarea placeholder="Write a few words…" value={gratitude.smile} onChange={(e) => setGratitude({ ...gratitude, smile: e.target.value })} />
        </div>
        <div className="gratitude-section">
          <h4>✨ One positive moment from today</h4>
          <textarea placeholder="Capture the moment…" value={gratitude.moment} onChange={(e) => setGratitude({ ...gratitude, moment: e.target.value })} />
        </div>
        <div className="gratitude-actions">
          <button className="secondary" onClick={onClose}>Close</button>
          <button className="primary" onClick={handleFinalSave}>Save Gratitude</button>
        </div>
      </div>
    </div>
  );
}

export default GratitudeJournal;