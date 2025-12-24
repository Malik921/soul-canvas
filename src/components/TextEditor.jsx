
import { useEffect, useRef, useState } from "react";
import "./TextEditor.css";

function TextEditor({ pageColor, onBack, onSave, initialContent }) {
  const editorRef = useRef(null);

  const [fontSize, setFontSize] = useState("3");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [alignment, setAlignment] = useState("left");

  // execCommand helper
  const exec = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  // ✅ LOAD EXISTING CONTENT WHEN EDITING
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent || "";
    }
  }, [initialContent]);

  return (
    <div
      className="text-editor-wrapper"
      style={{ backgroundColor: pageColor }}
    >
      {/* ================= TOOLBAR ================= */}
      <div className="toolbar">
        {/* FONT FAMILY */}
        <select
          value={fontFamily}
          onChange={(e) => {
            setFontFamily(e.target.value);
            exec("fontName", e.target.value);
          }}
        >
          <option>Arial</option>
          <option>Georgia</option>
          <option>Times New Roman</option>
          <option>Courier New</option>
          <option>Verdana</option>
        </select>

        {/* FONT SIZE */}
        <select
          value={fontSize}
          onChange={(e) => {
            setFontSize(e.target.value);
            exec("fontSize", e.target.value);
          }}
        >
          <option value="2">Small</option>
          <option value="3">Normal</option>
          <option value="4">Large</option>
          <option value="5">Extra Large</option>
        </select>

        {/* ALIGNMENT */}
        <select
          value={alignment}
          onChange={(e) => {
            const value = e.target.value;
            setAlignment(value);

            if (value === "left") exec("justifyLeft");
            if (value === "center") exec("justifyCenter");
            if (value === "right") exec("justifyRight");
            if (value === "justify") exec("justifyFull");
          }}
        >
          <option value="left">Align Left</option>
          <option value="center">Align Center</option>
          <option value="right">Align Right</option>
          <option value="justify">Justify</option>
        </select>

        {/* FONT COLOR */}
        <input
          type="color"
          title="Font Color"
          onChange={(e) => exec("foreColor", e.target.value)}
        />

        {/* HIGHLIGHT */}
        <input
          type="color"
          title="Highlight"
          onChange={(e) => exec("hiliteColor", e.target.value)}
        />

        {/* TEXT STYLES */}
        <button onClick={() => exec("bold")}><b>B</b></button>
        <button onClick={() => exec("italic")}><i>I</i></button>
        <button onClick={() => exec("underline")}><u>U</u></button>

        {/* UNDO / REDO */}
        <button onClick={() => exec("undo")}>↶</button>
        <button onClick={() => exec("redo")}>↷</button>

        {/* SAVE */}
        <button
          className="save-btn"
          onClick={() =>
            onSave({
              type: "text",
              pageColor,
              content: editorRef.current.innerHTML,
            })
          }
        >
          Save
        </button>
      </div>

      {/* ================= EDITOR ================= */}
      <div
        ref={editorRef}
        className="editor-area"
        contentEditable
        suppressContentEditableWarning
        placeholder="Start writing your thoughts..."
      />

      {/* ================= BACK ================= */}
      <div className="button-group" style={{ marginTop: "20px" }}>
        <button className="page-back" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default TextEditor;
