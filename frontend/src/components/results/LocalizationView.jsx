export default function LocalizationView({ image }) {
  return (
    <div className="card scanner-container">
      <div className="scanner-line"></div>
      <h3 style={{ marginTop: 0, marginBottom: "15px", color: "var(--text-muted)" }}>Defect Localization</h3>

      {image ? (
        <div style={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: "12px" }}>
          <img 
            src={image} 
            alt="Localized Map"
            style={{ 
              width: "100%", 
              borderRadius: "12px", 
              display: "block",
              boxShadow: "0 0 30px rgba(0,0,0,0.5)",
              maxHeight: "300px",
              objectFit: "contain"
            }} 
          />
          <div style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            background: "rgba(0,0,0,0.7)",
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "var(--noise-color)",
            border: "1px solid var(--glass-border)"
          }}>
            LOCALIZED DEFECT
          </div>
        </div>
      ) : (
        <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-muted)" }}>
          Waiting for inference data...
        </div>
      )}
    </div>
  );
}