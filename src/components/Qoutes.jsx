import "./quotes.css";
import { useState } from "react";
import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"
import {
  FaHeart,
  FaLeaf,
  FaBrain,
  FaStar,
  FaFeatherAlt,
  FaBolt,
  FaUserAlt,
  FaArrowLeft,
  FaRegSmile,
  FaMoon,
  FaSeedling,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

/* =========================
   BEAUTIFUL QUOTE ICONS
========================= */

const quoteIcons = [
  <HiOutlineSparkles />,
  <FaFeatherAlt />,
  <FaLeaf />,
];

/* =========================
   QUOTES DATA (20 EACH)
========================= */

const quotesData = {
  emotional: [
    "Some emotions are too deep for words.",
    "Your heart remembers what your mind forgets.",
    "Tears speak when silence cannot.",
    "Not all pain is loud.",
    "Feeling deeply is a quiet strength.",
    "Some wounds are invisible.",
    "The heart carries untold stories.",
    "Soft hearts feel the most.",
    "Emotions shape who we become.",
    "Pain teaches empathy.",
    "Your feelings are real.",
    "The heart needs time.",
    "Emotions don’t need permission.",
    "Crying is human.",
    "Some emotions stay forever.",
    "Love and pain coexist.",
    "Your heart is brave.",
    "Emotions deserve space.",
    "Depth is not weakness.",
    "Feel everything gently.",
  ],
  healing: [
    "Healing begins when you choose yourself.",
    "Time doesn’t heal, acceptance does.",
    "Your scars are proof of survival.",
    "Breathe, you are mending.",
    "Healing is not linear.",
    "Rest is part of recovery.",
    "You are allowed to heal slowly.",
    "Gentleness heals the soul.",
    "Peace returns quietly.",
    "You’re stronger than you feel.",
    "Healing requires patience.",
    "Let yourself rest.",
    "Your heart is learning.",
    "Soft days will return.",
    "Healing takes courage.",
    "You are rebuilding.",
    "Pain fades gradually.",
    "Be kind to your wounds.",
    "Growth follows healing.",
    "You are healing, even now.",
  ],
  mentalHealth: [
    "Not every battle is visible.",
    "It’s okay to not be okay.",
    "Your feelings are valid.",
    "Rest is productive.",
    "Asking for help is strength.",
    "Your mind deserves kindness.",
    "Mental peace matters.",
    "Healing includes your thoughts.",
    "Silence can feel heavy.",
    "You are not broken.",
    "Slow days are allowed.",
    "Your mind needs care.",
    "Breathe through anxiety.",
    "You are trying your best.",
    "Thoughts don’t define you.",
    "You deserve calm.",
    "Mental health is health.",
    "Your struggles matter.",
    "Peace is possible.",
    "You are not alone.",
  ],
  selfLove: [
    "You are enough as you are.",
    "Self-love is a daily choice.",
    "Respect yourself first.",
    "You deserve kindness.",
    "Choose yourself without guilt.",
    "Confidence grows with self-trust.",
    "You are your home.",
    "Love yourself gently.",
    "Your worth is not negotiable.",
    "You matter.",
    "Self-love is healing.",
    "Speak kindly to yourself.",
    "You deserve peace.",
    "Your value is constant.",
    "Honor your needs.",
    "Self-respect is power.",
    "You are worthy.",
    "Care for yourself deeply.",
    "Choose inner peace.",
    "Love who you are becoming.",
  ],
  spiritual: [
    "The soul knows the way.",
    "Trust the universe’s timing.",
    "Stillness speaks wisdom.",
    "Your soul is listening.",
    "Faith grows in silence.",
    "You are guided.",
    "The universe responds to calm hearts.",
    "Spiritual growth is inward.",
    "Peace is sacred.",
    "The soul remembers truth.",
    "Energy flows where faith goes.",
    "You are connected.",
    "The universe is patient.",
    "Spiritual journeys are quiet.",
    "Trust divine timing.",
    "Your soul is ancient.",
    "Listen within.",
    "Faith feels peaceful.",
    "Light exists inside you.",
    "The universe supports you.",
  ],
  love: [
    "Love should feel like peace.",
    "True love feels safe.",
    "Love grows in honesty.",
    "Love is patient energy.",
    "Real love listens.",
    "Love doesn’t confuse.",
    "Love heals quietly.",
    "Choose love over fear.",
    "Love begins within.",
    "Love stays gentle.",
    "Love respects boundaries.",
    "Love feels warm.",
    "Love nurtures growth.",
    "Love is understanding.",
    "Love is calm.",
    "Love is sincere.",
    "Love speaks softly.",
    "Love is presence.",
    "Love accepts flaws.",
    "Love feels like home.",
  ],
  brokenHeart: [
    "Some goodbyes hurt deeply.",
    "Healing follows heartbreak.",
    "Loss changes us.",
    "Pain fades slowly.",
    "Not every ending has closure.",
    "The heart takes time.",
    "Broken hearts still beat.",
    "Love leaves echoes.",
    "You will love again.",
    "Healing follows grief.",
    "Heartbreak teaches strength.",
    "Loss reshapes love.",
    "Pain will ease.",
    "Let yourself grieve.",
    "Your heart is healing.",
    "Sadness will soften.",
    "You survived love.",
    "Healing will come.",
    "Broken doesn’t mean lost.",
    "Hope returns quietly.",
  ],
  innerPeace: [
    "Peace begins with acceptance.",
    "Calm is a choice.",
    "Silence restores balance.",
    "Peace is powerful.",
    "Let go gently.",
    "Inner peace is freedom.",
    "Breathe into calm.",
    "Stillness heals.",
    "Choose peace daily.",
    "Peace lives within.",
    "Quiet moments matter.",
    "Calm your thoughts.",
    "Peace is patience.",
    "Rest your mind.",
    "Peace feels light.",
    "Peace is self-care.",
    "Stillness is strength.",
    "Choose calm today.",
    "Peace grows slowly.",
    "Balance brings peace.",
  ],
  growth: [
    "Growth feels uncomfortable.",
    "Change creates strength.",
    "Progress takes patience.",
    "You are evolving.",
    "Growth requires courage.",
    "Learning never stops.",
    "Every step matters.",
    "Growth begins with effort.",
    "Becoming takes time.",
    "Transformation is quiet.",
    "Growth is intentional.",
    "Small steps count.",
    "You are improving.",
    "Growth is personal.",
    "Discomfort brings clarity.",
    "Growth needs persistence.",
    "You are changing.",
    "Growth builds wisdom.",
    "You are learning.",
    "Trust your growth.",
  ],
  lifeReality: [
    "Life teaches through experience.",
    "Reality shapes wisdom.",
    "Truth is not always gentle.",
    "Life is imperfect.",
    "Hard days exist.",
    "Reality builds resilience.",
    "Life requires patience.",
    "Acceptance brings clarity.",
    "Truth matures us.",
    "Life is a journey.",
    "Reality isn’t fair.",
    "Life changes constantly.",
    "Experience teaches truth.",
    "Life humbles us.",
    "Reality brings lessons.",
    "Life is uncertain.",
    "Growth comes from reality.",
    "Truth takes time.",
    "Life keeps moving.",
    "Reality grounds us.",
  ],
  loneliness: [
    "Loneliness is feeling unseen.",
    "Silence can feel heavy.",
    "Being alone isn’t empty.",
    "Loneliness teaches self-awareness.",
    "Some nights feel longer.",
    "Solitude reveals truth.",
    "Loneliness passes.",
    "You are not invisible.",
    "Stillness holds meaning.",
    "Connection will return.",
    "Loneliness isn’t weakness.",
    "Silence speaks loudly.",
    "You will be understood.",
    "Lonely moments fade.",
    "You are worthy of connection.",
    "Loneliness heals perspective.",
    "Alone doesn’t mean unloved.",
    "Stillness brings clarity.",
    "You are seen.",
    "You belong.",
  ],
  motivational: [
    "Keep going, even slowly.",
    "Your effort matters.",
    "Progress is progress.",
    "Rise again.",
    "Believe in your strength.",
    "You are capable.",
    "Stay consistent.",
    "Don’t quit today.",
    "Your future needs you.",
    "Move forward bravely.",
    "Small steps win.",
    "You are resilient.",
    "Dreams need action.",
    "Push gently forward.",
    "Courage grows daily.",
    "You can do this.",
    "Keep showing up.",
    "Trust your effort.",
    "Success takes patience.",
    "Never stop trying.",
  ],
};

/* =========================
   QUOTE TYPES
========================= */

const quoteTypes = [
  { key: "emotional", title: "Emotional Quotes", icon: <FaHeart />, desc: "Deep feelings and emotions expressed through heartfelt words." },
  { key: "healing", title: "Healing Quotes", icon: <FaLeaf />, desc: "Gentle words that comfort the soul and encourage recovery." },
  { key: "mentalHealth", title: "Mental Health Quotes", icon: <FaBrain />, desc: "Thoughts that acknowledge struggles and promote inner balance." },
  { key: "selfLove", title: "Self Love Quotes", icon: <FaRegSmile />, desc: "Affirmations that nurture confidence and self-worth." },
  { key: "spiritual", title: "Spiritual Quotes", icon: <FaMoon />, desc: "Soulful reflections about faith and inner connection." },
  { key: "love", title: "Love Quotes", icon: <FaHeart />, desc: "Expressions of affection and emotional intimacy." },
  { key: "brokenHeart", title: "Broken Heart Quotes", icon: <FaFeatherAlt />, desc: "Words for healing, loss, and emotional pain." },
  { key: "innerPeace", title: "Inner Peace Quotes", icon: <FaLeaf />, desc: "Calming thoughts that bring stillness and clarity." },
  { key: "growth", title: "Growth Quotes", icon: <FaSeedling />, desc: "Insights about change and personal evolution." },
  { key: "lifeReality", title: "Life Reality Quotes", icon: <FaBrain />, desc: "Honest reflections on life’s truths." },
  { key: "loneliness", title: "Loneliness Quotes", icon: <FaUserAlt />, desc: "Quiet words for moments of solitude." },
  { key: "motivational", title: "Motivational Quotes", icon: <FaBolt />, desc: "Encouraging words that inspire action." },
];

/* =========================
   COMPONENT
========================= */

function Quotes() {
  const [activeType, setActiveType] = useState(null);

  const activeTitle = quoteTypes.find(
    (item) => item.key === activeType
  )?.title;

  return (
    <>
    <Navbar />
    <section className="quotes-section">
      <h2 className="section-title">
        {activeType ? activeTitle : "Emotions in Words"}
      </h2>

      {activeType && (
        <button className="back-btn" onClick={() => setActiveType(null)}>
          <FaArrowLeft /> Back
        </button>
      )}

      {!activeType && (
        <div className="quotes-grid">
          {quoteTypes.map((item) => (
            <div key={item.key} className="quote-card">
              <div className="quote-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>

              {/* ✅ ONLY BUTTON IS CLICKABLE */}
              <button
                className="explore-btn"
                onClick={() => setActiveType(item.key)}
              >
                Tap to explore
              </button>
            </div>
          ))}
        </div>
      )}

      {activeType && (
        <div className="quotes-grid">
          {quotesData[activeType].map((quote, index) => (
            <div className="quote-card" key={index}>
              <div className="quote-icon">
                {quoteIcons[index % quoteIcons.length]}
              </div>
              <p>{quote}</p>
            </div>
          ))}
        </div>
      )}
    </section>
    <Footer />
    </>
  );
}

export default Quotes;