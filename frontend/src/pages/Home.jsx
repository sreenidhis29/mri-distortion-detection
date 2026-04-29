import Navbar from "../components/layout/Navbar";
import UploadBox from "../components/upload/UploadBox";
import ResultCard from "../components/results/ResultCard";
import GradCamView from "../components/results/GradCamView";
import LocalizationView from "../components/results/LocalizationView";
import ChartView from "../components/results/ChartView";
import Loader from "../components/ui/Loader";
import usePredict from "../hooks/usePredict";
import { useState } from "react";

export default function Home() {
  const { predict, loading, result, error, reset, previewUrl } = usePredict();

  const handleUpload = (file) => {
    predict(file);
  };


  return (
    <>
      <Navbar />

      <div className="container">
        
        {/* Header Title */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>MRI AI Diagnostic Suite</h1>
          <p style={{ maxWidth: "600px", margin: "0 auto", fontSize: "1.1rem" }}>
            Upload DICOM/MRI imagery below for deep-learning classification and visual artifact explainability.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="card" style={{
            borderColor: "var(--blur-color)",
            background: "rgba(239, 68, 68, 0.1)",
            color: "var(--blur-color)",
            textAlign: "center",
            marginBottom: "24px",
            fontWeight: 500
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Main Upload Suite */}
        <div style={{ maxWidth: "700px", margin: "0 auto 40px" }}>
          {result && !loading ? (
            <div className="card" style={{
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "15px 25px",
              borderColor: "var(--glass-border-hover)",
              background: "var(--card-bg-hover)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: "1.5rem" }}>📄</div>
                <div>
                  <h4 style={{ margin: 0, color: "var(--text-main)" }}>Analysis Completed</h4>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-muted)" }}>Record successfully uploaded & mapped.</p>
                </div>
              </div>
              <button onClick={() => { reset(); }} style={{

                padding: "8px 16px",
                fontSize: "0.85rem",
                background: "rgba(239, 68, 68, 0.15)",
                color: "var(--blur-color)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                boxShadow: "none"
              }}>
                🔄 Scan Another Image
              </button>
            </div>
          ) : (
            <UploadBox onUpload={handleUpload} loading={loading} />
          )}
        </div>


        {/* Loader */}
        {loading && <Loader />}

        {/* Results Suite */}
        {result && !loading && (
          <div style={{ marginTop: "40px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
              borderBottom: "1px solid var(--glass-border)",
              paddingBottom: "15px"
            }}>
              <div style={{ fontSize: "1.5rem" }}>📋</div>
              <h2 style={{ margin: 0 }}>Diagnostic Report</h2>
            </div>

            <div className="grid" style={{ alignItems: "stretch" }}>
              <ResultCard label={result.label} confidence={result.confidence} />
              <ChartView confidence={result.confidence} />
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "40px 0 20px",
              borderBottom: "1px solid var(--glass-border)",
              paddingBottom: "15px"
            }}>
              <div style={{ fontSize: "1.5rem" }}>🔍</div>
              <h2 style={{ margin: 0 }}>Explainable AI (XAI) Visualizations</h2>
            </div>

            <div className="grid">
              {previewUrl && (
                <div className="card scanner-container">
                  <div className="scanner-line"></div>
                  <h3 style={{ marginTop: 0, marginBottom: "15px", color: "var(--text-muted)" }}>Original Scan</h3>
                  <img src={previewUrl} alt="Original Scan" style={{ width: "100%", borderRadius: "12px", objectFit: "contain", maxHeight: "300px" }} />
                </div>
              )}
              <GradCamView image={result.gradcam} />
              <LocalizationView image={result.localized} />
            </div>
          </div>
        )}

      </div>
    </>
  );
}