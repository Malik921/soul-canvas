

// import React, { useState } from "react";

// function FormsDiary({
//   step,
//   setStep,
//   lockType,
//   setLockType,
//   password,
//   setPassword,
//   confirmPassword,
//   setConfirmPassword,
//   pin,
//   setPin,
//   confirmPin,
//   setConfirmPin,
// }) {
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [reason, setReason] = useState("");
//   const [frequency, setFrequency] = useState("");

//   // Validation to enable the "Finish" button
//   const canFinish =
//     lockType === "none" ||
//     (lockType === "password" &&
//       password.length >= 4 &&
//       password === confirmPassword) ||
//     (lockType === "pin" &&
//       pin.length === 4 &&
//       pin === confirmPin);

//   // FIX: This function no longer checks for age limits
//   const handleStep2Submit = (e) => {
//     e.preventDefault();
//     setStep(3); // Moves to Lock Setup
//   };

//   const handleFinalFinish = () => {
//     localStorage.setItem("diarySetupDone", "true");
//     localStorage.setItem("diaryLockType", lockType);
//     localStorage.setItem("diaryPassword", lockType === "password" ? password : pin);
//     setStep(4);
//   };

//   return (
//     <>
//       {step === 2 && (
//         <div className="form-box">
//           <h2 className="form-heading">Let’s get to know you 🌱</h2>
//           <form className="diary-form" onSubmit={handleStep2Submit}>
//             <label>
//               Age
//               <input
//                 type="number"
//                 required
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//               />
//             </label>

//             <label>
//               Gender
//               <select required value={gender} onChange={(e) => setGender(e.target.value)}>
//                 <option value="">Select</option>
//                 <option>Female</option>
//                 <option>Male</option>
//                 <option>Prefer not to say</option>
//               </select>
//             </label>

//             <label>
//               Why do you want to write a diary?
//               <select required value={reason} onChange={(e) => setReason(e.target.value)}>
//                 <option value="">Select</option>
//                 <option>To release stress</option>
//                 <option>To express emotions</option>
//                 <option>To track growth</option>
//               </select>
//             </label>

//             <label>
//               How often do you write?
//               <select required value={frequency} onChange={(e) => setFrequency(e.target.value)}>
//                 <option value="">Select</option>
//                 <option>Daily</option>
//                 <option>Weekly</option>
//                 <option>Occasionally</option>
//               </select>
//             </label>

//             <button type="submit">Continue</button>
//           </form>
//         </div>
//       )}

//       {step === 3 && (
//         <div className="form-box">
//           <h2 className="form-heading">Choose a Lock Type 🔒</h2>
//           <form className="diary-form">
//             <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
//                 <label><input type="radio" name="lock" value="password" onChange={(e) => setLockType(e.target.value)} /> Password</label>
//                 <label><input type="radio" name="lock" value="pin" onChange={(e) => setLockType(e.target.value)} /> PIN</label>
//             </div>

//             {lockType === "password" && (
//               <>
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 <input type="password" placeholder="Confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//               </>
//             )}

//             {lockType === "pin" && (
//               <>
//                 <input type="text" maxLength="4" placeholder="4-Digit PIN" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} />
//                 <input type="text" maxLength="4" placeholder="Confirm PIN" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))} />
//               </>
//             )}

//             <button type="button" disabled={!canFinish} onClick={handleFinalFinish}>
//               Finish Setup
//             </button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// }

// export default FormsDiary;

// import React, { useState } from "react";

// function FormsDiary({
//   step,
//   setStep,
//   lockType,
//   setLockType,
//   password,
//   setPassword,
//   confirmPassword,
//   setConfirmPassword,
//   pin,
//   setPin,
//   confirmPin,
//   setConfirmPin,
//   onFinalize, // 1. ADD THIS PROP
// }) {
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [reason, setReason] = useState("");
//   const [frequency, setFrequency] = useState("");
//   const [isSaving, setIsSaving] = useState(false); // Add loading state

//   const canFinish =
//     (lockType === "password" &&
//       password.length >= 4 &&
//       password === confirmPassword) ||
//     (lockType === "pin" &&
//       pin.length === 4 &&
//       pin === confirmPin);

//   const handleStep2Submit = (e) => {
//     e.preventDefault();
//     setStep(3);
//   };

//   // 2. UPDATE THIS FUNCTION TO BE ASYNC
//   const handleFinalFinish = async () => {
//     setIsSaving(true);
//     try {
//       // This calls the handleFinalizeSetup function in Diary.jsx
//       // which saves the password to the database via axios
//       await onFinalize(); 
      
//       // Locally marking it just in case, though the database is primary
//       localStorage.setItem("diarySetupDone", "true");
//     } catch (err) {
//       alert("Something went wrong saving your lock. Please try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <>
//       {step === 2 && (
//         <div className="form-box">
//           <h2 className="form-heading">Let’s get to know you 🌱</h2>
//           <form className="diary-form" onSubmit={handleStep2Submit}>
//             <label>Age
//               <input type="number" required value={age} onChange={(e) => setAge(e.target.value)} />
//             </label>

//             <label>Gender
//               <select required value={gender} onChange={(e) => setGender(e.target.value)}>
//                 <option value="">Select</option>
//                 <option>Female</option>
//                 <option>Male</option>
//                 <option>Prefer not to say</option>
//               </select>
//             </label>

//             <label>Why write a diary?
//               <select required value={reason} onChange={(e) => setReason(e.target.value)}>
//                 <option value="">Select</option>
//                 <option>To release stress</option>
//                 <option>To express emotions</option>
//                 <option>To track growth</option>
//               </select>
//             </label>

//             <label>How often do you write?
//               <select required value={frequency} onChange={(e) => setFrequency(e.target.value)}>
//                 <option value="">Select</option>
//                 <option>Daily</option>
//                 <option>Weekly</option>
//                 <option>Occasionally</option>
//               </select>
//             </label>

//             <button type="submit">Continue</button>
//           </form>
//         </div>
//       )}

//       {step === 3 && (
//         <div className="form-box">
//           <h2 className="form-heading">Choose a Lock Type 🔒</h2>
//           <form className="diary-form">
//             <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
//                 <label>
//                   <input type="radio" name="lock" value="password" checked={lockType === "password"} onChange={(e) => setLockType(e.target.value)} /> Password
//                 </label>
//                 <label>
//                   <input type="radio" name="lock" value="pin" checked={lockType === "pin"} onChange={(e) => setLockType(e.target.value)} /> PIN
//                 </label>
//             </div>

//             {lockType === "password" && (
//               <>
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 <input type="password" placeholder="Confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//               </>
//             )}

//             {lockType === "pin" && (
//               <>
//                 <input type="text" maxLength="4" placeholder="4-Digit PIN" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} />
//                 <input type="text" maxLength="4" placeholder="Confirm PIN" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))} />
//               </>
//             )}

//             <button 
//               type="button" 
//               disabled={!canFinish || isSaving} 
//               onClick={handleFinalFinish}
//               style={{ opacity: isSaving ? 0.7 : 1 }}
//             >
//               {isSaving ? "Saving..." : "Finish Setup"}
//             </button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// }

// export default FormsDiary;

import React, { useState } from "react";

// The function name should match what you use in the file
function FormsDiary({
  step,
  setStep,
  lockType,
  setLockType,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  pin,
  setPin,
  confirmPin,
  setConfirmPin,
  onFinalize, 
}) {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [reason, setReason] = useState("");
  const [frequency, setFrequency] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const canFinish =
    (lockType === "password" &&
      password.length >= 4 &&
      password === confirmPassword) ||
    (lockType === "pin" &&
      pin.length === 4 &&
      pin === confirmPin);

  // VALIDATION: This prevents any non-number character from being typed
  const handleAgeChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setAge(val);
    }
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (!age || parseInt(age) <= 0) {
      alert("Please enter a valid age! 🐣");
      return;
    }
    setStep(3);
  };

  const handleFinalFinish = async () => {
    setIsSaving(true);
    try {
      await onFinalize(); 
      localStorage.setItem("diarySetupDone", "true");
    } catch (err) {
      alert("Something went wrong saving your lock.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {step === 2 && (
        <div className="form-box">
          <h2 className="form-heading">Let’s get to know you 🌱</h2>
          <form className="diary-form" onSubmit={handleStep2Submit}>
            <label>
              Age
              <input 
                type="text" 
                inputMode="numeric"
                required 
                placeholder="Numbers only please..."
                value={age} 
                onChange={handleAgeChange} 
              />
            </label>

            <label>
              Gender
              <select required value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select</option>
                <option>Female</option>
                <option>Male</option>
                <option>Prefer not to say</option>
              </select>
            </label>

            <label>Why write a diary?</label>
            <select required value={reason} onChange={(e) => setReason(e.target.value)}>
              <option value="">Select</option>
              <option>To release stress</option>
              <option>To express emotions</option>
              <option>To track growth</option>
            </select>

            <label>How often do you write?</label>
            <select required value={frequency} onChange={(e) => setFrequency(e.target.value)}>
              <option value="">Select</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Occasionally</option>
            </select>

            <button type="submit" className="diary-btn">Continue</button>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="form-box">
          <h2 className="form-heading">Choose a Lock Type 🔒</h2>
          <form className="diary-form">
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                <label>
                  <input type="radio" name="lock" value="password" checked={lockType === "password"} onChange={(e) => setLockType(e.target.value)} /> Password
                </label>
                <label>
                  <input type="radio" name="lock" value="pin" checked={lockType === "pin"} onChange={(e) => setLockType(e.target.value)} /> PIN
                </label>
            </div>

            {lockType === "password" && (
              <>
                <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </>
            )}

            {lockType === "pin" && (
              <>
                <input type="text" maxLength="4" placeholder="4-Digit PIN" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} />
                <input type="text" maxLength="4" placeholder="Confirm PIN" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))} />
              </>
            )}

            <button 
              type="button" 
              className="diary-btn"
              disabled={!canFinish || isSaving} 
              onClick={handleFinalFinish}
            >
              {isSaving ? "Saving..." : "Finish Setup"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

// THIS LINE IS THE MOST IMPORTANT - IT FIXES YOUR ERROR
export default FormsDiary;