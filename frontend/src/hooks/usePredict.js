import { useState } from "react";
import { predictImage } from "../services/api";

export default function usePredict() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const predict = async (file) => {
    setLoading(true);
    try {
      const data = await predictImage(file);
      console.log("API RESULT:", data);   // 🔥 IMPORTANT
      setResult(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return { predict, loading, result };
}