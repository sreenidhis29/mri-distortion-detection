import { motion } from "framer-motion";

export default function ResultCard({ label, confidence }) {
  const labelColor = label === "Clean" 
    ? "var(--clean-color)" 
    : label === "Noise" 
      ? "var(--noise-color)" 
      : "var(--blur-color)";

  const descriptions = {
    Clean: "Scan Integrity Standard Met. No debilitating motion or electromagnetic artifact thresholds breached.",
    Noise: "Detected high-frequency electromagnetic anomalies likely induced by scanner hardware fluctuation.",
    Blur: "Detected soft-tissue motion blur limits. Diagnostic fidelity reduced due to patient alignment shift."
  };

  return (
    <motion.div
      className="card"
      style={{ borderLeft: `6px solid ${labelColor}`, minHeight: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <span className="badge badge-clean" style={{ background: `${labelColor}20`, color: labelColor, borderColor: `${labelColor}40`, textShadow: `0 0 10px ${labelColor}40` }}>
          SIGNAL FIDELITY RESULT
        </span>
        <h1 style={{ color: labelColor, fontSize: "3rem", margin: "15px 0 10px", fontWeight: 800, textShadow: `0 0 25px ${labelColor}30` }}>
          {label.toUpperCase()}
        </h1>
        <p style={{ fontSize: "0.95rem", margin: 0, color: "var(--text-main)", lineHeight: 1.6 }}>
          {descriptions[label] || "Scan artifact inspection executed."}
        </p>
      </div>

      <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "15px", marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Integrity Confidence: <strong style={{ color: "var(--text-main)" }}>{(confidence * 100).toFixed(1)}%</strong>
        </span>
        <span style={{ 
          fontSize: "0.7rem", 
          padding: "4px 8px", 
          borderRadius: "4px", 
          background: label === "Clean" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
          color: label === "Clean" ? "var(--clean-color)" : "var(--noise-color)",
          fontWeight: 600,
          border: `1px solid ${label === "Clean" ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)"}`
        }}>
          {label === "Clean" ? "PASSED REVIEW" : "MANUAL OVERRIDE REQUIRED"}
        </span>
      </div>
    </motion.div>
  );
}


