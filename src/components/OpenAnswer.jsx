import { useState, useEffect, useRef } from "react";
import { isAnswerValid } from "../utils/normalize";

const TIMER = 30;

export default function OpenAnswer({ question, onCorrect, onTimeout }) {
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIMER);
  const [status, setStatus] = useState("idle"); // idle | wrong | correct | timeout
  const [shake, setShake] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
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

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (status === "correct" || status === "timeout") return;
    const trimmed = input.trim();
    if (!trimmed) return;

    if (isAnswerValid(trimmed, question.openAnswers)) {
      clearTimeout(timerRef.current);
      setStatus("correct");
      setTimeout(() => onCorrect(), 900);
    } else {
      setWrongCount((c) => c + 1);
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
      <div style={{ height: "5px", backgroundColor: "#f3e8ff", borderRadius: "999px", marginBottom: "20px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            backgroundColor: timerColor,
            borderRadius: "999px",
            transition: "width 1s linear, background-color 0.5s ease",
          }}
        />
      </div>

      {/* Timer count */}
      <div style={{ textAlign: "right", marginBottom: "18px" }}>
        <span style={{
          fontSize: "0.8rem",
          fontWeight: 700,
          color: timerColor,
          transition: "color 0.5s ease",
        }}>
          {timeLeft}s
        </span>
      </div>

      {/* Wrong attempts */}
      {wrongCount > 0 && status !== "correct" && status !== "timeout" && (
        <p style={{ color: "#f87171", fontSize: "0.8rem", textAlign: "center", marginBottom: "10px" }}>
          {wrongCount} tentative{wrongCount > 1 ? "s" : ""} incorrecte{wrongCount > 1 ? "s" : ""}
        </p>
      )}

      {/* Input form */}
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
