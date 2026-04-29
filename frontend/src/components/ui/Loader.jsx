export default function Loader() {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: "40px",
      margin: "20px auto",
      maxWidth: "400px",
      background: "rgba(15, 23, 42, 0.4)",
      borderRadius: "16px",
      border: "1px solid var(--glass-border)",
      backdropFilter: "blur(12px)"
    }}>
      <div style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        border: "3px solid rgba(56, 189, 248, 0.1)",
        borderTop: "3px solid var(--primary)",
        animation: "spin 1s linear infinite",
        boxShadow: "0 0 20px var(--primary-glow)"
      }}></div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <h3 style={{ margin: "20px 0 8px", color: "var(--text-main)" }}>Neural Processing...</h3>
      <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "center" }}>
        Running multi-layer residual network inference protocol & computing Grad-CAM gradients.
      </p>
    </div>
  );
}