import { useState } from "react";

export default function UploadBox({ onUpload, loading }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      onUpload(file);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      onUpload(file);
    }
  };

  return (
    <div 
      className="card scanner-container" 
      style={{
        padding: "40px",
        border: isDragActive ? "2px dashed var(--primary-hover)" : "2px dashed var(--glass-border)",
        background: isDragActive ? "var(--card-bg-hover)" : "var(--card-bg)",
        textAlign: "center",
        cursor: "pointer",
        position: "relative"
      }}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      {loading && <div className="scanner-line"></div>}
      
      <input
        type="file"
        id="mri-upload"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      
      <label htmlFor="mri-upload" style={{ cursor: "pointer", display: "block" }}>
        <div style={{ fontSize: "3rem", marginBottom: "15px" }}>
          {loading ? "🤖" : "💿"}
        </div>
        <h3 style={{ marginTop: 0, color: "var(--text-main)" }}>
          {loading ? "AI Inference Engine Processing..." : "Drop MRI Scan or Click to Browse"}
        </h3>
        <p style={{ fontSize: "0.9rem", margin: "8px 0 0", color: "var(--text-muted)" }}>
          Supports PNG, JPG, DICOM-derived images.
        </p>
        {fileName && (
          <div style={{
            marginTop: "15px",
            padding: "8px 16px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "8px",
            fontSize: "0.85rem",
            color: "var(--primary-hover)",
            display: "inline-block"
          }}>
            Selected: {fileName}
          </div>
        )}
      </label>
    </div>
  );
}