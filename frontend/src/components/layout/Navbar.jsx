import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Diagnostic Suite", path: "/" },
    { name: "Analytics Hub", path: "/dashboard" },
    { name: "System Intel", path: "/about" },
  ];

  return (
    <nav style={{
      background: "rgba(8, 12, 21, 0.8)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--glass-border)",
      padding: "0 40px",
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, var(--primary), #2563eb)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 20px var(--primary-glow)",
          fontSize: "1.2rem"
        }}>
          🧠
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.1rem", letterSpacing: "0.05em" }}>
            NEURO<span style={{ color: "var(--primary-hover)" }}>SCAN</span> AI
          </h2>
          <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Distortion Analysis Engine
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: isActive ? "var(--text-main)" : "var(--text-muted)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: isActive ? "600" : "500",
                letterSpacing: "0.02em",
                position: "relative",
                padding: "10px 0",
                transition: "color 0.3s ease",
                borderBottom: isActive ? "2px solid var(--primary)" : "2px solid transparent"
              }}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "var(--clean-color)",
          boxShadow: "0 0 10px var(--clean-glow)"
        }}></div>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "500" }}>SYSTEM ONLINE</span>
      </div>
    </nav>
  );
}