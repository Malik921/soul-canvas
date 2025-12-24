import React, { useState } from "react";
import "./Moods.css";

const TrackMoodModal = ({ moodData, onClose }) => {
  const moods = { happy: "😺", sad: "😿", angry: "😾", calm: "😸", tired: "😴" };
  const [filter, setFilter] = useState("all");

  // Convert moodData object into entries and filter by selected mood
  const filteredData = Object.entries(moodData).filter(([date, obj]) =>
    filter === "all" ? true : obj.mood === filter
  );

  return (
    <div className="modal-overlay">
      <div className="track-mood-modal">
        <h2>Track Moods</h2>

        <div className="track-mood-filter">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "10px 15px",
              borderRadius: "10px",
              border: "none",
              fontSize: "16px",
              background: "#3f523f",
              color: "#f3f0eb",
              cursor: "pointer",
              outline: "none",
              appearance: "none" // removes default arrow styling on some browsers
            }}
          >
            <option value="all" style={{ background: "#3f523f", color: "#f3f0eb" }}>All</option>
            {Object.keys(moods).map((m) => (
              <option
                key={m}
                value={m}
                style={{ background: "#3f523f", color: "#f3f0eb" }}
              >
                {moods[m]} {m.charAt(0).toUpperCase() + m.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="track-mood-list">
          {filteredData.length > 0 ? (
            filteredData.map(([date, obj]) => (
              <div key={date} className="track-mood-item">
                <span>{date}</span>
                <span>
                  {moods[obj.mood]} {obj.mood.charAt(0).toUpperCase() + obj.mood.slice(1)}
                  {obj.reason && ` (${obj.reason})`}
                </span>
              </div>
            ))
          ) : (
            <p style={{ color: "#f3f0eb" }}>No moods found.</p>
          )}
        </div>

        <button
          className="mood-btn secondary"
          onClick={onClose}
          style={{ marginTop: "15px" }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TrackMoodModal;