import React, { useState } from "react";

function DiaryUnlock({ onUnlock }) {
  const [input, setInput] = useState("");
  const savedLockValue = localStorage.getItem("diaryPassword");

  const handleUnlock = (e) => {
    e.preventDefault();
    if (input === savedLockValue) {
      onUnlock();
    } else {
      alert("Incorrect Password! ❌");
    }
  };

  return (
    <div className="form-box page-center">
      <h2 className="form-heading">Diary is Locked 🔒</h2>
      <form onSubmit={handleUnlock} className="diary-form">
        <input 
          type="password" 
          placeholder="Enter Password" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Unlock Diary</button>
      </form>
    </div>
  );
}
export default DiaryUnlock;