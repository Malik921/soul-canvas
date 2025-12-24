import React from "react";
import "./Moods.css";

const MoodView = ({ data, onClose }) => {
  const moods = { happy: "😺", sad: "😿", angry: "😾", calm: "😸", tired: "😴" };

  if (!data) return null;

  return (
    <div className="modal-overlay">
      <div className="mood-selector-modal">
        <h2>Mood on {data.date}</h2>
        <p style={{ fontSize: "40px", margin: "15px 0" }}>
          {moods[data.mood]} {data.mood.charAt(0).toUpperCase() + data.mood.slice(1)}
        </p>
        {data.reason && (
          <p style={{ fontStyle: "italic", color: "#f3f0eb", marginBottom: "15px" }}>
            "{data.reason}"
          </p>
        )}
        <div className="mood-selector-actions">
          <button className="mood-btn secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodView;