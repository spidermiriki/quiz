import { useState } from "react";

export default function NameInput({ onStart, onLeaderboard }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 1) return;
    onStart(trimmed);
  }

  return (
    <div className="card" style={{ textAlign: "center", padding: "40px 24px" }}>
      <img
        src={`${import.meta.env.BASE_URL}cut_head.png`}
        alt=""
        className="photo-home"
      />
      <h1
        className="gradient-text"
        style={{ fontSize: "1.9rem", fontWeight: 900, marginBottom: "8px" }}
      >
        Tu me connais ?
      </h1>
      <p className="home-subtitle">Entre ton prénom pour commencer</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ton prénom..."
          maxLength={20}
          autoFocus
          className="name-input"
        />
        <button type="submit" className="btn-primary" disabled={name.trim().length < 1}>
          Continuer
        </button>
      </form>

      <button
        onClick={onLeaderboard}
        className="btn-ghost"
        style={{ marginTop: "14px" }}
      >
        Voir le classement
      </button>
    </div>
  );
}
