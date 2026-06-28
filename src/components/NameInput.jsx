import { useState, useRef } from "react";

function resizeToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const SIZE = 64;
        const canvas = document.createElement("canvas");
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext("2d");
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2;
        const sy = (img.height - side) / 2;
        ctx.drawImage(img, sx, sy, side, side, 0, 0, SIZE, SIZE);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function NameInput({ onStart, onLeaderboard }) {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const fileRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const b64 = await resizeToBase64(file);
    setPhoto(b64);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 1) return;
    onStart({ name: trimmed, photo });
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

        {/* Photo optionnelle */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFile}
        />
        <button
          type="button"
          className="btn-ghost"
          onClick={() => fileRef.current.click()}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
        >
          {photo ? (
            <>
              <img src={photo} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
              Changer la photo
            </>
          ) : (
            "Ajouter une photo (optionnel)"
          )}
        </button>

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
