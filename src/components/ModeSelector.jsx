export default function ModeSelector({ name, onSelect }) {
  return (
    <div className="card" style={{ textAlign: "center", padding: "36px 24px" }}>
      <p style={{ color: "#c4b5fd", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
        Bonjour {name}
      </p>
      <h2
        className="gradient-text"
        style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "24px" }}
      >
        Choisis ton mode
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <button className="mode-btn" onClick={() => onSelect("qcm")}>
          <span className="mode-btn__icon">A B C D</span>
          <span>
            <strong>QCM</strong>
            <small>Choix multiple — clique sur la bonne réponse</small>
          </span>
        </button>

        <button className="mode-btn" onClick={() => onSelect("open")}>
          <span className="mode-btn__icon">_ _ _</span>
          <span>
            <strong>Question ouverte</strong>
            <small>Tape ta réponse — 30 secondes par question</small>
          </span>
        </button>
      </div>
    </div>
  );
}
