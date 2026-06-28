import { useState, useEffect, useRef } from "react";
import { isAnswerValid } from "../utils/normalize";

const TIMER = 30;

// Points: max 1000, min 50 si répondu correctement
function calcPoints(timeLeft) {
  return Math.round(50 + 950 * (timeLeft / TIMER));
}

export default function OpenAnswer({ question, onCorrect, onTimeout }) {
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIMER);
  const [status, setStatus] = useState("idle"); // idle | wrong | correct | timeout
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState([]); // historique des mauvaises tentatives
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Countdown
  useEffect(() => {
    if (status === "correct" || status === "timeout") return;
    if (timeLeft === 0) {
      setStatus("timeout");
      setTimeout(() => onTimeout(), 1800);
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, status]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (status === "correct" || status === "timeout") return;
    const trimmed = input.trim();
    if (!trimmed) return;

    if (isAnswerValid(trimmed, question.openAnswers)) {
      clearTimeout(timerRef.current);
      setStatus("correct");
      setTimeout(() => onCorrect(calcPoints(timeLeft)), 900);
    } else {
      setAttempts((prev) => [...prev, trimmed]);
      setStatus("wrong");
      setShake(true);
      setInput("");
      setTimeout(() => {
        setShake(false);
        setStatus("idle");
        inputRef.current?.focus();
      }, 600);
    }
  }

  const pct = (timeLeft / TIMER) * 100;
  const timerColor = timeLeft > 15 ? "#a855f7" : timeLeft > 7 ? "#f59e0b" : "#ef4444";

  return (
    <div>
      {/* Timer bar */}
      <div style={{ height: "5px", backgroundColor: "#f3e8ff", borderRadius: "999px", marginBottom: "8px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          backgroundColor: timerColor,
          borderRadius: "999px",
          transition: "width 1s linear, background-color 0.5s ease",
        }} />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "14px" }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: timerColor, transition: "color 0.5s ease" }}>
          {timeLeft}s
        </span>
      </div>

      {/* Historique des tentatives */}
      {attempts.length > 0 && status !== "correct" && status !== "timeout" && (
        <div style={{ marginBottom: "12px" }}>
          <p style={{ fontSize: "0.72rem", color: "#c4b5fd", marginBottom: "6px", fontWeight: 600 }}>
            Tes tentatives :
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {attempts.map((a, i) => (
              <span key={i} className="attempt-chip">{a}</span>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      {status !== "correct" && status !== "timeout" && (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ta réponse..."
            className={`open-input${shake ? " shake" : ""}`}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          <button type="submit" className="btn-send" disabled={!input.trim()}>
            OK
          </button>
        </form>
      )}

      {/* Correct */}
      {status === "correct" && (
        <div className="result-box result-box--correct">
          Bravo ma controleuse !
        </div>
      )}

      {/* Timeout */}
      {status === "timeout" && (
        <div className="result-box result-box--wrong">
          <span>Temps ecoulé !</span>
          <span style={{ fontSize: "0.9rem", fontWeight: 600, opacity: 0.85 }}>
            Réponse : {question.answer}
          </span>
        </div>
      )}
    </div>
  );
}
