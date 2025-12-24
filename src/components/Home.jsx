/*Home.jsx*/
import { FaSmile, FaQuoteLeft, FaBullseye } from "react-icons/fa";
import { BsJournal } from "react-icons/bs";
import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"
import "./Home.css";
import heroImage from "../assets/soul.png"; // replace with your actual hero image path

const FeatureHighlight = () => {
  const features = [
    {
      icon: <FaSmile size={40} color="#6a7f70" />,
      title: "Track Your Mood",
      description: "Log your daily emotions and see patterns in your mood over time.",
    },
    {
      icon: <BsJournal size={40} color="#866042" />,
      title: "Creative Diary",
      description: "Write, draw, or color your emotions in your personal diary.",
    },
    {
      icon: <FaQuoteLeft size={40} color="#866042" />,
      title: "Daily Inspiration",
      description: "Get hand-picked motivational quotes to uplift your day.",
    },
    {
      icon: <FaBullseye size={40} color="#866042" />,
      title: "Set Goals & Reflect",
      description: "Set personal goals and track your growth alongside your emotions.",
    },
  ];

  return (
   <section className="feature-section">
  <div className="main-feature-card">
    <h2 className="feature-title">Features</h2>

    <div className="feature-cards">
      {features.map((feature, index) => (
        <div className="feature-card" key={index}>
          <div className="feature-icon">{feature.icon}</div>
          <h3 className="feature-name">{feature.title}</h3>
          <p className="feature-desc">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

const Home = () => {
  return (
    <>
    < Navbar/>
    <div className="home-container">
      {/* Tagline at the top */}
     
      {/* Hero Image Section */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
       
      </section>
      <FeatureHighlight /> 
    </div>
    <Footer />
    </>
  );
};

export default Home;