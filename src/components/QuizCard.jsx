import { useState } from "react";
import DifficultyBadge from "./DifficultyBadge";
import AnswerOptions from "./AnswerOptions";
import ResultMessage from "./ResultMessage";

export default function QuizCard({ question, index, total, onNext, onFinish }) {
  const [selected, setSelected] = useState(null);
  const isCorrect = selected === question.answer;
  const answered = selected !== null;
  const isLast = index === total - 1;

  function handleSelect(option) {
    setSelected(option);
  }

  function handleNext() {
    setSelected(null);
    if (isLast) {
      onFinish(isCorrect);
    } else {
      onNext(isCorrect);
    }
  }

  return (
    <div className="card">
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <span style={{ color: "#c4b5fd", fontSize: "0.82rem", fontWeight: 600 }}>
          {index + 1} / {total}
        </span>
        <DifficultyBadge difficulty={question.difficulty} />
      </div>

      {/* Barre de progression */}
      <div
        style={{
          height: "5px",
          backgroundColor: "#f3e8ff",
          borderRadius: "999px",
          marginBottom: "22px",
          overflow: "hidden",
        }}
      >
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
      <p
        style={{
          color: "#3b0764",
          fontSize: "1.05rem",
          fontWeight: 700,
          lineHeight: 1.55,
          margin: 0,
        }}
      >
        {question.question}
      </p>

      {/* Reponses */}
      <AnswerOptions
        options={question.options}
        selected={selected}
        answer={question.answer}
        onSelect={handleSelect}
      />

      {/* Resultat + bouton suivant */}
      {answered && (
        <>
          <ResultMessage isCorrect={isCorrect} />
          <button
            onClick={handleNext}
            className="btn-primary"
            style={{ marginTop: "4px" }}
          >
            {isLast ? "Voir mon score" : "Question suivante"}
          </button>
        </>
      )}
    </div>
  );
}
