
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import { BsPersonCircle } from "react-icons/bs";
import logo from "../assets/logo.png";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  // const { isLoggedIn } = useAuth();
  const { isLoggedIn, logout } = useAuth();

  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      setShowLogin(true); 
    }
  };

  return (
    <>
      <div className="layout-container">
        <div className="tagline">Express Your Emotion, Create Your Canvas</div>
        <div className="logo-section">
          <img src={logo} alt="SoulCanvas Logo" className="logo-image" />
        </div>
      </div>

      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/moods">Mood</Link></li>
          <li><Link to="/diary">Diary</Link></li>
          <li><Link to="/goals">Goals</Link></li>
          <li><Link to="/quotes">Quotes</Link></li>
        </ul>

      

        <div className="nav-right">
  {isLoggedIn && (
    <button className="logout-btn" onClick={logout}>
      Logout
    </button>
  )}

  <BsPersonCircle
    className="profile-icon"
    onClick={handleProfileClick}
    style={{
      color: isLoggedIn ? "#4CAF50" : "inherit",
      cursor: "pointer",
    }}
  />
</div>

      </nav>

      {showLogin && (
        <div className="auth-overlay">
          <div className="modal-content">
            <button className="close-btnn" onClick={() => setShowLogin(false)}>×</button>
            <Login
              switchToSignup={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
              onSuccess={() => {
                setShowLogin(false);
                navigate("/profile");
              }}
            />
          </div>
        </div>
      )}

      {showSignup && (
        <div className="auth-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowSignup(false)}>×</button>
            <Signup
              switchToLogin={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
              onSuccess={() => {
                setShowSignup(false);
                navigate("/profile");
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
