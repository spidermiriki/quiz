export default function ScoreBoard({ score, total, onRestart }) {
  const pct = Math.round((score / total) * 100);

  function getMessage() {
    if (pct === 100) return { text: "Tu me connais parfaitement !", color: "#166534" };
    if (pct >= 70)  return { text: "Tu me connais bien !", color: "#7e22ce" };
    if (pct >= 40)  return { text: "Encore quelques efforts...", color: "#854d0e" };
    return           { text: "On va rattraper ca ensemble !", color: "#991b1b" };
  }

  const msg = getMessage();

  return (
    <div className="card" style={{ textAlign: "center", padding: "36px 24px" }}>
      <p style={{ color: "#c4b5fd", fontSize: "0.85rem", marginBottom: "10px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        Score final
      </p>

      <p
        className="gradient-text"
        style={{ fontSize: "4.5rem", fontWeight: 900, lineHeight: 1, margin: "0 0 10px" }}
      >
        {pct}%
      </p>

      <p style={{ color: "#9333ea", fontSize: "0.95rem", marginBottom: "6px", opacity: 0.7 }}>
        {score} bonne{score > 1 ? "s" : ""} reponse{score > 1 ? "s" : ""} sur {total}
      </p>

      <p style={{ color: msg.color, fontSize: "1.15rem", fontWeight: 700, marginBottom: "28px" }}>
        {msg.text}
      </p>

      {/* Barre de score */}
      <div
        style={{
          height: "10px",
          backgroundColor: "#f3e8ff",
          borderRadius: "999px",
          marginBottom: "28px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(90deg, #9333ea, #c084fc)",
            borderRadius: "999px",
            transition: "width 0.9s ease",
          }}
        />
      </div>

      <button className="btn-primary" onClick={onRestart}>
        Recommencer
      </button>
    </div>
  );
}
