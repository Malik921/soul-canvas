import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { signupUser } from "../api";
import "./Signup.css";
import log2 from "../assets/Bear2.png";

function Signup({ switchToLogin, onSuccess }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    password: "",
    repeatPassword: "",
  });
  const [prompt, setPrompt] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.dob || !formData.password || !formData.repeatPassword) {
      setPrompt("Please fill all fields 💔");
      setTimeout(() => setPrompt(""), 2500);
      return;
    }

    // ===== DOB VALIDATION =====
const dob = new Date(formData.dob);
const today = new Date();

// remove time part for accurate comparison
today.setHours(0, 0, 0, 0);

if (isNaN(dob.getTime())) {
  setPrompt("Invalid date selected 💔");
  setTimeout(() => setPrompt(""), 2500);
  return;
}

// future date check (prevents 2026 etc.)
if (dob > today) {
  setPrompt("Birth date cannot be in the future 💔");
  setTimeout(() => setPrompt(""), 2500);
  return;
}

    if (formData.password !== formData.repeatPassword) {
      setPrompt("Passwords do not match 💔");
      setTimeout(() => setPrompt(""), 2500);
      return;
    }

    try {
      // Sending as a standard object instead of FormData
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        dob: formData.dob,
      };

      const data = await signupUser(dataToSend);

      if (data.token) {
        login(data); 
        if (onSuccess) onSuccess(); 
      } else {
        setPrompt(data.message || "Signup failed 💔");
        setTimeout(() => setPrompt(""), 2500);
      }
    } catch (err) {
      setPrompt("Server error 💔");
      setTimeout(() => setPrompt(""), 2500);
      console.error(err);
    }
  };

  return (
    <div className="signup-box">
      {prompt && <div className="signup-cute-prompt">{prompt}</div>}
      <div className="signup-image">
        <h3 className="welcome">Welcome, beautiful soul ✨</h3>
        <img src={log2} alt="signup" />
      </div>
      <div className="signup-form">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

          {/* <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} /> */}
          <div className="password-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    onChange={handleChange}
  />
  <span
    className="eye-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>
</div>
          {/* <input type="password" name="repeatPassword" placeholder="Repeat Password" value={formData.repeatPassword} onChange={handleChange} /> */}
          <div className="password-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    name="repeatPassword"
    placeholder="Repeat Password"
    onChange={handleChange}
  />
</div>
          <button type="submit">Sign Up</button>
        </form>
        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={switchToLogin} style={{ cursor: "pointer", color: "blue" }}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;