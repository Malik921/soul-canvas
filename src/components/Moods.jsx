import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import TrackMoodModal from "./TrackMoodModal";
import MoodSelector from "./MoodSelector";
import "./Moods.css";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

/* ===========================
    LOCAL DATE HELPER
=========================== */
const getLocalDateString = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const Moods = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [moodData, setMoodData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [toast, setToast] = useState(null);

  const token = localStorage.getItem("token");

  const moods = {
    happy: "😺",
    sad: "😿",
    angry: "😾",
    calm: "😸",
    tired: "😴",
  };

  /* ===========================
      FETCH MOODS
  =========================== */
  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/moods`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formatted = {};
      res.data.forEach((m) => {
        formatted[m.date] = { mood: m.mood, reason: m.reason, _id: m._id };
      });

      setMoodData(formatted);
    } catch (err) {
      console.error("Failed to fetch moods", err);
    }
  };

  /* ===========================
      CALENDAR CLICK
  =========================== */
  const handleDateClick = (clickedDate) => {
    const todayStr = new Date().toLocaleDateString("en-CA");
    const clickedStr = clickedDate.toLocaleDateString("en-CA");

    if (clickedStr === todayStr) {
      setSelectedDate(clickedStr);
      setShowMoodSelector(true);
    } else {
      setToast({ message: "🌸 You can only add mood for today!", type: "error" });
      setTimeout(() => setToast(null), 3000);
    }
  };

  /* ===========================
      SAVE MOOD
  =========================== */
  const handleSaveMood = async (date, mood, reason = "") => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/moods`,
        { date, mood, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchMoods(); // Refresh data
      setToast({ message: "Mood saved 💚", type: "success" });
      setTimeout(() => setToast(null), 2000);
    } catch (err) {
      console.error("Save mood failed", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="moods-page">
        <div className="main-card">
          <div className="left-cards">
            <div className="mood-card">
              <h2>Add Mood</h2>
              <p>Capture how your soul feels today.</p>
              <button className="mood-btn" onClick={() => setShowCalendar(true)}>
                Tap to Add Mood
              </button>
            </div>

            <div className="mood-card">
              <h2>Track Moods</h2>
              <p>Understand your emotional patterns.</p>
              <button className="mood-btn" onClick={() => setShowTrackModal(true)}>
                Tap to Track Mood
              </button>
            </div>
          </div>

          <div className="right-image">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
              alt="Mood"
            />
          </div>
        </div>

        {showCalendar && (
          <div className="modal-overlay">
            <div className="calendar-modal">
              <h2>Feelings Calendar</h2>
              <Calendar
                onClickDay={handleDateClick}
                tileContent={({ date }) => {
                  const key = getLocalDateString(date);
                  return moodData[key] ? <div className="mood-emoji">{moods[moodData[key].mood]}</div> : null;
                }}
              />
              <button className="mood-btn secondary" onClick={() => setShowCalendar(false)}>
                Close
              </button>
            </div>
          </div>
        )}

        {showMoodSelector && selectedDate && (
          <MoodSelector
            date={selectedDate}
            currentMood={moodData[selectedDate]?.mood}
            currentReason={moodData[selectedDate]?.reason}
            onSave={handleSaveMood}
            onClose={() => setShowMoodSelector(false)}
          />
        )}

        {showTrackModal && <TrackMoodModal moodData={moodData} onClose={() => setShowTrackModal(false)} />}

        {toast && (
          <div className="toast-overlay">
            <div className="toast-message">{toast.message}</div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Moods;
