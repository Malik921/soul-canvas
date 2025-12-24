

// import { useEffect, useState } from "react";
// import "./Diary.css";
// import FormsDiary from "./FormsDiary.jsx";
// import TextEditor from "./TextEditor.jsx";
// import CalmReflection from "./CalmReflection.jsx";
// import GratitudeJournal from "./GratitudeJournal.jsx";
// import MemoryTracker from "./MemoryTracker.jsx";
// import MyDiaryPages from "./MyDailyPages.jsx"; 
// import Navbar from "./Navbar.jsx";
// import Footer from "./Footer.jsx";
// import axios from "axios";

// const ConfirmModal = ({ message, onConfirm, onCancel }) => (
//   <div className="cute-modal-overlay">
//     <div className="cute-modal-content">
//       <div className="cute-modal-icon">🧸</div>
//       <p>{message}</p>
//       <div className="cute-modal-buttons">
//         <button className="cute-btn-yes" onClick={onConfirm}>Yes, delete it!</button>
//         <button className="cute-btn-no" onClick={onCancel}>No, keep it</button>
//       </div>
//     </div>
//   </div>
// );

// function Diary() {
//   const [step, setStep] = useState(1);
//   const [lockType, setLockType] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [pin, setPin] = useState("");
//   const [confirmPin, setConfirmPin] = useState("");
//   const [pageType, setPageType] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [showEditor, setShowEditor] = useState(false);
//   const [journalTemplate, setJournalTemplate] = useState("");
//   const [showJournalCanvas, setShowJournalCanvas] = useState(false);
//   const [showSavedPages, setShowSavedPages] = useState(false);
//   const [cutePrompt, setCutePrompt] = useState({ show: false, message: "" });
//   const [savedPages, setSavedPages] = useState([]);
//   const [editingPage, setEditingPage] = useState(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deletePageId, setDeletePageId] = useState(null);

//   // --- LOCK & UNLOCK STATES ---
//   const [isUnlocked, setIsUnlocked] = useState(false);
//   const [unlockInput, setUnlockInput] = useState("");

//   const diarySetupDone = localStorage.getItem("diarySetupDone") === "true";
//   const savedPassword = localStorage.getItem("diaryPassword");
//   const token = localStorage.getItem("token");

//   const triggerPrompt = (msg) => {
//     setCutePrompt({ show: true, message: msg });
//     setTimeout(() => setCutePrompt({ show: false, message: "" }), 3000);
//   };

//   // --- FLOW CONTROL LOGIC ---
//   useEffect(() => {
//     // If user has NO password saved, they MUST go through setup (Steps 1-3)
//     if (!diarySetupDone || !savedPassword) {
//       setStep(1);
//       const timer = setTimeout(() => setStep(2), 2000);
//       return () => clearTimeout(timer);
//     } else {
//       // If they HAVE a password, stay on Step 1 to show the Lock Screen
//       setStep(1);
//       setIsUnlocked(false);
//     }
//   }, [diarySetupDone, savedPassword]);

//   useEffect(() => {
//     const fetchPages = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:5000/api/diary", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSavedPages(res.data);
//       } catch (err) {
//         console.error("Failed to fetch saved pages", err);
//       }
//     };
//     if (token && (isUnlocked || (!diarySetupDone && step >= 4))) fetchPages();
//   }, [token, isUnlocked, diarySetupDone, step]);

//   const handleUnlock = (e) => {
//     e.preventDefault();
//     if (unlockInput === savedPassword) {
//       setIsUnlocked(true);
//       setStep(4); // Move to selection grid
//     } else {
//       alert("Wrong password! 🧸 Try again.");
//     }
//   };

//   const handleSavePage = async (pageData) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       if (editingPage) {
//         const res = await axios.put(`http://127.0.0.1:5000/api/diary/${editingPage._id}`, pageData, config);
//         setSavedPages((prev) => prev.map((p) => (p._id === editingPage._id ? res.data : p)));
//         triggerPrompt("✨ Page updated beautifully!");
//       } else {
//         const res = await axios.post("http://127.0.0.1:5000/api/diary", pageData, config);
//         setSavedPages((prev) => [res.data, ...prev]);
//         triggerPrompt("📖 Page tucked away!");
//       }
//       setShowEditor(false);
//       setShowJournalCanvas(false);
//       setEditingPage(null);
//       setStep(4); 
//     } catch (err) {
//       triggerPrompt("😢 Save failed");
//     }
//   };

//   const confirmDelete = async () => {
//     try {
//       await axios.delete(`http://127.0.0.1:5000/api/diary/${deletePageId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSavedPages((prev) => prev.filter((p) => p._id !== deletePageId));
//       triggerPrompt("🗑️ Page removed.");
//     } catch (err) {
//       triggerPrompt("😢 Delete failed");
//     } finally {
//       setShowConfirmModal(false);
//       setDeletePageId(null);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       {cutePrompt.show && <div className="cute-toast">{cutePrompt.message}</div>}

//       <div className="diary-container">
//         <div className="diary-layout">
//           <div className="diary-content">
            
//             {/* STEP 1: WELCOME OR LOCK SCREEN */}
//             {step === 1 && (
//               <div className="welcome-box">
//                 {diarySetupDone && savedPassword ? (
//                   /* RETURNING USER LOCK SCREEN */
//                   !isUnlocked && (
//                     <div className="unlock-container">
//                       <h2 className="form-heading">Unlock Your Diary 🔒</h2>
//                       <form onSubmit={handleUnlock} className="diary-form">
//                         <input 
//                           type="password" 
//                           placeholder="Enter your password..." 
//                           value={unlockInput}
//                           onChange={(e) => setUnlockInput(e.target.value)}
//                           required
//                         />
//                         <button type="submit">Unlock</button>
//                       </form>
//                     </div>
//                   )
//                 ) : (
//                   /* NEW USER WELCOME ANIMATION */
//                   <>
//                     <h1 className="diary-heading">Welcome to Your Diary</h1>
//                     <p className="diary-text">A safe space for your thoughts.</p>
//                   </>
//                 )}
//               </div>
//             )}

//             {/* SETUP FLOW (Only shows if no password exists) */}
//             {(!diarySetupDone || !savedPassword) && (step === 2 || step === 3) && (
//               <FormsDiary 
//                 step={step} setStep={setStep} 
//                 lockType={lockType} setLockType={setLockType}
//                 password={password} setPassword={setPassword}
//                 confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
//                 pin={pin} setPin={setPin}
//                 confirmPin={confirmPin} setConfirmPin={setConfirmPin}
//               />
//             )}

//             {/* MAIN DIARY CONTENT (Visible after Unlock OR after Setup Finish) */}
//             {(isUnlocked || (!diarySetupDone && step >= 4)) && (
//               <>
//                 {step === 4 && !showEditor && !showSavedPages && (
//                   <div className="form-box page-center">
//                     <h2 className="form-heading">Choose Your Diary Page Style</h2>
//                     <div className="page-grid">
//                       {[{ id: "text", title: "Text Page", icon: "✍️" }, { id: "journal", title: "Journaling Page", icon: "📓" }].map((page) => (
//                         <div key={page.id} className={`page-card ${pageType === page.id ? "selected" : ""}`} onClick={() => setPageType(page.id)}>
//                           <span className="page-icon">{page.icon}</span>
//                           <h4>{page.title}</h4>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="button-group">
//                       <button className="page-continue" disabled={!pageType} onClick={() => pageType === "text" ? setStep(5) : setStep(6)}>Continue</button>
//                       <button className="page-back" onClick={() => setShowSavedPages(true)}>View Saved Pages</button>
//                     </div>
//                   </div>
//                 )}

//                 {showSavedPages && (
//                   <MyDiaryPages 
//                     pages={savedPages} 
//                     onEdit={(p) => { setEditingPage(p); setShowEditor(true); setShowSavedPages(false); }} 
//                     onDelete={(id) => { setDeletePageId(id); setShowConfirmModal(true); }} 
//                     onBack={() => { setShowSavedPages(false); setStep(4); }} 
//                   />
//                 )}

//                 {step === 5 && pageType === "text" && !showEditor && (
//                   <div className="form-box page-center">
//                     <h2 className="form-heading">Choose Your Page Color 🎨</h2>
//                     <div className="color-grid">
//                       {["#FFF3E0", "#E3F2FD", "#E8F5E9", "#FCE4EC", "#F3E5F5", "#FFFDE7"].map((color) => (
//                         <div key={color} className="color-card" style={{ backgroundColor: color, border: selectedColor === color ? "3px solid #ffb7c5" : "none" }} onClick={() => setSelectedColor(color)} />
//                       ))}
//                     </div>
//                     <div className="button-group">
//                       <button className="page-back" onClick={() => setStep(4)}>Back</button>
//                       <button className="page-continue" disabled={!selectedColor} onClick={() => setShowEditor(true)}>Continue to Editor</button>
//                     </div>
//                   </div>
//                 )}

//                 {showEditor && (
//                   <TextEditor pageColor={selectedColor} initialContent={editingPage?.content || ""} onBack={() => { setShowEditor(false); setEditingPage(null); }} onSave={handleSavePage} />
//                 )}

//                 {step === 6 && pageType === "journal" && (
//                   <div className="form-box page-center">
//                     {!showJournalCanvas ? (
//                       <>
//                         <h2 className="form-heading">Choose a Journal Style 📓</h2>
//                         <div className="journal-style-card">
//                           {[{ id: "calm", title: "Calm Reflection", icon: "🌿" }, { id: "gratitude", title: "Gratitude Journal", icon: "💛" }, { id: "memory", title: "Memory Tracker", icon: "📸" }].map((style) => (
//                             <div key={style.id} className={`style-option ${journalTemplate === style.id ? "selected" : ""}`} onClick={() => setJournalTemplate(style.id)}>
//                               <span className="page-icon">{style.icon}</span>
//                               <h4>{style.title}</h4>
//                             </div>
//                           ))}
//                         </div>
//                         <div className="button-group">
//                           <button className="page-back" onClick={() => setStep(4)}>Back</button>
//                           <button className="page-continue" disabled={!journalTemplate} onClick={() => setShowJournalCanvas(true)}>Continue to Journal</button>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         {journalTemplate === "calm" && <CalmReflection onClose={() => setShowJournalCanvas(false)} onSave={handleSavePage} />}
//                         {journalTemplate === "gratitude" && <GratitudeJournal onClose={() => setShowJournalCanvas(false)} onSave={handleSavePage} />}
//                         {journalTemplate === "memory" && <MemoryTracker onClose={() => setShowJournalCanvas(false)} onSave={handleSavePage} />}
//                       </>
//                     )}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//         {showConfirmModal && <ConfirmModal message="🧸 Delete this page?" onConfirm={confirmDelete} onCancel={() => setShowConfirmModal(false)} />}
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Diary;

// import { useEffect, useState } from "react";
// import "./Diary.css";
// import FormsDiary from "./FormsDiary.jsx";
// import TextEditor from "./TextEditor.jsx";
// import CalmReflection from "./CalmReflection.jsx";
// import GratitudeJournal from "./GratitudeJournal.jsx";
// import MemoryTracker from "./MemoryTracker.jsx";
// import MyDiaryPages from "./MyDailyPages.jsx";
// import Navbar from "./Navbar.jsx";
// import Footer from "./Footer.jsx";
// import axios from "axios";
// import { useAuth } from "./AuthContext"; // Ensure this is imported

// const ConfirmModal = ({ message, onConfirm, onCancel }) => (
//   <div className="cute-modal-overlay">
//     <div className="cute-modal-content">
//       <div className="cute-modal-icon">🧸</div>
//       <p>{message}</p>
//       <div className="cute-modal-buttons">
//         <button className="cute-btn-yes" onClick={onConfirm}>Yes, delete it!</button>
//         <button className="cute-btn-no" onClick={onCancel}>No, keep it</button>
//       </div>
//     </div>
//   </div>
// );

// function Diary() {
//   const { user, login } = useAuth(); // Access user and login from context
//   const [step, setStep] = useState(1);
//   const [lockType, setLockType] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [pin, setPin] = useState("");
//   const [confirmPin, setConfirmPin] = useState("");
//   const [pageType, setPageType] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [showEditor, setShowEditor] = useState(false);
//   const [journalTemplate, setJournalTemplate] = useState("");
//   const [showJournalCanvas, setShowJournalCanvas] = useState(false);
//   const [showSavedPages, setShowSavedPages] = useState(false);
//   const [cutePrompt, setCutePrompt] = useState({ show: false, message: "" });
//   const [savedPages, setSavedPages] = useState([]);
//   const [editingPage, setEditingPage] = useState(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deletePageId, setDeletePageId] = useState(null);

//   // --- LOCK & UNLOCK STATES ---
//   const [isUnlocked, setIsUnlocked] = useState(false);
//   const [unlockInput, setUnlockInput] = useState("");

//   const token = localStorage.getItem("token");

//   // Determine if setup is done based on the user object from backend
//   const diarySetupDone = user?.diaryPassword && user.diaryPassword !== "";

//   const triggerPrompt = (msg) => {
//     setCutePrompt({ show: true, message: msg });
//     setTimeout(() => setCutePrompt({ show: false, message: "" }), 3000);
//   };

//   // --- FLOW CONTROL LOGIC ---
//   useEffect(() => {
//     if (!diarySetupDone) {
//       setStep(1);
//       const timer = setTimeout(() => setStep(2), 2000);
//       return () => clearTimeout(timer);
//     } else {
//       setStep(1);
//       setIsUnlocked(false);
//     }
//   }, [diarySetupDone]);

//   // Fetch Saved Pages using async/await
//   useEffect(() => {
//     const fetchPages = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:5000/api/diary", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSavedPages(res.data);
//       } catch (err) {
//         console.error("Failed to fetch saved pages", err);
//       }
//     };
//     if (token && isUnlocked) fetchPages();
//   }, [token, isUnlocked]);

//   // Handle Unlock using async/await
//   const handleUnlock = async (e) => {
//     e.preventDefault();
//     // Simulate a brief check for better UX
//     if (unlockInput === user.diaryPassword) {
//       setIsUnlocked(true);
//       setStep(4);
//       triggerPrompt("🔓 Welcome back!");
//     } else {
//       triggerPrompt("❌ Wrong password! 🧸");
//     }
//   };

//   // Handle Initial Password Setup using async/await
//   const handleFinalizeSetup = async () => {
//     try {
//       const res = await axios.put(`http://127.0.0.1:5000/api/auth/update/${user._id}`, {
//         diaryPassword: password, // Sending the password from state to backend
//       });

//       if (res.data?.user) {
//         login({ token: localStorage.getItem("token"), user: res.data.user });
//         triggerPrompt("✨ Password set successfully!");
//         setIsUnlocked(true);
//         setStep(4);
//       }
//     } catch (err) {
//       triggerPrompt("😢 Failed to save password");
//     }
//   };

//   const handleSavePage = async (pageData) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       if (editingPage) {
//         const res = await axios.put(`http://127.0.0.1:5000/api/diary/${editingPage._id}`, pageData, config);
//         setSavedPages((prev) => prev.map((p) => (p._id === editingPage._id ? res.data : p)));
//         triggerPrompt("✨ Page updated beautifully!");
//       } else {
//         const res = await axios.post("http://127.0.0.1:5000/api/diary", pageData, config);
//         setSavedPages((prev) => [res.data, ...prev]);
//         triggerPrompt("📖 Page tucked away!");
//       }
//       setShowEditor(false);
//       setShowJournalCanvas(false);
//       setEditingPage(null);
//       setStep(4);
//     } catch (err) {
//       triggerPrompt("😢 Save failed");
//     }
//   };

//   const confirmDelete = async () => {
//     try {
//       await axios.delete(`http://127.0.0.1:5000/api/diary/${deletePageId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSavedPages((prev) => prev.filter((p) => p._id !== deletePageId));
//       triggerPrompt("🗑️ Page removed.");
//     } catch (err) {
//       triggerPrompt("😢 Delete failed");
//     } finally {
//       setShowConfirmModal(false);
//       setDeletePageId(null);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       {cutePrompt.show && <div className="cute-toast">{cutePrompt.message}</div>}

//       <div className="diary-container">
//         <div className="diary-layout">
//           <div className="diary-content">
            
//             {/* STEP 1: WELCOME OR LOCK SCREEN */}
//             {step === 1 && (
//               <div className="welcome-box">
//                 {diarySetupDone ? (
//                   !isUnlocked && (
//                     <div className="unlock-container">
//                       <h2 className="form-heading">Unlock Your Diary 🔒</h2>
//                       <form onSubmit={handleUnlock} className="diary-form">
//                         <input 
//                           type="password" 
//                           placeholder="Enter your password..." 
//                           value={unlockInput}
//                           onChange={(e) => setUnlockInput(e.target.value)}
//                           required
//                         />
//                         <button type="submit">Unlock</button>
//                       </form>
//                     </div>
//                   )
//                 ) : (
//                   <>
//                     <h1 className="diary-heading">Welcome to Your Diary</h1>
//                     <p className="diary-text">A safe space for your thoughts.</p>
//                   </>
//                 )}
//               </div>
//             )}

//             {/* SETUP FLOW */}
//             {!diarySetupDone && (step === 2 || step === 3) && (
//               <FormsDiary 
//                 step={step} setStep={setStep} 
//                 lockType={lockType} setLockType={setLockType}
//                 password={password} setPassword={setPassword}
//                 confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
//                 pin={pin} setPin={setPin}
//                 confirmPin={confirmPin} setConfirmPin={setConfirmPin}
//                 onFinalize={handleFinalizeSetup} // Pass the async function to FormsDiary
//               />
//             )}

//             {/* MAIN DIARY CONTENT */}
//             {isUnlocked && (
//               <>
//                 {step === 4 && !showEditor && !showSavedPages && (
//                   <div className="form-box page-center">
//                     <h2 className="form-heading">Choose Your Diary Page Style</h2>
//                     <div className="page-grid">
//                       {[{ id: "text", title: "Text Page", icon: "✍️" }, { id: "journal", title: "Journaling Page", icon: "📓" }].map((page) => (
//                         <div key={page.id} className={`page-card ${pageType === page.id ? "selected" : ""}`} onClick={() => setPageType(page.id)}>
//                           <span className="page-icon">{page.icon}</span>
//                           <h4>{page.title}</h4>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="button-group">
//                       <button className="page-continue" disabled={!pageType} onClick={() => pageType === "text" ? setStep(5) : setStep(6)}>Continue</button>
//                       <button className="page-back" onClick={() => setShowSavedPages(true)}>View Saved Pages</button>
//                     </div>
//                   </div>
//                 )}

//                 {showSavedPages && (
//                   <MyDiaryPages 
//                     pages={savedPages} 
//                     onEdit={(p) => { setEditingPage(p); setShowEditor(true); setShowSavedPages(false); }} 
//                     onDelete={(id) => { setDeletePageId(id); setShowConfirmModal(true); }} 
//                     onBack={() => { setShowSavedPages(false); setStep(4); }} 
//                   />
//                 )}

//                 {step === 5 && pageType === "text" && !showEditor && (
//                   <div className="form-box page-center">
//                     <h2 className="form-heading">Choose Your Page Color 🎨</h2>
//                     <div className="color-grid">
//                       {["#FFF3E0", "#E3F2FD", "#E8F5E9", "#FCE4EC", "#F3E5F5", "#FFFDE7"].map((color) => (
//                         <div key={color} className="color-card" style={{ backgroundColor: color, border: selectedColor === color ? "3px solid #ffb7c5" : "none" }} onClick={() => setSelectedColor(color)} />
//                       ))}
//                     </div>
//                     <div className="button-group">
//                       <button className="page-back" onClick={() => setStep(4)}>Back</button>
//                       <button className="page-continue" disabled={!selectedColor} onClick={() => setShowEditor(true)}>Continue to Editor</button>
//                     </div>
//                   </div>
//                 )}

//                 {showEditor && (
//                   <TextEditor pageColor={selectedColor} initialContent={editingPage?.content || ""} onBack={() => { setShowEditor(false); setEditingPage(null); }} onSave={handleSavePage} />
//                 )}

//                 {step === 6 && pageType === "journal" && (
//                   <div className="form-box page-center">
//                     {!showJournalCanvas ? (
//                       <>
//                         <h2 className="form-heading">Choose a Journal Style 📓</h2>
//                         <div className="journal-style-card">
//                           {[{ id: "calm", title: "Calm Reflection", icon: "🌿" }, { id: "gratitude", title: "Gratitude Journal", icon: "💛" }, { id: "memory", title: "Memory Tracker", icon: "📸" }].map((style) => (
//                             <div key={style.id} className={`style-option ${journalTemplate === style.id ? "selected" : ""}`} onClick={() => setJournalTemplate(style.id)}>
//                               <span className="page-icon">{style.icon}</span>
//                               <h4>{style.title}</h4>
//                             </div>
//                           ))}
//                         </div>
//                         <div className="button-group">
//                           <button className="page-back" onClick={() => setStep(4)}>Back</button>
//                           <button className="page-continue" disabled={!journalTemplate} onClick={() => setShowJournalCanvas(true)}>Continue to Journal</button>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         {journalTemplate === "calm" && <CalmReflection onClose={() => setShowJournalCanvas(false)} onSave={handleSavePage} />}
//                         {journalTemplate === "gratitude" && <GratitudeJournal onClose={() => setShowJournalCanvas(false)} onSave={handleSavePage} />}
//                         {journalTemplate === "memory" && <MemoryTracker onClose={() => setShowJournalCanvas(false)} onSave={handleSavePage} />}
//                       </>
//                     )}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//         {showConfirmModal && <ConfirmModal message="🧸 Delete this page?" onConfirm={confirmDelete} onCancel={() => setShowConfirmModal(false)} />}
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Diary;

// import { useEffect, useState } from "react";
// import "./Diary.css";
// import FormsDiary from "./FormsDiary.jsx";
// import TextEditor from "./TextEditor.jsx";
// import CalmReflection from "./CalmReflection.jsx";
// import GratitudeJournal from "./GratitudeJournal.jsx";
// import MemoryTracker from "./MemoryTracker.jsx";
// import MyDiaryPages from "./MyDailyPages.jsx";
// import Navbar from "./Navbar.jsx";
// import Footer from "./Footer.jsx";
// import axios from "axios";
// import { useAuth } from "./AuthContext";

// const ConfirmModal = ({ message, onConfirm, onCancel }) => (
//   <div className="cute-modal-overlay">
//     <div className="cute-modal-content">
//       <div className="cute-modal-icon">🧸</div>
//       <p>{message}</p>
//       <div className="cute-modal-buttons">
//         <button className="cute-btn-yes" onClick={onConfirm}>Yes, delete it!</button>
//         <button className="cute-btn-no" onClick={onCancel}>No, keep it</button>
//       </div>
//     </div>
//   </div>
// );

// function Diary() {
//   const { user, login } = useAuth();
//   const [step, setStep] = useState(1);
//   const [lockType, setLockType] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [pin, setPin] = useState("");
//   const [confirmPin, setConfirmPin] = useState("");
//   const [pageType, setPageType] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [showEditor, setShowEditor] = useState(false);
//   const [journalTemplate, setJournalTemplate] = useState("");
//   const [showJournalCanvas, setShowJournalCanvas] = useState(false);
//   const [showSavedPages, setShowSavedPages] = useState(false);
//   const [cutePrompt, setCutePrompt] = useState({ show: false, message: "" });
//   const [savedPages, setSavedPages] = useState([]);
//   const [editingPage, setEditingPage] = useState(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deletePageId, setDeletePageId] = useState(null);

//   // --- LOCK & UNLOCK STATES ---
//   const [isUnlocked, setIsUnlocked] = useState(false);
//   const [unlockInput, setUnlockInput] = useState("");

//   const token = localStorage.getItem("token");

//   // CRITICAL FIX: Direct check from the user object
//   const hasPasswordSet = user?.diaryPassword && user.diaryPassword !== "";

//   const triggerPrompt = (msg) => {
//     setCutePrompt({ show: true, message: msg });
//     setTimeout(() => setCutePrompt({ show: false, message: "" }), 3000);
//   };

//   // --- FLOW CONTROL LOGIC ---
//   useEffect(() => {
//     // If no user is loaded yet, do nothing
//     if (!user) return;

//     if (!hasPasswordSet) {
//       // ONLY start setup if no password exists
//       setStep(1);
//       const timer = setTimeout(() => {
//           setStep(2);
//       }, 2000);
//       return () => clearTimeout(timer);
//     } else {
//       // If password exists, stay on Step 1 (which will show Lock Screen)
//       setStep(1);
//       setIsUnlocked(false);
//     }
//   }, [hasPasswordSet, user]);

//   useEffect(() => {
//     const fetchPages = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:5000/api/diary", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSavedPages(res.data);
//       } catch (err) {
//         console.error("Failed to fetch saved pages", err);
//       }
//     };
//     if (token && isUnlocked) fetchPages();
//   }, [token, isUnlocked]);

//   const handleUnlock = (e) => {
//     e.preventDefault();
//     if (unlockInput === user.diaryPassword) {
//       setIsUnlocked(true);
//       setStep(4); // Jump straight to diary selection
//       triggerPrompt("🔓 Welcome back!");
//     } else {
//       alert("Wrong password! 🧸 Try again.");
//     }
//   };

//   const handleFinalizeSetup = async () => {
//     try {
//       const res = await axios.put(`http://127.0.0.1:5000/api/auth/update/${user._id}`, {
//         diaryPassword: password,
//       });

//       if (res.data?.user) {
//         // Update context so hasPasswordSet becomes true
//         login({ token: localStorage.getItem("token"), user: res.data.user });
//         setIsUnlocked(true);
//         setStep(4);
//         triggerPrompt("✨ Password saved!");
//       }
//     } catch (err) {
//       triggerPrompt("😢 Save failed");
//     }
//   };

//   const handleSavePage = async (pageData) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       if (editingPage) {
//         const res = await axios.put(`http://127.0.0.1:5000/api/diary/${editingPage._id}`, pageData, config);
//         setSavedPages((prev) => prev.map((p) => (p._id === editingPage._id ? res.data : p)));
//         triggerPrompt("✨ Updated!");
//       } else {
//         const res = await axios.post("http://127.0.0.1:5000/api/diary", pageData, config);
//         setSavedPages((prev) => [res.data, ...prev]);
//         triggerPrompt("📖 Saved!");
//       }
//       setShowEditor(false);
//       setShowJournalCanvas(false);
//       setEditingPage(null);
//       setStep(4);
//     } catch (err) {
//       triggerPrompt("😢 Error saving");
//     }
//   };

//   const confirmDelete = async () => {
//     try {
//       await axios.delete(`http://127.0.0.1:5000/api/diary/${deletePageId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSavedPages((prev) => prev.filter((p) => p._id !== deletePageId));
//       triggerPrompt("🗑️ Deleted.");
//     } catch (err) {
//       triggerPrompt("😢 Delete failed");
//     } finally {
//       setShowConfirmModal(false);
//       setDeletePageId(null);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       {cutePrompt.show && <div className="cute-toast">{cutePrompt.message}</div>}

//       <div className="diary-container">
//         <div className="diary-layout">
//           <div className="diary-content">
            
//             {/* 1. LOCK SCREEN (Shows if password exists and is NOT unlocked) */}
//             {hasPasswordSet && !isUnlocked && step === 1 && (
//               <div className="unlock-container welcome-box">
//                 <h2 className="form-heading">Unlock Your Diary 🔒</h2>
//                 <form onSubmit={handleUnlock} className="diary-form">
//                   <input 
//                     type="password" 
//                     placeholder="Enter password..." 
//                     value={unlockInput}
//                     onChange={(e) => setUnlockInput(e.target.value)}
//                     required
//                   />
//                   <button type="submit">Unlock</button>
//                 </form>
//               </div>
//             )}

//             {/* 2. WELCOME ANIMATION (Shows briefly ONLY for NEW users) */}
//             {!hasPasswordSet && step === 1 && (
//               <div className="welcome-box">
//                 <h1 className="diary-heading">Welcome to Your Diary</h1>
//                 <p className="diary-text">A safe space for your thoughts.</p>
//               </div>
//             )}

//             {/* 3. SETUP FLOW (Only if no password exists) */}
//             {!hasPasswordSet && (step === 2 || step === 3) && (
//               <FormsDiary 
//                 step={step} setStep={setStep} 
//                 lockType={lockType} setLockType={setLockType}
//                 password={password} setPassword={setPassword}
//                 confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
//                 pin={pin} setPin={setPin}
//                 confirmPin={confirmPin} setConfirmPin={setConfirmPin}
//                 onFinalize={handleFinalizeSetup}
//               />
//             )}

//             {/* 4. MAIN DIARY PAGES (Visible ONLY if Unlocked) */}
//             {isUnlocked && (
//               <>
//                 {step === 4 && !showEditor && !showSavedPages && (
//                   <div className="form-box page-center">
//                     <h2 className="form-heading">Diary Style</h2>
//                     <div className="page-grid">
//                       {[{ id: "text", title: "Text Page", icon: "✍️" }, { id: "journal", title: "Journaling", icon: "📓" }].map((page) => (
//                         <div key={page.id} className={`page-card ${pageType === page.id ? "selected" : ""}`} onClick={() => setPageType(page.id)}>
//                           <span className="page-icon">{page.icon}</span>
//                           <h4>{page.title}</h4>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="button-group">
//                       <button className="page-continue" disabled={!pageType} onClick={() => pageType === "text" ? setStep(5) : setStep(6)}>Continue</button>
//                       <button className="page-back" onClick={() => setShowSavedPages(true)}>View History</button>
//                     </div>
//                   </div>
//                 )}

//                 {showSavedPages && (
//                   <MyDiaryPages 
//                     pages={savedPages} 
//                     onEdit={(p) => { setEditingPage(p); setShowEditor(true); setShowSavedPages(false); }} 
//                     onDelete={(id) => { setDeletePageId(id); setShowConfirmModal(true); }} 
//                     onBack={() => { setShowSavedPages(false); setStep(4); }} 
//                   />
//                 )}

//                 {step === 5 && !showEditor && (
//                    <div className="form-box page-center">
//                    <h2 className="form-heading">Choose Your Page Color 🎨</h2>
//                    <div className="color-grid">
//                      {["#FFF3E0", "#E3F2FD", "#E8F5E9", "#FCE4EC", "#F3E5F5", "#FFFDE7"].map((color) => (
//                        <div key={color} className="color-card" style={{ backgroundColor: color, border: selectedColor === color ? "3px solid #ffb7c5" : "none" }} onClick={() => setSelectedColor(color)} />
//                      ))}
//                    </div>
//                    <div className="button-group">
//                      <button className="page-back" onClick={() => setStep(4)}>Back</button>
//                      <button className="page-continue" disabled={!selectedColor} onClick={() => setShowEditor(true)}>Open Editor</button>
//                    </div>
//                  </div>
//                 )}

//                 {showEditor && (
//                   <TextEditor pageColor={selectedColor} initialContent={editingPage?.content || ""} onBack={() => { setShowEditor(false); setEditingPage(null); }} onSave={handleSavePage} />
//                 )}

//                 {step === 6 && (
//                    <div className="form-box page-center">
//                    {!showJournalCanvas ? (
//                      <>
//                        <h2 className="form-heading">Journal Style 📓</h2>
//                        <div className="journal-style-card">
//                          {[{ id: "calm", title: "Calm Reflection", icon: "🌿" }, { id: "gratitude", title: "Gratitude", icon: "💛" }, { id: "memory", title: "Memories", icon: "📸" }].map((style) => (
//                            <div key={style.id} className={`style-option ${journalTemplate === style.id ? "selected" : ""}`} onClick={() => setJournalTemplate(style.id)}>
//                              <span className="page-icon">{style.icon}</span>
//                              <h4>{style.title}</h4>
//                            </div>
//                          ))}
//                        </div>
//                        <div className="button-group">
//                          <button className="page-back" onClick={() => setStep(4)}>Back</button>
//                          <button className="page-continue" disabled={!journalTemplate} onClick={() => setShowJournalCanvas(true)}>Continue</button>
//                        </div>
//                      </>
//                    ) : (
//                      <>
//                        {journalTemplate === "calm" && <CalmReflection onClose={() => setShowJournalCanvas(false)} onSave={handleSavePage} />}
//                        {journalTemplate === "gratitude" && <GratitudeJournal onClose={() => setShowJournalCanvas(false)} onSave={handleSavePage} />}
//                        {journalTemplate === "memory" && <MemoryTracker onClose={() => setShowJournalCanvas(false)} onSave={handleSavePage} />}
//                      </>
//                    )}
//                  </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//         {showConfirmModal && <ConfirmModal message="Delete this memory?" onConfirm={confirmDelete} onCancel={() => setShowConfirmModal(false)} />}
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Diary;

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
        const res = await axios.get("http://127.0.0.1:5000/api/diary", {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      const res = await axios.put(`http://127.0.0.1:5000/api/auth/update/${user._id}`, {
        diaryPassword: finalPassword,
      });

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
        const res = await axios.put(`http://127.0.0.1:5000/api/diary/${editingPage._id}`, pageData, config);
        setSavedPages((prev) => prev.map((p) => (p._id === editingPage._id ? res.data : p)));
        triggerPrompt("✨ Page updated!");
      } else {
        const res = await axios.post("http://127.0.0.1:5000/api/diary", pageData, config);
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
      await axios.delete(`http://127.0.0.1:5000/api/diary/${deletePageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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