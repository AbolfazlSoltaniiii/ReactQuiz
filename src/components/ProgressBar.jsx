import React from "react";
import { useQuiz } from "../hooks/useQuiz.js";

const ProgressBar = () => {
  const {currIndex, numQuestions, points, maxPossiblePoints, answer} = useQuiz();

  return (
    <header className="progress">
      <progress max={numQuestions} value={currIndex + Number(answer !== null)} />

      <p>Question <strong>{currIndex + 1}</strong> / {numQuestions}</p>
      <p><strong>{points}</strong> / {maxPossiblePoints} points</p>
    </header>
  );
};

export default ProgressBar;