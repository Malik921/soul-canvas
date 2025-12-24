

// import React, { useState, useEffect } from "react";
// import { useAuth } from "./AuthContext";
// import axios from "axios";
// import "./Profile.css";
// import Navbar from "./Navbar.jsx";
// import Footer from "./Footer.jsx";

// const Profile = () => {
//   const { user, login, logout } = useAuth();

//   const [showEdit, setShowEdit] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
  

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     dob: "",
//     affirmation: "Growth is a slow process, but it is happening.",
//     mood: "Current Mood 🌸",
//     intention: "",
//     isPrivate: false,
//     reminders: false,
//   });

//   // Fixed variable name to match your JSX usage below
//   const [profileImg, setProfileImg] = useState("https://ui-avatars.com/api/?name=User&background=random");

//   // Load user data
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         dob: user.dob ? user.dob.split("T")[0] : "",
//         affirmation: user.dailyAffirmation || "Growth is a slow process, but it is happening.",
//         mood: user.currentMood || "Current Mood 🌸",
//         intention: user.todayIntention || "",
//         isPrivate: user.isPrivate || false,
//         reminders: user.reminders || false,
//       });

//       // Updated to 127.0.0.1 and fixed function call
//       setProfileImg(
//         user.profilePic
//           ? `http://127.0.0.1:5000${user.profilePic}`
//           : "https://ui-avatars.com/api/?name=User&background=random"
//       );
//     }
//   }, [user]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setProfileImg(URL.createObjectURL(file)); // Temporary preview
//     }
//   };

//   const handleSave = async () => {
//     try {
//       if (!user?._id) return alert("User not found. Please login again.");

//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("email", formData.email);
//       data.append("dob", formData.dob);
//       data.append("dailyAffirmation", formData.affirmation);
//       data.append("todayIntention", formData.intention);
//       data.append("currentMood", formData.mood);
//       data.append("isPrivate", formData.isPrivate);
//       data.append("reminders", formData.reminders);

//       if (selectedFile) data.append("profilePic", selectedFile);

//       // Updated to 127.0.0.1 for stability
//       const response = await axios.put(
//         `http://127.0.0.1:5000/api/auth/update/${user._id}`, 
//         data, 
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.data?.user) {
//         login({ token: localStorage.getItem("token"), user: response.data.user });
//         setShowEdit(false);
//         setSelectedFile(null);
//         alert("Profile updated successfully ✨");
//       }
//     } catch (err) {
//       console.error("Update error:", err.response?.data || err.message);
//       alert("Failed to update profile 💔");
//     }
//   };

//   if (!user) return <p>Loading profile...</p>;

//   return (
//     <>
//       <Navbar />

//       <div className="profile-page-wrapper">
//         <div className="profile-card">
//           <div className="profile-banner"></div>

//           <div className="avatar-container">
//             <div className="avatar-ring">
//               {/* This now uses the correctly defined profileImg */}
//               <img src={profileImg} className="user-photo" alt="Profile" />

//               <label htmlFor="img-upload" className="image-edit-badge">
//                 <span>+</span>
//               </label>

//               <input
//                 type="file"
//                 id="img-upload"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 hidden
//               />
//             </div>
//           </div>

//           <div className="profile-body">
//             <h1 className="name-heading">{user.name}</h1>
//             <p className="handle-text">@{user.email.split("@")[0]}</p>

//             <div className="bio-section">
//               <h3>Daily Affirmation</h3>
//               <p>"{formData.affirmation}"</p>
//               <h3>Today's Intention</h3>
//               <p>"{formData.intention}"</p>
//             </div>

//             <button className="profile-btn" onClick={() => setShowEdit(true)}>
//               Settings
//             </button>
//             <button className="profile-btn logout-profile-btn" onClick={logout} style={{background: "#e74c3c", color: "white", marginLeft: "10px"}}>
//               Logout
//             </button>
//           </div>
//         </div>

//         {showEdit && (
//           <div className="edit-card-wrapper">
//             <div className="profile-card">
//               <div className="profile-banner"></div>

//               <div className="profile-body">
//                 <h1 className="name-heading">Edit Profile</h1>

//                 <input
//                   className="edit-input"
//                   placeholder="Display Name ✨"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />

//                 <input
//                   className="edit-input"
//                   placeholder="Email 📧"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />

//                 <input
//                   type="date"
//                   className="edit-input"
//                   value={formData.dob}
//                   onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
//                 />

//                 <textarea
//                   className="edit-input"
//                   placeholder="Your Daily Affirmation 💭"
//                   value={formData.affirmation}
//                   onChange={(e) => setFormData({ ...formData, affirmation: e.target.value })}
//                 />

//                 <input
//                   className="edit-input"
//                   placeholder="Today's Intention 🎯"
//                   value={formData.intention}
//                   onChange={(e) => setFormData({ ...formData, intention: e.target.value })}
//                 />

//                 <select
//                   className="edit-input"
//                   value={formData.mood}
//                   onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
//                 >
//                   <option>Current Mood 🌸</option>
//                   <option>Calm 😌</option>
//                   <option>Motivated 🔥</option>
//                   <option>Healing 💚</option>
//                   <option>Happy ☀️</option>
//                 </select>

               
//                 <div style={{ display: "flex", gap: "10px" }}>
//                   <button className="profile-btn" onClick={handleSave}>
//                     Save
//                   </button>
//                   <button
//                     className="profile-btn"
//                     style={{ background: "#ccc", color: "#000" }}
//                     onClick={() => setShowEdit(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Profile;




// import React, { useState, useEffect } from "react";
// import { useAuth } from "./AuthContext";
// import axios from "axios";
// import "./Profile.css";
// import Navbar from "./Navbar.jsx";
// import Footer from "./Footer.jsx";

// const Profile = () => {
//   const { user, login, logout } = useAuth();

//   const [showEdit, setShowEdit] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
  

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     dob: "",
//     affirmation: "Growth is a slow process, but it is happening.",
//     mood: "Current Mood 🌸",
//     intention: "",
//     isPrivate: false,
//     reminders: false,
//   });

//   // Fixed variable name to match your JSX usage below
//   const [profileImg, setProfileImg] = useState("https://ui-avatars.com/api/?name=User&background=random");

//   // Load user data
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         dob: user.dob ? user.dob.split("T")[0] : "",
//         affirmation: user.dailyAffirmation || "Growth is a slow process, but it is happening.",
//         mood: user.currentMood || "Current Mood 🌸",
//         intention: user.todayIntention || "",
//         isPrivate: user.isPrivate || false,
//         reminders: user.reminders || false,
//       });

//       // Updated to 127.0.0.1 and fixed function call
//       setProfileImg(
//         user.profilePic
//           ? `http://127.0.0.1:5000${user.profilePic}`
//           : "https://ui-avatars.com/api/?name=User&background=random"
//       );
//     }
//   }, [user]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setProfileImg(URL.createObjectURL(file)); // Temporary preview
//     }
//   };

//   const handleSave = async () => {
//     try {
//       if (!user?._id) return alert("User not found. Please login again.");

//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("email", formData.email);
//       data.append("dob", formData.dob);
//       data.append("dailyAffirmation", formData.affirmation);
//       data.append("todayIntention", formData.intention);
//       data.append("currentMood", formData.mood);
//       data.append("isPrivate", formData.isPrivate);
//       data.append("reminders", formData.reminders);

//       if (selectedFile) data.append("profilePic", selectedFile);

//       // Updated to 127.0.0.1 for stability
//       const response = await axios.put(
//         `http://127.0.0.1:5000/api/auth/update/${user._id}`, 
//         data, 
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.data?.user) {
//         login({ token: localStorage.getItem("token"), user: response.data.user });
//         setShowEdit(false);
//         setSelectedFile(null);
//         alert("Profile updated successfully ✨");
//       }
//     } catch (err) {
//       console.error("Update error:", err.response?.data || err.message);
//       alert("Failed to update profile 💔");
//     }
//   };

//   if (!user) return <p>Loading profile...</p>;

//   return (
//     <>
//       <Navbar />

//       <div className="profile-page-wrapper">
//         <div className="profile-card">
//           <div className="profile-banner"></div>

//           <div className="avatar-container">
//             <div className="avatar-ring">
//               {/* This now uses the correctly defined profileImg */}
//               <img src={profileImg} className="user-photo" alt="Profile" />

//               <label htmlFor="img-upload" className="image-edit-badge">
//                 <span>+</span>
//               </label>

//               <input
//                 type="file"
//                 id="img-upload"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 hidden
//               />
//             </div>
//           </div>

//           <div className="profile-body">
//             <h1 className="name-heading">{user.name}</h1>
//             <p className="handle-text">@{user.email.split("@")[0]}</p>

//             <div className="bio-section">
//               <h3>Daily Affirmation</h3>
//               <p>"{formData.affirmation}"</p>
//               <h3>Today's Intention</h3>
//               <p>"{formData.intention}"</p>
//             </div>

//             <button className="profile-btn" onClick={() => setShowEdit(true)}>
//               Settings
//             </button>
//             <button className="profile-btn logout-profile-btn" onClick={logout} style={{background: "#e74c3c", color: "white", marginLeft: "10px"}}>
//               Logout
//             </button>
//           </div>
//         </div>

//         {showEdit && (
//           <div className="edit-card-wrapper">
//             <div className="profile-card">
//               <div className="profile-banner"></div>

//               <div className="profile-body">
//                 <h1 className="name-heading">Edit Profile</h1>

//                 <input
//                   className="edit-input"
//                   placeholder="Display Name ✨"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />

//                 <input
//                   className="edit-input"
//                   placeholder="Email 📧"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />

//                 <input
//                   type="date"
//                   className="edit-input"
//                   value={formData.dob}
//                   onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
//                 />

//                 <textarea
//                   className="edit-input"
//                   placeholder="Your Daily Affirmation 💭"
//                   value={formData.affirmation}
//                   onChange={(e) => setFormData({ ...formData, affirmation: e.target.value })}
//                 />

//                 <input
//                   className="edit-input"
//                   placeholder="Today's Intention 🎯"
//                   value={formData.intention}
//                   onChange={(e) => setFormData({ ...formData, intention: e.target.value })}
//                 />

//                 <select
//                   className="edit-input"
//                   value={formData.mood}
//                   onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
//                 >
//                   <option>Current Mood 🌸</option>
//                   <option>Calm 😌</option>
//                   <option>Motivated 🔥</option>
//                   <option>Healing 💚</option>
//                   <option>Happy ☀️</option>
//                 </select>

               
//                 <div style={{ display: "flex", gap: "10px" }}>
//                   <button className="profile-btn" onClick={handleSave}>
//                     Save
//                   </button>
//                   <button
//                     className="profile-btn"
//                     style={{ background: "#ccc", color: "#000" }}
//                     onClick={() => setShowEdit(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Profile;


// import React, { useState, useEffect } from "react";
// import { useAuth } from "./AuthContext";
// import axios from "axios";
// import "./Profile.css";
// import Navbar from "./Navbar.jsx";
// import Footer from "./Footer.jsx";

// // 1. Defined constant for your local images stored in public/avatars/
// const PRESET_AVATARS = [
//   "/avatars/profile1.jpg", "/avatars/profile2.jpg", "/avatars/profile3.jpg",
//   "/avatars/profile4.jpg", "/avatars/profile5.jpg", "/avatars/profile6.jpg",
//   "/avatars/profile7.jpg", "/avatars/profilen1.jpg", "/avatars/profilen2.jpg",
//   "/avatars/profilen3.jpg", "/avatars/profilen4.jpg"
// ];

// const Profile = () => {
//   const { user, login, logout } = useAuth();

//   const [showEdit, setShowEdit] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
  
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     dob: "",
//     affirmation: "Growth is a slow process, but it is happening.",
//     mood: "Current Mood 🌸",
//     intention: "",
//     isPrivate: false,
//     reminders: false,
//   });

//   const [profileImg, setProfileImg] = useState("https://ui-avatars.com/api/?name=User&background=random");

//   // Load user data
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         dob: user.dob ? user.dob.split("T")[0] : "",
//         affirmation: user.dailyAffirmation || "Growth is a slow process, but it is happening.",
//         mood: user.currentMood || "Current Mood 🌸",
//         intention: user.todayIntention || "",
//         isPrivate: user.isPrivate || false,
//         reminders: user.reminders || false,
//       });

//       // Handle profile image display logic
//       if (user.profilePic) {
//         // If it's a preset from the public folder, use it directly
//         if (user.profilePic.startsWith("/avatars")) {
//           setProfileImg(user.profilePic);
//         } else {
//           // If it's an upload from the backend uploads folder
//           setProfileImg(`http://127.0.0.1:5000${user.profilePic}`);
//         }
//       } else {
//         setProfileImg("https://ui-avatars.com/api/?name=User&background=random");
//       }
//     }
//   }, [user]);

//   // Handle choosing one of the 11 preset images
//   const handleAvatarSelect = (path) => {
//     setProfileImg(path);
//     setSelectedFile(null); // Reset file upload if a preset is picked
//   };

//   // Handle uploading a custom file from computer
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setProfileImg(URL.createObjectURL(file)); // Temporary local preview
//     }
//   };

//   const handleSave = async () => {
//     try {
//       if (!user?._id) return alert("User not found. Please login again.");

//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("email", formData.email);
//       data.append("dob", formData.dob);
//       data.append("dailyAffirmation", formData.affirmation);
//       data.append("todayIntention", formData.intention);
//       data.append("currentMood", formData.mood);
//       data.append("isPrivate", formData.isPrivate);
//       data.append("reminders", formData.reminders);

//       if (selectedFile) {
//         // Option A: Send actual file
//         data.append("profilePic", selectedFile);
//       } else {
//         // Option B: Send the path string of the preset
//         data.append("profilePicUrl", profileImg);
//       }

//       const response = await axios.put(
//         `http://127.0.0.1:5000/api/auth/update/${user._id}`, 
//         data, 
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       if (response.data?.user) {
//         login({ token: localStorage.getItem("token"), user: response.data.user });
//         setShowEdit(false);
//         setSelectedFile(null);
//         alert("Profile updated successfully ✨");
//       }
//     } catch (err) {
//       console.error("Update error:", err.response?.data || err.message);
//       alert("Failed to update profile 💔");
//     }
//   };

//   if (!user) return <p>Loading profile...</p>;

//   return (
//     <>
//       <Navbar />

//       <div className="profile-page-wrapper">
//         <div className="profile-card">
//           <div className="profile-banner"></div>

//           <div className="avatar-container">
//             <div className="avatar-ring">
//               <img src={profileImg} className="user-photo" alt="Profile" />

//               <label htmlFor="img-upload" className="image-edit-badge">
//                 <span>+</span>
//               </label>

//               <input
//                 type="file"
//                 id="img-upload"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 hidden
//               />
//             </div>
//           </div>

//           <div className="profile-body">
//             <h1 className="name-heading">{user.name}</h1>
//             <p className="handle-text">@{user.email.split("@")[0]}</p>

//             <div className="bio-section">
//               <h3>Daily Affirmation</h3>
//               <p>"{formData.affirmation}"</p>
//               <h3>Today's Intention</h3>
//               <p>"{formData.intention}"</p>
//             </div>

//             <button className="profile-btn" onClick={() => setShowEdit(true)}>
//               Settings
//             </button>
//             <button className="profile-btn logout-profile-btn" onClick={logout} style={{background: "#e74c3c", color: "white", marginLeft: "10px"}}>
//               Logout
//             </button>
//           </div>
//         </div>

//         {showEdit && (
//           <div className="edit-card-wrapper">
//             <div className="profile-card">
//               <div className="profile-body">
//                 <h1 className="name-heading">Edit Profile</h1>

//                 {/* --- NEW AVATAR SELECTION GRID --- */}
//                 <p className="selection-label">Pick a preset avatar or upload your own above:</p>
//                 <div className="avatar-selection-grid">
//                   {PRESET_AVATARS.map((path, index) => (
//                     <img 
//                       key={index}
//                       src={path}
//                       alt="avatar-option"
//                       className={`avatar-option ${profileImg === path ? "active-avatar" : ""}`}
//                       onClick={() => handleAvatarSelect(path)}
//                     />
//                   ))}
//                 </div>

//                 <input
//                   className="edit-input"
//                   placeholder="Display Name ✨"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />

//                 <input
//                   className="edit-input"
//                   placeholder="Email 📧"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />

//                 <input
//                   type="date"
//                   className="edit-input"
//                   value={formData.dob}
//                   onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
//                 />

//                 <textarea
//                   className="edit-input"
//                   placeholder="Your Daily Affirmation 💭"
//                   value={formData.affirmation}
//                   onChange={(e) => setFormData({ ...formData, affirmation: e.target.value })}
//                 />

//                 <input
//                   className="edit-input"
//                   placeholder="Today's Intention 🎯"
//                   value={formData.intention}
//                   onChange={(e) => setFormData({ ...formData, intention: e.target.value })}
//                 />

//                 <select
//                   className="edit-input"
//                   value={formData.mood}
//                   onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
//                 >
//                   <option>Current Mood 🌸</option>
//                   <option>Calm 😌</option>
//                   <option>Motivated 🔥</option>
//                   <option>Healing 💚</option>
//                   <option>Happy ☀️</option>
//                 </select>

//                 <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
//                   <button className="profile-btn" onClick={handleSave}>
//                     Save
//                   </button>
//                   <button
//                     className="profile-btn"
//                     style={{ background: "#ccc", color: "#000" }}
//                     onClick={() => setShowEdit(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Profile;

// import React, { useState, useEffect } from "react";
// import { useAuth } from "./AuthContext";
// import axios from "axios";
// import "./Profile.css";
// import Navbar from "./Navbar.jsx";
// import Footer from "./Footer.jsx";

// // 1. Array matching your exact filenames in the public folder
// const PRESET_AVATARS = [
//   "/profile1.jpg", "/profile2.jpg", "/profile3.jpg",
//   "/profile4.jpg", "/profile5.jpg", "/profile6.jpg",
//   "/profile7.jpg", "/profilen1.jpg", "/profilen2.jpg",
//   "/profilen3.jpg", "/profilen4.jpg"
// ];

// const Profile = () => {
//   const { user, login, logout } = useAuth();

//   const [showEdit, setShowEdit] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
  
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     dob: "",
//     affirmation: "Growth is a slow process, but it is happening.",
//     mood: "Current Mood 🌸",
//     intention: "",
//     isPrivate: false,
//     reminders: false,
//   });

//   const [profileImg, setProfileImg] = useState("https://ui-avatars.com/api/?name=User&background=random");

//   // Load user data and handle profile picture display
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         dob: user.dob ? user.dob.split("T")[0] : "",
//         affirmation: user.dailyAffirmation || "Growth is a slow process, but it is happening.",
//         mood: user.currentMood || "Current Mood 🌸",
//         intention: user.todayIntention || "",
//         isPrivate: user.isPrivate || false,
//         reminders: user.reminders || false,
//       });

//       if (user.profilePic) {
//         // If the path starts with /profile or /profilen, it is one of your presets in public/
//         if (user.profilePic.startsWith("/profile") || user.profilePic.startsWith("/profilen")) {
//           setProfileImg(user.profilePic);
//         } else {
//           // Otherwise it is an uploaded file from the server's /uploads/
//           setProfileImg(`http://127.0.0.1:5000${user.profilePic}`);
//         }
//       } else {
//         setProfileImg("https://ui-avatars.com/api/?name=User&background=random");
//       }
//     }
//   }, [user]);

//   const handleAvatarSelect = (path) => {
//     setProfileImg(path);
//     setSelectedFile(null); // Deselect uploaded file if preset is picked
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setProfileImg(URL.createObjectURL(file)); // Local preview
//     }
//   };

//   const handleSave = async () => {
//     try {
//       if (!user?._id) return alert("User not found.");

//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("email", formData.email);
//       data.append("dob", formData.dob);
//       data.append("dailyAffirmation", formData.affirmation);
//       data.append("todayIntention", formData.intention);
//       data.append("currentMood", formData.mood);
//       data.append("isPrivate", formData.isPrivate);
//       data.append("reminders", formData.reminders);

//       if (selectedFile) {
//         data.append("profilePic", selectedFile);
//       } else {
//         // This is the important key we added to handle presets
//         data.append("profilePicUrl", profileImg);
//       }

//       const response = await axios.put(
//         `http://127.0.0.1:5000/api/auth/update/${user._id}`, 
//         data, 
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (response.data?.user) {
//         login({ token: localStorage.getItem("token"), user: response.data.user });
//         setShowEdit(false);
//         setSelectedFile(null);
//         alert("Profile updated! ✨");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Update failed 💔");
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <>
//       <Navbar />

//       <div className="profile-page-wrapper">
//         <div className="profile-card">
//           <div className="profile-banner"></div>

//           <div className="avatar-container">
//             <div className="avatar-ring">
//               <img src={profileImg} className="user-photo" alt="Profile" />
//               <label htmlFor="img-upload" className="image-edit-badge">
//                 <span>+</span>
//               </label>
//               <input type="file" id="img-upload" accept="image/*" onChange={handleImageChange} hidden />
//             </div>
//           </div>

//           <div className="profile-body">
//             <h1 className="name-heading">{user.name}</h1>
//             <p className="handle-text">@{user.email.split("@")[0]}</p>

//             <div className="bio-section">
//               <h3>Daily Affirmation</h3>
//               <p>"{formData.affirmation}"</p>
//               <h3>Today's Intention</h3>
//               <p>"{formData.intention}"</p>
//             </div>

//             <button className="profile-btn" onClick={() => setShowEdit(true)}>Settings</button>
//             <button className="profile-btn logout-profile-btn" onClick={logout} style={{background: "#e74c3c", color: "white", marginLeft: "10px"}}>
//               Logout
//             </button>
//           </div>
//         </div>

//         {showEdit && (
//           <div className="edit-card-wrapper">
//             <div className="profile-card">
//               <div className="profile-body">
//                 <h1 className="name-heading">Edit Profile</h1>

//                 <p className="selection-label">Select a preset avatar:</p>
//                 <div className="avatar-selection-grid">
//                   {PRESET_AVATARS.map((path, index) => (
//                     <img 
//                       key={index}
//                       src={path}
//                       className={`avatar-option ${profileImg === path ? "active-avatar" : ""}`}
//                       onClick={() => handleAvatarSelect(path)}
//                       alt="avatar"
//                     />
//                   ))}
//                 </div>

//                 <input className="edit-input" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//                 <input className="edit-input" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//                 <input type="date" className="edit-input" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
//                 <textarea className="edit-input" placeholder="Affirmation" value={formData.affirmation} onChange={(e) => setFormData({ ...formData, affirmation: e.target.value })} />
//                 <input className="edit-input" placeholder="Intention" value={formData.intention} onChange={(e) => setFormData({ ...formData, intention: e.target.value })} />

//                 <select className="edit-input" value={formData.mood} onChange={(e) => setFormData({ ...formData, mood: e.target.value })}>
//                   <option>Current Mood 🌸</option>
//                   <option>Calm 😌</option>
//                   <option>Motivated 🔥</option>
//                   <option>Healing 💚</option>
//                   <option>Happy ☀️</option>
//                 </select>

//                 <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
//                   <button className="profile-btn" onClick={handleSave}>Save</button>
//                   <button className="profile-btn" style={{ background: "#ccc", color: "#000" }} onClick={() => setShowEdit(false)}>Cancel</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Profile;

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
        `http://127.0.0.1:5000/api/auth/update/${user._id}`, 
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