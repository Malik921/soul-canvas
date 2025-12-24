import "./About.css";
import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"
import soul from "../assets/Aboout.jpeg"
const About = () => {
  return (
    <>
    < Navbar/>
    <section className="about-wrapper">
      <div className="about-card">

        {/* LEFT – TEXT */}
        <div className="about-text">
          <h2>SoulCanvas</h2>

          <p>
            SoulCanvas is a gentle space for emotional expression — where
            thoughts, moods, and memories are shaped through color and reflection.
          </p>

          <p>
            Designed as a calm digital canvas, it allows users to pause, feel,
            and translate emotions into something visual and meaningful.
          </p>

          <p>
            Every interaction is intentional, helping transform everyday
            feelings into a personal story of emotional growth.
          </p>
        </div>

        {/* RIGHT – IMAGE (INSIDE SAME CARD) */}
        <div className="about-image">
          <img src={soul} alt="SoulCanvas" />
        </div>

      </div>
    </section>
    <Footer />
    </>
  );
};

export default About;