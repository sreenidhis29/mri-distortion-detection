import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

export default function ChartView({ confidence }) {
  const percentage = (confidence * 100).toFixed(1);
  
  const data = [
    {
      name: "Confidence",
      value: parseFloat(percentage),
      fill: percentage > 80 ? "var(--clean-color)" : percentage > 50 ? "var(--noise-color)" : "var(--blur-color)",
    },
  ];

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "300px" }}>
      <h3 style={{ marginBottom: "20px", color: "var(--text-main)" }}>Diagnostic Confidence</h3>
      
      <div style={{ position: "relative", width: "200px", height: "200px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={14}
            data={data}
            startAngle={90}
            endAngle={450}
          >
            <RadialBar
              background={{ fill: "rgba(255,255,255,0.05)" }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}>
          <span style={{
            fontSize: "2rem",
            fontWeight: "800",
            color: data[0].fill,
            textShadow: `0 0 20px ${data[0].fill}40`
          }}>
            {percentage}%
          </span>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>AI ACCURACY</div>
        </div>
      </div>
    </div>
  );
}

