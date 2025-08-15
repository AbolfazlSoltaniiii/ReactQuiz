import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext.jsx";

export const useQuiz = () => {
  return useContext(QuizContext);
}