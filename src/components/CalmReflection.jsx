
import { useState } from "react";
import "./CalmReflection.css";

const prompts = [
  { title: "🪶 Today I feel…" },
  { title: "🌱 What’s on my mind" },
  { title: "☁️ One thing I want to let go of" },
  { title: "🌸 A kind thought for myself" },
];

// Added onSave to your props here
function CalmReflection({ onClose, onSave }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleChange = (e) => {
    setAnswers({ ...answers, [step]: e.target.value });
  };

  const handleFinalSave = () => {
    // Preserving your logic: Converting your 'answers' state into a readable string
    const formattedContent = prompts
      .map((p, index) => `<b>${p.title}</b><br/>${answers[index] || "No reflection entered."}`)
      .join("<br/><br/>");

    // Calling the onSave you requested
    onSave({
      type: "journal",
      content: formattedContent,
      pageColor: "#F3E5F5", // Soft purple for calm
    });
  };

  return (
    <div className="calm-wrapper">
      <div className="calm-card">
        <h2 className="calm-title">{prompts[step].title}</h2>

        <textarea
          placeholder="Type gently here…"
          value={answers[step] || ""}
          onChange={handleChange}
        />

        <div className="calm-actions">
          <button className="secondary" onClick={onClose}>
            Close
          </button>

          {/* Logic to move through your steps */}
          {step > 0 && (
            <button className="secondary" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}

          {step < prompts.length - 1 ? (
            <button className="primary" onClick={() => setStep(step + 1)}>
              Next
            </button>
          ) : (
            <button className="primary" onClick={handleFinalSave}>
              Save Memory
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalmReflection;