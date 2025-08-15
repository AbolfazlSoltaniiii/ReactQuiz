import { createContext, useReducer } from "react";

const QuizContext = createContext(null);

const initialState = {
  status: 'loading',
  data: [],
  currIndex: 0,
  answer: null,
  points: 0,
  secondsRemaining: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "receivedData":
      return {
        ...state,
        status: 'ready',
        data: action.payload,
      };

    case "failedData":
      return {
        ...state,
        status: 'failed',
      };

    case "activeQuiz":
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.data.length * 5
      };

    case "updatedAnswer": {
      const currQuestion = state.data[state.currIndex];

      return {
        ...state,
        answer: action.payload,
        points: currQuestion.correctOption === action.payload ? state.points + currQuestion.points : state.points
      }
    }

    case "nextQuestion":
      return {
        ...state,
        answer: null,
        currIndex: state.currIndex + 1
      }

    case "finish":
      return {
        ...state,
        status: 'finished'
      }

    case "restart":
      return {
        ...state,
        status: 'ready',
        currIndex: 0,
        answer: null,
        points: 0
      }

    case 'tick': {
      const updatedSecondRemaining = state.secondsRemaining - 1;

      return {
        ...state,
        secondsRemaining: updatedSecondRemaining,
        status: updatedSecondRemaining === 0 ? 'finished' : state.status
      }
    }

    default:
      console.warn("unknown type")
  }
}

const QuizProvider = ({children}) => {
  const [{status, data, currIndex, answer, points, secondsRemaining}, dispatch] = useReducer(reducer, initialState);

  return <QuizContext.Provider value={{
    status,
    data,
    currIndex,
    answer,
    points,
    secondsRemaining,
    dispatch,
    numQuestions: data.length,
    maxPossiblePoints: data.reduce((prev, curr) => prev + curr.points, 0),
    currQuestion: data[currIndex]
  }}>
    {children}
  </QuizContext.Provider>;
};

export { QuizContext, QuizProvider };