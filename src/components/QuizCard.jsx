import { useState } from "react";
import DifficultyBadge from "./DifficultyBadge";
import AnswerOptions from "./AnswerOptions";
import ResultMessage from "./ResultMessage";
import OpenAnswer from "./OpenAnswer";

export default function QuizCard({ question, index, total, mode, onNext, onFinish }) {
  const [selected, setSelected] = useState(null);   // QCM only
  const [openDone, setOpenDone] = useState(null);   // "correct" | "timeout"
  const isLast = index === total - 1;

  // ── QCM ──
  const qcmAnswered = selected !== null;
  const qcmCorrect = selected === question.answer;

  function handleQcmSelect(option) {
    setSelected(option);
  }

  function handleNext(wasCorrect) {
    setSelected(null);
    setOpenDone(null);
    if (isLast) onFinish(wasCorrect);
    else onNext(wasCorrect);
  }

  // ── Open ──
  function handleOpenCorrect() {
    setOpenDone("correct");
    if (isLast) onFinish(true);
    else onNext(true);
  }

  function handleOpenTimeout() {
    setOpenDone("timeout");
    // auto-advance after brief pause (already done inside OpenAnswer)
    if (isLast) onFinish(false);
    else onNext(false);
  }

  return (
    <div className="card">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ color: "#c4b5fd", fontSize: "0.82rem", fontWeight: 600 }}>
          {index + 1} / {total}
        </span>
        <DifficultyBadge difficulty={question.difficulty} />
      </div>

      {/* Progress bar (questions) */}
      <div style={{ height: "5px", backgroundColor: "#f3e8ff", borderRadius: "999px", marginBottom: "22px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${((index + 1) / total) * 100}%`,
            background: "linear-gradient(90deg, #9333ea, #c084fc)",
            borderRadius: "999px",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Question */}
      <p style={{ color: "#3b0764", fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.55, margin: 0 }}>
        {question.question}
      </p>

      {/* ── Mode QCM ── */}
      {mode === "qcm" && (
        <>
          <AnswerOptions
            options={question.options}
            selected={selected}
            answer={question.answer}
            onSelect={handleQcmSelect}
          />
          {qcmAnswered && (
            <>
              <ResultMessage isCorrect={qcmCorrect} />
              <button onClick={() => handleNext(qcmCorrect)} className="btn-primary" style={{ marginTop: "4px" }}>
                {isLast ? "Voir mon score" : "Question suivante"}
              </button>
            </>
          )}
        </>
      )}

      {/* ── Mode Ouvert ── */}
      {mode === "open" && (
        <div style={{ marginTop: "20px" }}>
          <OpenAnswer
            question={question}
            onCorrect={handleOpenCorrect}
            onTimeout={handleOpenTimeout}
          />
        </div>
      )}
    </div>
  );
}
