import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "./Goals.css";
import Goals22 from "../assets/Goals33.png";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function Goals() {
  const { user } = useAuth();
  const [goalText, setGoalText] = useState("");
  const [goalType, setGoalType] = useState("Daily");
  const [goals, setGoals] = useState([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [undoGoal, setUndoGoal] = useState(null);
  const undoTimerRef = useRef(null);

  const token = localStorage.getItem("token");

  // Fetch goals from backend on mount
  useEffect(() => {
    if (!user) return;
    fetchGoals();
  }, [user]);

  const fetchGoals = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/goals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(res.data);
    } catch (err) {
      console.error("Error fetching goals:", err);
    }
  };

  /* ADD GOAL */
  const addGoal = async () => {
    if (!goalText.trim()) return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/goals`,
        { text: goalText, type: goalType },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setGoals([...goals, res.data]);
      setGoalText("");
    } catch (err) {
      console.error("Error adding goal:", err);
    }
  };

  /* ENTER KEY */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") addGoal();
  };

  /* TOGGLE */
  const toggleGoal = async (id) => {
    try {
      const goal = goals.find((g) => g._id === id);
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/goals/${id}`,
        { completed: !goal.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setGoals(goals.map((g) => (g._id === id ? res.data : g)));
    } catch (err) {
      console.error("Error toggling goal:", err);
    }
  };

  /* ASK DELETE */
  const requestDelete = (goal) => {
    setGoalToDelete(goal);
    setShowConfirm(true);
  };

  /* CONFIRM DELETE */
  const confirmDelete = async () => {
    if (!goalToDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/goals/${goalToDelete._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setGoals(goals.filter((g) => g._id !== goalToDelete._id));
      setUndoGoal(goalToDelete);

      clearTimeout(undoTimerRef.current);
      undoTimerRef.current = setTimeout(() => setUndoGoal(null), 5000);
    } catch (err) {
      console.error("Error deleting goal:", err);
      alert("Failed to delete goal 💔");
    } finally {
      setShowConfirm(false);
      setGoalToDelete(null);
    }
  };

  /* UNDO DELETE */
  const undoDelete = async () => {
    if (!undoGoal) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/goals`,
        { text: undoGoal.text, type: undoGoal.type, completed: undoGoal.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setGoals((prevGoals) => [...prevGoals, res.data]);
      setUndoGoal(null);
      clearTimeout(undoTimerRef.current);
    } catch (err) {
      console.error("Error undoing delete:", err);
      alert("Could not restore the goal 💔");
    }
  };

  /* RENDER GOALS */
  const renderGoals = (type) =>
    goals
      .filter((g) => g.type === type)
      .map((goal) => (
        <div className="goal-card" key={goal._id}>
          <span className={`goal-text ${goal.completed ? "completed" : ""}`}>{goal.text}</span>
          <div className="goal-actions">
            <button className={`complete-btn ${goal.completed ? "done" : ""}`} onClick={() => toggleGoal(goal._id)}>
              {goal.completed ? "Completed" : "Complete"}
            </button>
            <button className="delete-btn" onClick={() => requestDelete(goal)}>✕</button>
          </div>
        </div>
      ));

  return (
    <>
      <Navbar />
      <section className="goals-wrapper">
        <div className="goals-card">
          <div className="logic-card">
            <h1>🌱 Goals for Your Well-Being</h1>
            <p className="subtitle">Track your progress and stay motivated.</p>
            <div className="goal-input-wrapper">
              <input
                type="text"
                placeholder="Add a new goal..."
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <select value={goalType} onChange={(e) => setGoalType(e.target.value)}>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Long-Term</option>
              </select>
              <button onClick={addGoal}>Add Goal</button>
            </div>

            <div className="goals-section">
              <h2>Daily Goals</h2>
              {renderGoals("Daily")}
            </div>
            <div className="goals-section">
              <h2>Weekly Goals</h2>
              {renderGoals("Weekly")}
            </div>
            <div className="goals-section">
              <h2>Long-Term Goals</h2>
              {renderGoals("Long-Term")}
            </div>

            <p className="footer-text">You’re doing great, keep it up ⭐</p>
          </div>
          <div className="goals-image">
            <img src={Goals22} alt="Goals" />
          </div>
        </div>
      </section>

      <Footer />

      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>💔 Delete this goal?</p>
            <div className="confirm-actions">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {undoGoal && (
        <div className="undo-snackbar">
          Goal deleted
          <span onClick={undoDelete}>UNDO</span>
        </div>
      )}
    </>
  );
}

export default Goals;
