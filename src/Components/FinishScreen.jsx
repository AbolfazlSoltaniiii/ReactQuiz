import React from "react";
import { useQuiz } from "../hooks/useQuiz.js";

const FinishScreen = () => {
  const {points, maxPossiblePoints, dispatch} = useQuiz();

  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <>
      <p className="result">
        😊You scored {points} out of {maxPossiblePoints} ({Math.ceil(percentage)}%)😊
      </p>

      <button className="btn btn-ui" onClick={() => dispatch({type: "restart"})}>Restart quiz</button>
    </>
  );
};

export default FinishScreen;