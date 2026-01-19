
import { useEffect, useState } from "react";
import "./Diary.css";
import FormsDiary from "./FormsDiary.jsx";
import TextEditor from "./TextEditor.jsx";
import CalmReflection from "./CalmReflection.jsx";
import GratitudeJournal from "./GratitudeJournal.jsx";
import MemoryTracker from "./MemoryTracker.jsx";
import MyDiaryPages from "./MyDailyPages.jsx"; 
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import axios from "axios";
import { useAuth } from "./AuthContext";

const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className="cute-modal-overlay">
    <div className="cute-modal-content">
      <div className="cute-modal-icon">🧸</div>
      <p>{message}</p>
      <div className="cute-modal-buttons">
        <button className="cute-btn-yes" onClick={onConfirm}>Yes, delete it!</button>
        <button className="cute-btn-no" onClick={onCancel}>No, keep it</button>
      </div>
    </div>
  </div>
);

function Diary() {
  const { user, login } = useAuth();
  const [step, setStep] = useState(1);
  const [lockType, setLockType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pageType, setPageType] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [journalTemplate, setJournalTemplate] = useState("");
  const [showJournalCanvas, setShowJournalCanvas] = useState(false);
  const [showSavedPages, setShowSavedPages] = useState(false);
  const [cutePrompt, setCutePrompt] = useState({ show: false, message: "" });
  const [savedPages, setSavedPages] = useState([]);
  const [editingPage, setEditingPage] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deletePageId, setDeletePageId] = useState(null);

  // --- LOCK & UNLOCK STATES ---
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockInput, setUnlockInput] = useState("");

  const token = localStorage.getItem("token");

  // Determine if setup is done based on the user object from the DATABASE
  const hasPasswordSet = user?.diaryPassword && user.diaryPassword !== "";

  const triggerPrompt = (msg) => {
    setCutePrompt({ show: true, message: msg });
    setTimeout(() => setCutePrompt({ show: false, message: "" }), 3000);
  };

  // --- FLOW CONTROL LOGIC ---
  useEffect(() => {
    if (!user) return;

    if (hasPasswordSet) {
      // If user has a password, stay on Step 1 (Unlock Screen)
      setStep(1);
      setIsUnlocked(false);
    } else {
      // ONLY start the "Welcome to Setup" timer if NO password exists
      setStep(1);
      const timer = setTimeout(() => {
        setStep(2);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasPasswordSet, user]);

  // Fetch Pages via async/await
  useEffect(() => {
    const fetchPages = async () => {
      try {
  const res = await axios.get(
     `${import.meta.env.VITE_API_URL}/api/diary`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

        setSavedPages(res.data);
      } catch (err) {
        console.error("Failed to fetch saved pages", err);
      }
    };
    if (token && isUnlocked) fetchPages();
  }, [token, isUnlocked]);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (unlockInput === user.diaryPassword) {
      setIsUnlocked(true);
      setStep(4); 
      triggerPrompt("🔓 Welcome back, lovely!");
    } else {
      triggerPrompt("❌ Incorrect Password");
    }
  };

  const handleFinalizeSetup = async () => {
   try {
  const finalPassword = lockType === "password" ? password : pin;
  const res = await axios.put(
     `${import.meta.env.VITE_API_URL}/api/auth/update/${user._id}`,
    {
      diaryPassword: finalPassword,
    }
  );


      if (res.data?.user) {
        // Update global user state so hasPasswordSet becomes true
        login({ token: localStorage.getItem("token"), user: res.data.user });
        setIsUnlocked(true);
        setStep(4);
        triggerPrompt("✨ Diary Protected!");
      }
    } catch (err) {
      triggerPrompt("😢 Setup failed. Try again.");
    }
  };

  const handleSavePage = async (pageData) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

if (editingPage) {
 const res = await axios.put(
  `${import.meta.env.VITE_API_URL}/api/diary/${editingPage._id}`,
  pageData,
  config
);

  setSavedPages((prev) =>
    prev.map((p) => (p._id === editingPage._id ? res.data : p))
  );
  triggerPrompt("✨ Page updated!");
} else {
  const res = await axios.post(
    "https://b8094b66-4cc1-4972-8c77-31cd8e70f560-00-abi5h71rz1rr.pike.replit.dev/api/diary",
    pageData,
    config
  );
  setSavedPages((prev) => [res.data, ...prev]);
  triggerPrompt("📖 Saved to your heart!");
}

      setShowEditor(false);
      setShowJournalCanvas(false);
      setEditingPage(null);
      setStep(4);
    } catch (err) {
      triggerPrompt("😢 Save failed");
    }
  };

  const confirmDelete = async () => {
    try {
     await axios.delete(
`${import.meta.env.VITE_API_URL}//api/diary/${deletePageId}`,
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);

      setSavedPages((prev) => prev.filter((p) => p._id !== deletePageId));
      triggerPrompt("🗑️ Page deleted.");
    } catch (err) {
      triggerPrompt("😢 Delete failed");
    } finally {
      setShowConfirmModal(false);
      setDeletePageId(null);
    }
  };

  return (
    <>
      <Navbar />
      {cutePrompt.show && <div className="cute-toast">{cutePrompt.message}</div>}

      <div className="diary-container">
        <div className="diary-layout">
          <div className="diary-content">
            
            {/* 1. LOCK SCREEN (Shows if user has a password and hasn't unlocked yet) */}
            {hasPasswordSet && !isUnlocked && (
              <div className="unlock-container welcome-box">
                <h2 className="form-heading">Unlock Your Diary 🔒</h2>
                <form onSubmit={handleUnlock} className="diary-form">
                  <input 
                    type="password" 
                    placeholder="Enter your diary password..." 
                    value={unlockInput}
                    onChange={(e) => setUnlockInput(e.target.value)}
                    required
                    autoFocus
                  />
                  <button type="submit">Unlock</button>
                </form>
              </div>
            )}

            {/* 2. WELCOME ANIMATION (Only for users with NO password) */}
            {!hasPasswordSet && step === 1 && (
              <div className="welcome-box">
                <h1 className="diary-heading">Welcome to Your Diary</h1>
                <p className="diary-text">A safe space for your thoughts.</p>
              </div>
            )}

            {/* 3. SETUP FLOW (Only for users with NO password) */}
            {!hasPasswordSet && (step === 2 || step === 3) && (
              <FormsDiary 
                step={step} setStep={setStep} 
                lockType={lockType} setLockType={setLockType}
                password={password} setPassword={setPassword}
                confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                pin={pin} setPin={setPin}
                confirmPin={confirmPin} setConfirmPin={setConfirmPin}
                onFinalize={handleFinalizeSetup}
              />
            )}

            {/* 4. MAIN DIARY CONTENT (Only if Unlocked) */}
            {isUnlocked && (
              <>
                {step === 4 && !showEditor && !showSavedPages && (
                  <div className="form-box page-center">
                    <h2 className="form-heading">Choose Your Diary Page Style</h2>
                    <div className="page-grid">
                      {[{ id: "text", title: "Text Page", icon: "✍️" }, { id: "journal", title: "Journaling Page", icon: "📓" }].map((page) => (
                        <div key={page.id} className={`page-card ${pageType === page.id ? "selected" : ""}`} onClick={() => setPageType(page.id)}>
                          <span className="page-icon">{page.icon}</span>
                          <h4>{page.title}</h4>
                        </div>
                      ))}
                    </div>
                    <div className="button-group">
                      <button className="page-continue" disabled={!pageType} onClick={() => pageType === "text" ? setStep(5) : setStep(6)}>Continue</button>
                      <button className="page-back" onClick={() => setShowSavedPages(true)}>View Saved Pages</button>
                    </div>
                  </div>
                )}

                {showSavedPages && (
                  <MyDiaryPages 
                    pages={savedPages} 
                    onEdit={(p) => { setEditingPage(p); setShowEditor(true); setShowSavedPages(false); }} 
                    onDelete={(id) => { setDeletePageId(id); setShowConfirmModal(true); }} 
                    onBack={() => { setShowSavedPages(false); setStep(4); }} 
                  />
                )}

                {step === 5 && pageType === "text" && !showEditor && (
                  <div className="form-box page-center">
                    <h2 className="form-heading">Choose Your Page Color 🎨</h2>
                    <div className="color-grid">
                      {["#FFF3E0", "#E3F2FD", "#E8F5E9", "#FCE4EC", "#F3E5F5", "#FFFDE7"].map((color) => (
                        <div key={color} className="color-card" style={{ backgroundColor: color, border: selectedColor === color ? "3px solid #ffb7c5" : "none" }} onClick={() => setSelectedColor(color)} />
                      ))}
                    </div>
                    <div className="button-group">
                      <button className="page-back" onClick={() => setStep(4)}>Back</button>
                      <button className="page-continue" disabled={!selectedColor} onClick={() => setShowEditor(true)}>Continue to Editor</button>
                    </div>
                  </div>
                )}

                {showEditor && (
                  <TextEditor pageColor={selectedColor} initialContent={editingPage?.content || ""} onBack={() => { setShowEditor(false); setEditingPage(null); }} onSave={handleSavePage} />
                )}

                {step === 6 && pageType === "journal" && (
                  <div className="form-box page-center">
                    {!showJournalCanvas ? (
                      <>
                        <h2 className="form-heading">Choose a Journal Style 📓</h2>
                        <div className="journal-style-card">
                          {[{ id: "calm", title: "Calm Reflection", icon: "🌿" }, { id: "gratitude", title: "Gratitude Journal", icon: "💛" }, { id: "memory", title: "Memory Tracker", icon: "📸" }].map((style) => (
                            <div key={style.id} className={`style-option ${journalTemplate === style.id ? "selected" : ""}`} onClick={() => setJournalTemplate(style.id)}>
                              <span className="page-icon">{style.icon}</span>
                              <h4>{style.title}</h4>
                            </div>
                          ))}
                        </div>
                        <div className="button-group">
                          <button className="page-back" onClick={() => setStep(4)}>Back</button>
                          <button className="page-continue" disabled={!journalTemplate} onClick={() => setShowJournalCanvas(true)}>Continue to Journal</button>
                        </div>
                      </>
                    ) : (
                      <>
                        {journalTemplate === "calm" && <CalmReflection onClose={() => setShowJournalCanvas(false)} onSave={handleSavePage} />}
                        {journalTemplate === "gratitude" && <GratitudeJournal onClose={() => setShowJournalCanvas(false)} onSave={handleSavePage} />}
                        {journalTemplate === "memory" && <MemoryTracker onClose={() => setShowJournalCanvas(false)} onSave={handleSavePage} />}
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {showConfirmModal && <ConfirmModal message="🧸 Delete this page?" onConfirm={confirmDelete} onCancel={() => setShowConfirmModal(false)} />}
      </div>
      <Footer />
    </>
  );
}

export default Diary;