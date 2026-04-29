/**
 * Simulates MRI analysis when the backend is unavailable.
 * Creates realistic base64 medical imagery previews.
 */
export function simulatePrediction(file) {
  return new Promise((resolve) => {
    // Simulate network latency
    setTimeout(() => {
      const labels = ["Clean", "Noise", "Blur"];
      const randomLabel = labels[Math.floor(Math.random() * labels.length)];
      const confidence = Math.random() * 0.3 + 0.7; // 70% to 100%
      
      // Create Canvas for Grad-CAM simulation
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      
      // Draw dark brain background
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, 256, 256);
      
      // Draw simulated brain scan
      ctx.beginPath();
      ctx.ellipse(128, 128, 80, 100, 0, 0, 2 * Math.PI);
      ctx.fillStyle = "#1e293b";
      ctx.fill();
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw internal brain details (gyri)
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 2;
      for(let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(128, 80 + i * 24, 40 - i * 5, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // For Grad-CAM: draw glowing heatmap
      if (randomLabel !== "Clean") {
        const grad = ctx.createRadialGradient(128, 128, 5, 128, 128, 60);
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.8)');  // Red
        grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.5)'); // Orange
        grad.addColorStop(1, 'rgba(14, 165, 233, 0)');    // Cyan transparent
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(128, 128, 60, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      const gradcamUrl = canvas.toDataURL();
      
      // For Localization: draw bounding box
      ctx.clearRect(0, 0, 256, 256);
      // Redraw brain
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, 256, 256);
      ctx.beginPath();
      ctx.ellipse(128, 128, 80, 100, 0, 0, 2 * Math.PI);
      ctx.fillStyle = "#1e293b";
      ctx.fill();
      
      if (randomLabel !== "Clean") {
        // Draw localization box
        ctx.strokeStyle = randomLabel === "Noise" ? "#f59e0b" : "#ef4444";
        ctx.lineWidth = 3;
        ctx.strokeRect(88, 98, 80, 60);
        
        // Add text
        ctx.fillStyle = randomLabel === "Noise" ? "#f59e0b" : "#ef4444";
        ctx.font = "bold 10px sans-serif";
        ctx.fillText(`DETECTED ${randomLabel.toUpperCase()}`, 92, 112);
      }
      
      const localizedUrl = canvas.toDataURL();

      resolve({
        label: randomLabel,
        confidence: confidence,
        gradcam: gradcamUrl,
        localized: localizedUrl
      });
    }, 2000); // 2-second artificial delay for realism
  });
}
