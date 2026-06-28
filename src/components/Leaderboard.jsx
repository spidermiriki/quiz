import { getScores, clearScores } from "../utils/leaderboard";
import { useState } from "react";

const MEDALS = ["or", "argent", "bronze"];
const MEDAL_COLORS = ["#f59e0b", "#94a3b8", "#b45309"];

export default function Leaderboard({ onBack }) {
  const [scores, setScores] = useState(getScores);

  function handleClear() {
    if (window.confirm("Effacer tout le classement ?")) {
      clearScores();
      setScores([]);
    }
  }

  return (
    <div className="card" style={{ padding: "28px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 className="gradient-text" style={{ fontSize: "1.4rem", fontWeight: 900, margin: 0 }}>
          Classement
        </h2>
        <button onClick={onBack} className="btn-ghost btn-ghost--sm">
          Retour
        </button>
      </div>

      {scores.length === 0 ? (
        <p style={{ textAlign: "center", color: "#c4b5fd", padding: "32px 0" }}>
          Aucun score encore enregistre.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {scores.map((s, i) => (
            <div key={i} className="lb-row">
              <span
                className="lb-rank"
                style={{ color: i < 3 ? MEDAL_COLORS[i] : "#c4b5fd" }}
              >
                {i < 3 ? `#${i + 1}` : `#${i + 1}`}
              </span>
              <span className="lb-name">{s.name}</span>
              <span className="lb-mode">{s.mode === "qcm" ? "QCM" : "Ouvert"}</span>
              <span className="lb-score">{(s.points ?? 0).toLocaleString("fr-FR")} pts</span>
              <span className="lb-detail">{s.score}/{s.total}</span>
              <span className="lb-date">{s.date}</span>
            </div>
          ))}
        </div>
      )}

      {scores.length > 0 && (
        <button onClick={handleClear} className="btn-ghost btn-ghost--danger" style={{ marginTop: "20px", width: "100%" }}>
          Effacer le classement
        </button>
      )}
    </div>
  );
}
