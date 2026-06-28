import { getScores } from "../utils/leaderboard";
import { useState, useEffect } from "react";

const MEDAL_COLORS = ["#f59e0b", "#94a3b8", "#b45309"];

function Avatar({ photo, name }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
      />
    );
  }
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
      background: "linear-gradient(135deg, #e9d5ff, #c084fc)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 800, fontSize: "0.85rem", color: "#7e22ce",
    }}>
      {name[0].toUpperCase()}
    </div>
  );
}

export default function Leaderboard({ onBack }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScores()
      .then((s) => setScores(s))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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

      {loading ? (
        <p style={{ textAlign: "center", color: "#c4b5fd", padding: "32px 0" }}>
          Chargement...
        </p>
      ) : scores.length === 0 ? (
        <p style={{ textAlign: "center", color: "#c4b5fd", padding: "32px 0" }}>
          Aucun score encore enregistre.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {scores.map((s, i) => (
            <div key={s.id} className="lb-row">
              <span className="lb-rank" style={{ color: i < 3 ? MEDAL_COLORS[i] : "#c4b5fd" }}>
                #{i + 1}
              </span>
              <Avatar photo={s.photo} name={s.name} />
              <span className="lb-name">{s.name}</span>
              <span className="lb-mode">{s.mode === "qcm" ? "Q" : "O"}</span>
              <span className="lb-score">{(s.points ?? 0).toLocaleString("fr-FR")} pts</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
