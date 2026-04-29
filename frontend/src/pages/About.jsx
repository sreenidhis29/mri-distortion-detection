import Navbar from "../components/layout/Navbar";

export default function About() {
  const techStack = [
    { title: "Neural Network", value: "Custom ResNet-18", desc: "Deep Residual Network for high-accuracy medical image classification.", icon: "🧬" },
    { title: "Explainable AI", value: "Grad-CAM", desc: "Gradient-weighted Class Activation Mapping for visual explanation.", icon: "🔍" },
    { title: "FastAPI Backend", value: "Python 3.x", desc: "Asynchronous high-performance API gateway.", icon: "⚡" },
    { title: "React Frontend", value: "Vite + Recharts", desc: "Responsive, interactive diagnostic telemetry dashboard.", icon: "⚛️" }
  ];

  return (
    <>
      <Navbar />
      <div className="container">
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <span className="badge badge-clean" style={{ marginBottom: "15px" }}>SYSTEM ARCHITECTURE</span>
          <h1 style={{ fontSize: "2.5rem", marginTop: "10px" }}>NEUROSCAN AI Intelligence</h1>
          <p style={{ maxWidth: "600px", margin: "10px auto 0", fontSize: "1.1rem" }}>
            Deploying deep learning protocols to interpret, classify, and visually segment magnetic resonance imaging artifacts.
          </p>
        </div>

        <div className="grid">
          {techStack.map((tech, idx) => (
            <div key={idx} className="card" style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <div style={{
                fontSize: "2rem",
                background: "rgba(255,255,255,0.03)",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid var(--glass-border)"
              }}>
                {tech.icon}
              </div>
              <div>
                <h3 style={{ margin: "0 0 5px", color: "var(--primary-hover)" }}>{tech.title}</h3>
                <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "8px", color: "var(--text-main)" }}>{tech.value}</div>
                <p style={{ margin: 0, fontSize: "0.85rem" }}>{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: "40px", position: "relative", overflow: "hidden" }}>
          <div className="scanner-line"></div>
          <h3 style={{ marginTop: 0 }}>Diagnostic Capabilities</h3>
          <p>The inference engine is trained to recognize various categories of artifacts in MRI sequences:</p>
          
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
            <div style={{ flex: "1 1 250px", background: "rgba(0,0,0,0.2)", padding: "20px", borderRadius: "12px", borderLeft: "4px solid var(--clean-color)" }}>
              <h4 style={{ color: "var(--clean-color)", margin: "0 0 10px" }}>CLEAN</h4>
              <p style={{ margin: 0, fontSize: "0.85rem" }}>Pristine high-fidelity scan ready for physician interpretation.</p>
            </div>
            <div style={{ flex: "1 1 250px", background: "rgba(0,0,0,0.2)", padding: "20px", borderRadius: "12px", borderLeft: "4px solid var(--noise-color)" }}>
              <h4 style={{ color: "var(--noise-color)", margin: "0 0 10px" }}>NOISE</h4>
              <p style={{ margin: 0, fontSize: "0.85rem" }}>High-frequency electromagnetic interference degrading contrast.</p>
            </div>
            <div style={{ flex: "1 1 250px", background: "rgba(0,0,0,0.2)", padding: "20px", borderRadius: "12px", borderLeft: "4px solid var(--blur-color)" }}>
              <h4 style={{ color: "var(--blur-color)", margin: "0 0 10px" }}>BLUR</h4>
              <p style={{ margin: 0, fontSize: "0.85rem" }}>Motion artifacts resulting in severe edge degradation.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}