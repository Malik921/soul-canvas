
import React, { useState } from "react";
import "./Moods.css";

const MoodSelector = ({ date, currentMood, currentReason, onSave, onDelete, onClose }) => {
  const moods = { happy: "😺", sad: "😿", angry: "😾", calm: "😸", tired: "😴" };
  const [selectedMood, setSelectedMood] = useState(currentMood || "");
  const [reason, setReason] = useState(currentReason || "");

  const handleSave = () => {
    if (!selectedMood) return alert("Select a mood!");
    onSave(date, selectedMood, reason);
    onClose();
  };

 

  return (
    <div className="modal-overlay">
      <div className="mood-selector-modal">
        <h2>Mood for Today</h2>
        <p>{date}</p>
        <div className="mood-options">
          {Object.keys(moods).map((key) => (
            <button
              key={key}
              className={`mood-option-btn ${selectedMood === key ? "selected" : ""}`}
              onClick={() => setSelectedMood(key)}
            >
              {moods[key]} {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
        {selectedMood && (
          <textarea
            className="mood-reason-textarea"
            placeholder={`Why are you feeling ${selectedMood}?`}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        )}
        <div className="mood-selector-actions">
          <button className="mood-btn secondary" onClick={handleSave}>Save Mood</button>
          {/* {selectedMood && <button className="mood-btn secondary" onClick={handleDelete}>Delete Mood</button>} */}
          <button className="mood-btn secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default MoodSelector;

