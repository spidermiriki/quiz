import { useState } from "react";
import { questions } from "./data/questions";
import QuizCard from "./components/QuizCard";
import ScoreBoard from "./components/ScoreBoard";
import FlowerBg from "./components/FlowerBg";
import "./App.css";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function handleStart() {
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
  }

  function handleNext(wasCorrect) {
    if (wasCorrect) setScore((s) => s + 1);
    setCurrentIndex((i) => i + 1);
  }

  function handleFinish(wasCorrect) {
    setScore(wasCorrect ? score + 1 : score);
    setFinished(true);
    setCurrentIndex(null);
  }

  function handleRestart() {
    setCurrentIndex(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <>
      <FlowerBg />
      <div className="app-wrapper">
        <div className="app-container">
          {/* Accueil */}
          {currentIndex === null && !finished && (
            <div className="card" style={{ textAlign: "center", padding: "40px 24px" }}>
              <p style={{ fontSize: "2rem", marginBottom: "6px", color: "#c084fc", fontWeight: 900, letterSpacing: "-0.5px" }}>
                *
              </p>
              <h1
                className="gradient-text"
                style={{ fontSize: "1.9rem", fontWeight: 900, marginBottom: "10px" }}
              >
                Tu me connais ?
              </h1>
              <p className="home-subtitle">
                {questions.length} questions — A quel point mde connais tu Solane ? ?
              </p>
              <button className="btn-primary" onClick={handleStart}>
                C&apos;est parti !
              </button>
            </div>
          )}

          {/* Quiz en cours */}
          {currentIndex !== null && !finished && (
            <QuizCard
              question={questions[currentIndex]}
              index={currentIndex}
              total={questions.length}
              onNext={handleNext}
              onFinish={handleFinish}
            />
          )}

          {/* Score final */}
          {finished && (
            <ScoreBoard score={score} total={questions.length} onRestart={handleRestart} />
          )}
        </div>
      </div>
    </>
  );
}
