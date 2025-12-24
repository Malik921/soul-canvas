import "./Footer.css";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Brand + tagline */}
        <div className="footer-section">
          <h3>SoulCanvas</h3>
          <p>Express your emotions. Color your soul.</p>
          <div className="footer-mini-features">
            <div>🔒 Private & Secure</div>
            <div>🖌 Creative Journaling</div>
            <div>📓 Save Memories</div>
          </div>
        </div>

        {/* Quick links */}
        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li>Home</li>
            <li>Diary</li>
            <li>Mood</li>
            <li>Goals</li>
            <li>Quotes</li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Contact</li>
            <li>Feedback</li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="footer-social">
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2025 SoulCanvas. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;