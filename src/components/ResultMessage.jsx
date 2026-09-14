import { useEffect, useState } from "react";

export default function ResultMessage({ isCorrect }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [isCorrect]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.85)",
        transition: "all 0.3s ease",
        textAlign: "center",
        padding: "14px 16px",
        borderRadius: "14px",
        backgroundColor: isCorrect ? "#f0fdf4" : "#fff1f2",
        border: `1.5px solid ${isCorrect ? "#86efac" : "#fca5a5"}`,
        margin: "16px 0",
      }}
    >
      {isCorrect ? (
        <p style={{ color: "#166534", fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>
          Bravo ma controleuse !
        </p>
      ) : (
        <p style={{ color: "#991b1b", fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>
          A 2 doigts...
        </p>
      )}
    </div>
  );
}
