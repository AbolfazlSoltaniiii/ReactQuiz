import Header from "./Components/Header.jsx";
import Main from "./Components/Main.jsx";
import {useEffect, useReducer} from "react";
import Loader from "./Components/Loader.jsx";
import Error from "./Components/Error.jsx";
import StartScreen from "./Components/StartScreen.jsx";
import Questions from "./Components/Questions.jsx";
import ProgressBar from "./Components/ProgressBar.jsx";
import FinishScreen from "./Components/FinishScreen.jsx";

const initialState = {
    status: 'loading',
    data: [],
    currIndex: 0,
    answer: null,
    points: 0,
    secondsRemaining: 0
}

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

const App = () => {
    const [{status, data, currIndex, answer, points, secondsRemaining}, dispatch] = useReducer(reducer, initialState);

    const numQuestions = data.length;

    const maxPossiblePoints = data.reduce((prev, curr) => prev + curr.points, 0)

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then(res => res.json())
            .then(data => dispatch({
                type: 'receivedData',
                payload: data
            }))
            .catch(() => dispatch({
                type: 'failedData',
                payload: []
            }))
    }, []);

    return (
        <div className='app'>
            <Header/>
            <Main>
                {status === 'loading' && <Loader/>}
                {status === 'failed' && <Error/>}
                {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
                {status === 'active' &&
                    <>
                        <ProgressBar
                            currIndex={currIndex}
                            numQuestions={numQuestions}
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                            answer={answer}
                        />
                        <Questions
                            currQuestion={data[currIndex]}
                            answer={answer}
                            dispatch={dispatch}
                            currIndex={currIndex}
                            numQuestions={numQuestions}
                            secondsRemaining={secondsRemaining}
                        />
                    </>
                }
                {status === 'finished' &&
                    <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} dispatch={dispatch}/>}
            </Main>
        </div>
    );
}

export default App;