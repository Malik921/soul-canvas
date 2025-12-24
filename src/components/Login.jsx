import { useState } from "react";
import { useAuth } from "./AuthContext";
import { loginUser } from "../api";
import "./Login.css";
import log1 from "../assets/Bear1.png";

function Login({ switchToSignup, onSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prompt, setPrompt] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setPrompt("Please fill all fields 💔");
      return;
    }
    
    try {
      const data = await loginUser({ email, password });
      
      // The backend returns { token, user: { name, email, dob } }
      if (data && data.token) {
        login(data); 
        if (onSuccess) onSuccess(); 
      } else {
        setPrompt(data.message || "Invalid email or password 💔");
      }
    } catch (err) {
      setPrompt("Server error: Could not connect 💔");
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="auth-box">
      {prompt && <div className="cute-prompt">{prompt}</div>}
      <div className="auth-image">
        <img src={log1} alt="login bear" />
      </div>
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> */}
          <div className="password-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <span
    className="eye-toggle"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>
</div>
          <form onSubmit={handleSubmit}>
</form>
          <button className="loginbutton" type="submit">Login</button>
        </form>
        <p className="switch-text">
          Don’t have an account?{" "}
          <span onClick={switchToSignup} className="link-span">
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;