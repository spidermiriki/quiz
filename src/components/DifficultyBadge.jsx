const config = {
  facile:    { label: "Facile",     color: "#166534", bg: "#f0fdf4", border: "#86efac" },
  moyen:     { label: "Moyen",      color: "#854d0e", bg: "#fefce8", border: "#fde047" },
  difficile: { label: "Difficile",  color: "#991b1b", bg: "#fff1f2", border: "#fca5a5" },
  impossible:{ label: "Impossible", color: "#0e7490", bg: "#ecfeff", border: "#67e8f9" },
};

export default function DifficultyBadge({ difficulty }) {
  const { label, color, bg, border } = config[difficulty] ?? config.moyen;
  return (
    <span
      style={{
        backgroundColor: bg,
        color,
        border: `1px solid ${border}`,
        borderRadius: "999px",
        padding: "3px 12px",
        fontSize: "0.68rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  );
}
