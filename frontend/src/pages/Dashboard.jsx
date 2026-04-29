import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [sysStatus, setSysStatus] = useState("Checking...");

  useEffect(() => {
    const stored = localStorage.getItem("mri_scan_history");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Filter out old dummy values
      const cleanHistory = parsed.filter(h => !["SCAN-9081", "SCAN-9075", "SCAN-9042", "SCAN-9029", "SCAN-8999"].includes(h.id));
      setHistory(cleanHistory);
      localStorage.setItem("mri_scan_history", JSON.stringify(cleanHistory));
    } else {
      setHistory([]);
    }


    // Check backend health
    fetch("http://127.0.0.1:8000/health")
      .then(res => res.json())
      .then(data => setSysStatus(data.status === "OK" ? "ONLINE" : "OFFLINE"))
      .catch(() => setSysStatus("OFFLINE"));
  }, []);


  // Metrics calculation
  const totalScans = history.length;
  const cleanScans = history.filter(h => h.label === "Clean").length;
  const distortedScans = totalScans - cleanScans;
  const avgConfidence = totalScans > 0
    ? (history.reduce((sum, h) => sum + h.confidence, 0) / totalScans * 100).toFixed(1)
    : 0;

  // Pie Chart Data
  const labelCounts = history.reduce((acc, item) => {
    acc[item.label] = (acc[item.label] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(labelCounts).map(key => ({
    name: key,
    value: labelCounts[key]
  }));

  const COLORS = {
    Clean: "var(--clean-color)",
    Noise: "var(--noise-color)",
    Blur: "var(--blur-color)"
  };

  // Area Chart Data (Confidence over time)
  const areaData = [...history].reverse().map((item, idx) => ({
    name: `Scan ${idx + 1}`,
    confidence: parseFloat((item.confidence * 100).toFixed(1))
  }));

  return (
    <>
      <Navbar />
      <div className="container">
        
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "2.2rem" }}>Analytics Hub</h1>
            <p style={{ margin: "5px 0 0" }}>Real-time neural diagnostic statistics and system state.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {history.length > 0 && (
              <button 
                onClick={() => {
                  localStorage.removeItem("mri_scan_history");
                  setHistory([]);
                }} 
                style={{
                  padding: "10px 16px",
                  fontSize: "0.8rem",
                  background: "rgba(239, 68, 68, 0.1)",
                  color: "var(--blur-color)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  cursor: "pointer",
                  boxShadow: "none"
                }}
              >
                🗑️ Purge Records
              </button>
            )}
            <div className="card" style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: sysStatus === "ONLINE" ? "var(--clean-color)" : "var(--blur-color)",
                boxShadow: sysStatus === "ONLINE" ? "0 0 15px var(--clean-glow)" : "0 0 15px var(--blur-glow)"
              }}></div>
              <span style={{ fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.05em" }}>
                BACKEND: {sysStatus}
              </span>
            </div>
          </div>
        </div>


        {/* Metrics Grid */}
        <div className="grid-3" style={{ marginBottom: "30px" }}>
          <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em" }}>TOTAL ANALYZED</span>
            <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--primary-hover)", marginTop: "10px" }}>{totalScans}</span>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "10px" }}>Cumulative medical scans processed</div>
          </div>

          <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em" }}>AVG CONFIDENCE</span>
            <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--clean-color)", marginTop: "10px" }}>{avgConfidence}%</span>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "10px" }}>Overall neural model assurance rate</div>
          </div>

          <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em" }}>PATHOLOGY RATIO</span>
            <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--noise-color)", marginTop: "10px" }}>
              {distortedScans} / <span style={{ fontSize: "1.5rem", color: "var(--text-muted)" }}>{totalScans}</span>
            </span>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "10px" }}>Scans flagged with noise or blur anomalies</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid" style={{ marginBottom: "30px" }}>
          
          {/* Area Chart */}
          <div className="card" style={{ minHeight: "350px", display: "flex", flexDirection: "column" }}>
            <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Model Inference Trends</h3>
            {totalScans > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={10} />
                  <YAxis stroke="var(--text-muted)" domain={[0, 100]} fontSize={10} />
                  <Tooltip
                    contentStyle={{ background: "rgba(15, 23, 42, 0.9)", border: "1px solid var(--glass-border)", borderRadius: "8px" }}
                    labelStyle={{ color: "var(--text-main)" }}
                  />
                  <Area type="monotone" dataKey="confidence" stroke="var(--primary)" fillOpacity={1} fill="url(#colorConf)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Scan metrics will appear here once data is evaluated.
              </div>
            )}
          </div>

          {/* Pie Chart */}
          <div className="card" style={{ minHeight: "350px", display: "flex", flexDirection: "column" }}>
            <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Classification Breakdown</h3>
            {totalScans > 0 ? (
              <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name] || "var(--primary)"} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "rgba(15, 23, 42, 0.9)", border: "1px solid var(--glass-border)", borderRadius: "8px" }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Classification distribution awaiting scan inputs.
              </div>
            )}
          </div>

        </div>

        {/* Prediction History */}
        <div className="card" style={{ overflowX: "auto" }}>
          <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Patient Diagnostic Registry</h3>
          {totalScans > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--glass-border)", textAlign: "left" }}>
                  <th style={{ padding: "15px 10px", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600 }}>SCAN ID</th>
                  <th style={{ padding: "15px 10px", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600 }}>TIMESTAMP</th>
                  <th style={{ padding: "15px 10px", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600 }}>FILE NAME</th>
                  <th style={{ padding: "15px 10px", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600 }}>DETECTION</th>
                  <th style={{ padding: "15px 10px", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600 }}>CONFIDENCE</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.2s" }}>
                    <td style={{ padding: "15px 10px", fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--primary-hover)" }}>{item.id}</td>
                    <td style={{ padding: "15px 10px", fontSize: "0.85rem" }}>{new Date(item.timestamp).toLocaleString()}</td>
                    <td style={{ padding: "15px 10px", fontSize: "0.85rem", color: "var(--text-main)" }}>{item.fileName}</td>
                    <td style={{ padding: "15px 10px" }}>
                      <span className={`badge badge-${item.label.toLowerCase()}`}>
                        {item.label}
                      </span>
                    </td>
                    <td style={{ padding: "15px 10px", fontWeight: 600 }}>
                      {(item.confidence * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
              📁 Database empty. Upload an asset in the Diagnostic Suite to populate telemetry charts.
            </div>
          )}
        </div>

      </div>
    </>
  );
}
