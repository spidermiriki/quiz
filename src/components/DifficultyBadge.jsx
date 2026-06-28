const config = {
  facile:    { label: "Facile",     color: "#166534", bg: "#f0fdf4", border: "#86efac" },
  moyen:     { label: "Moyen",      color: "#854d0e", bg: "#fefce8", border: "#fde047" },
  difficile: { label: "Difficile",  color: "#991b1b", bg: "#fff1f2", border: "#fca5a5" },
  impossible:{ label: "Impossible", color: "#4c1d95", bg: "#f5f3ff", border: "#8b5cf6" },
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
