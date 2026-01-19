

import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import "./Profile.css";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

// Your preset images stored in public/
const PRESET_AVATARS = [
  "/profile1.jpg", "/profile2.jpg", "/profile3.jpg",
  "/profile4.jpg", "/profile5.jpg", "/profile6.jpg",
  "/profile7.jpg", "/profilen1.jpg", "/profilen2.jpg",
  "/profilen3.jpg", "/profilen4.jpg"
];

const Profile = () => {
  const { user, login, logout } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    affirmation: "Growth is a slow process, but it is happening.",
    mood: "Current Mood 🌸",
    intention: "",
    isPrivate: false,
    reminders: false,
  });

  const [profileImg, setProfileImg] = useState("https://ui-avatars.com/api/?name=User&background=random");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        dob: user.dob ? user.dob.split("T")[0] : "",
        affirmation: user.dailyAffirmation || "Growth is a slow process, but it is happening.",
        mood: user.currentMood || "Current Mood 🌸",
        intention: user.todayIntention || "",
        isPrivate: user.isPrivate || false,
        reminders: user.reminders || false,
      });

      // Show the saved preset image
      if (user.profilePic) {
        setProfileImg(user.profilePic);
      }
    }
  }, [user]);

  const handleAvatarSelect = (path) => {
    setProfileImg(path);
  };

  const handleSave = async () => {
    try {
      if (!user?._id) return alert("User not found.");

      // We still use FormData to match your backend structure, 
      // but we only send the URL string now.
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("dob", formData.dob);
      data.append("dailyAffirmation", formData.affirmation);
      data.append("todayIntention", formData.intention);
      data.append("currentMood", formData.mood);
      data.append("isPrivate", formData.isPrivate);
      data.append("reminders", formData.reminders);
      data.append("profilePicUrl", profileImg); 

      const response = await axios.put(
  `https://b8094b66-4cc1-4972-8c77-31cd8e70f560-00-abi5h71rz1rr.pike.replit.dev/api/auth/update/${user._id}`,
  data
);


      if (response.data?.user) {
        login({ token: localStorage.getItem("token"), user: response.data.user });
        setShowEdit(false);
        alert("Profile updated! ✨");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed 💔");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="profile-page-wrapper">
        <div className="profile-card">
          <div className="profile-banner"></div>

          <div className="avatar-container">
            <div className="avatar-ring">
              {/* REMOVED: The plus badge and file input are gone */}
              <img src={profileImg} className="user-photo" alt="Profile" />
            </div>
          </div>

          <div className="profile-body">
            <h1 className="name-heading">{user.name}</h1>
            <p className="handle-text">@{user.email.split("@")[0]}</p>

            <div className="bio-section">
              <h3>Daily Affirmation</h3>
              <p>"{formData.affirmation}"</p>
              <h3>Today's Intention</h3>
              <p>"{formData.intention}"</p>
            </div>

            <button className="profile-btn" onClick={() => setShowEdit(true)}>Settings</button>
            <button className="profile-btn logout-profile-btn" onClick={logout} style={{background: "#e74c3c", color: "white", marginLeft: "10px"}}>
              Logout
            </button>
          </div>
        </div>

        {showEdit && (
          <div className="edit-card-wrapper">
            <div className="profile-card">
              <div className="profile-body">
                <h1 className="name-heading">Edit Profile</h1>

                <p className="selection-label">Select your character:</p>
                <div className="avatar-selection-grid">
                  {PRESET_AVATARS.map((path, index) => (
                    <img 
                      key={index}
                      src={path}
                      className={`avatar-option ${profileImg === path ? "active-avatar" : ""}`}
                      onClick={() => handleAvatarSelect(path)}
                      alt="avatar"
                    />
                  ))}
                </div>

                <input className="edit-input" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input className="edit-input" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <input type="date" className="edit-input" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
                <textarea className="edit-input" placeholder="Affirmation" value={formData.affirmation} onChange={(e) => setFormData({ ...formData, affirmation: e.target.value })} />
                <input className="edit-input" placeholder="Intention" value={formData.intention} onChange={(e) => setFormData({ ...formData, intention: e.target.value })} />

                <select className="edit-input" value={formData.mood} onChange={(e) => setFormData({ ...formData, mood: e.target.value })}>
                  <option>Current Mood 🌸</option>
                  <option>Calm 😌</option>
                  <option>Motivated 🔥</option>
                  <option>Healing 💚</option>
                  <option>Happy ☀️</option>
                </select>

                <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                  <button className="profile-btn" onClick={handleSave}>Save</button>
                  <button className="profile-btn" style={{ background: "#ccc", color: "#000" }} onClick={() => setShowEdit(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;