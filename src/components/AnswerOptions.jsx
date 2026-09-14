export default function AnswerOptions({ options, selected, answer, onSelect }) {
  const answered = selected !== null;

  function getStyle(option) {
    const base = {
      width: "100%",
      padding: "13px 18px",
      borderRadius: "12px",
      border: "1.5px solid",
      fontSize: "0.95rem",
      fontWeight: 600,
      cursor: answered ? "default" : "pointer",
      transition: "all 0.2s ease",
      textAlign: "left",
      marginBottom: "10px",
    };

    if (!answered) {
      return {
        ...base,
        backgroundColor: "#faf5ff",
        borderColor: "#e9d5ff",
        color: "#4c1d95",
      };
    }

    if (option === answer) {
      return {
        ...base,
        backgroundColor: "#f0fdf4",
        borderColor: "#86efac",
        color: "#166534",
      };
    }
    if (option === selected) {
      return {
        ...base,
        backgroundColor: "#fff1f2",
        borderColor: "#fca5a5",
        color: "#991b1b",
      };
    }
    return {
      ...base,
      backgroundColor: "#fdf8ff",
      borderColor: "#f3e8ff",
      color: "#c4b5fd",
    };
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
      {options.map((option) => (
        <button
          key={option}
          style={getStyle(option)}
          onClick={() => !answered && onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
