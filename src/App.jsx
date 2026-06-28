import { useState } from "react";
import { questions } from "./data/questions";
import QuizCard from "./components/QuizCard";
import ScoreBoard from "./components/ScoreBoard";
import FlowerBg from "./components/FlowerBg";
import NameInput from "./components/NameInput";
import ModeSelector from "./components/ModeSelector";
import Leaderboard from "./components/Leaderboard";
import "./App.css";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck() {
  return shuffle(questions).map((q) => ({
    ...q,
    options: shuffle(q.options),
  }));
}

// phases: "name" | "mode" | "quiz" | "score" | "leaderboard"

export default function App() {
  const [phase, setPhase] = useState("name");
  const [playerName, setPlayerName] = useState("");
  const [mode, setMode] = useState(null);          // "qcm" | "open"
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  function handleName(name) {
    setPlayerName(name);
    setPhase("mode");
  }

  function handleMode(m) {
    setMode(m);
    setDeck(buildDeck());
    setCurrentIndex(0);
    setScore(0);
    setPhase("quiz");
  }

  function handleNext(wasCorrect) {
    if (wasCorrect) setScore((s) => s + 1);
    setCurrentIndex((i) => i + 1);
  }

  function handleFinish(wasCorrect) {
    setScore(wasCorrect ? score + 1 : score);
    setPhase("score");
  }

  function handleRestart() {
    setPhase("mode");
    setCurrentIndex(0);
    setScore(0);
    setMode(null);
  }

  return (
    <>
      <FlowerBg />
      <div className="app-wrapper">
        <div className="app-container">

          {phase === "name" && (
            <NameInput
              onStart={handleName}
              onLeaderboard={() => setPhase("leaderboard")}
            />
          )}

          {phase === "mode" && (
            <ModeSelector name={playerName} onSelect={handleMode} />
          )}

          {phase === "quiz" && (
            <QuizCard
              key={currentIndex}
              question={questions[currentIndex]}
              index={currentIndex}
              total={questions.length}
              mode={mode}
              onNext={handleNext}
              onFinish={handleFinish}
            />
          )}

          {phase === "score" && (
            <ScoreBoard
              name={playerName}
              score={score}
              total={questions.length}
              mode={mode}
              onRestart={handleRestart}
              onLeaderboard={() => setPhase("leaderboard")}
            />
          )}

          {phase === "leaderboard" && (
            <Leaderboard onBack={() => setPhase(playerName ? "name" : "name")} />
          )}

        </div>
      </div>
    </>
  );
}
