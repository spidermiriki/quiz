import { useState, useEffect, useRef } from "react";
import DifficultyBadge from "./DifficultyBadge";
import AnswerOptions from "./AnswerOptions";
import ResultMessage from "./ResultMessage";
import OpenAnswer from "./OpenAnswer";

const QCM_TIMER = 20;

// Points QCM : max 500, min 25
function calcQcmPoints(timeLeft) {
  return Math.round(25 + 475 * (timeLeft / QCM_TIMER));
}

export default function QuizCard({ question, index, total, mode, onNext, onFinish }) {
  // ── QCM state ──
  const [selected, setSelected] = useState(null);
  const [qcmTimeLeft, setQcmTimeLeft] = useState(QCM_TIMER);
  const [qcmTimedOut, setQcmTimedOut] = useState(false);
  const qcmTimerRef = useRef(null);

  const isLast = index === total - 1;
  const qcmAnswered = selected !== null || qcmTimedOut;
  const qcmCorrect = selected?.option === question.answer;

  // QCM countdown
  useEffect(() => {
    if (mode !== "qcm") return;
    if (selected !== null || qcmTimedOut) return;
    if (qcmTimeLeft === 0) {
      setQcmTimedOut(true);
      setTimeout(() => advance(false, 0), 1800);
      return;
    }
    qcmTimerRef.current = setTimeout(() => setQcmTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(qcmTimerRef.current);
  }, [qcmTimeLeft, selected, qcmTimedOut, mode]);

  function handleQcmSelect(option) {
    clearTimeout(qcmTimerRef.current);
    const isCorrect = option === question.answer;
    const pts = isCorrect ? calcQcmPoints(qcmTimeLeft) : 0;
    setSelected({ option, pts });
  }

  function advance(wasCorrect, pts) {
    if (isLast) onFinish(wasCorrect, pts);
    else onNext(wasCorrect, pts);
  }

  // ── QCM timer bar ──
  const qcmPct = (qcmTimeLeft / QCM_TIMER) * 100;
  const qcmTimerColor = qcmTimeLeft > 10 ? "#a855f7" : qcmTimeLeft > 5 ? "#f59e0b" : "#ef4444";

  return (
    <div className="card">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <span style={{ color: "#c4b5fd", fontSize: "0.82rem", fontWeight: 600 }}>
          {index + 1} / {total}
        </span>
        <DifficultyBadge difficulty={question.difficulty} />
      </div>

      {/* Barre progression questions */}
      <div style={{ height: "5px", backgroundColor: "#f3e8ff", borderRadius: "999px", marginBottom: "6px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${((index + 1) / total) * 100}%`,
          background: "linear-gradient(90deg, #9333ea, #c084fc)",
          borderRadius: "999px",
          transition: "width 0.4s ease",
        }} />
      </div>

      {/* Question */}
      <p style={{ color: "#3b0764", fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.55, margin: "18px 0 0" }}>
        {question.question}
      </p>

      {/* ── Mode QCM ── */}
      {mode === "qcm" && (
        <>
          {/* Timer QCM */}
          {!qcmAnswered && (
            <div style={{ marginTop: "14px" }}>
              <div style={{ height: "4px", backgroundColor: "#f3e8ff", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${qcmPct}%`,
                  backgroundColor: qcmTimerColor,
                  borderRadius: "999px",
                  transition: "width 1s linear, background-color 0.5s ease",
                }} />
              </div>
              <div style={{ textAlign: "right", marginTop: "4px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: qcmTimerColor, transition: "color 0.5s" }}>
                  {qcmTimeLeft}s
                </span>
              </div>
            </div>
          )}

          <AnswerOptions
            options={question.options}
            selected={selected?.option ?? null}
            answer={question.answer}
            onSelect={(opt) => !qcmAnswered && handleQcmSelect(opt)}
          />

          {qcmAnswered && !qcmTimedOut && (
            <>
              <ResultMessage isCorrect={qcmCorrect} />
              {qcmCorrect && (
                <p style={{ textAlign: "center", color: "#7e22ce", fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px" }}>
                  +{selected?.pts} pts
                </p>
              )}
              <button
                onClick={() => advance(qcmCorrect, selected?.pts ?? 0)}
                className="btn-primary"
                style={{ marginTop: "4px" }}
              >
                {isLast ? "Voir mon score" : "Question suivante"}
              </button>
            </>
          )}

          {qcmTimedOut && (
            <div className="result-box result-box--wrong" style={{ marginTop: "16px" }}>
              <span>Temps ecoulé !</span>
              <span style={{ fontSize: "0.9rem", fontWeight: 600, opacity: 0.85 }}>
                Réponse : {question.answer}
              </span>
            </div>
          )}
        </>
      )}

      {/* ── Mode Ouvert ── */}
      {mode === "open" && (
        <div style={{ marginTop: "20px" }}>
          <OpenAnswer
            question={question}
            onCorrect={(pts) => advance(true, pts)}
            onTimeout={() => advance(false, 0)}
          />
        </div>
      )}
    </div>
  );
}
