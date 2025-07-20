import React from 'react';
import Option from "./Option.jsx";
import Timer from "./Timer.jsx";

const Questions = ({currQuestion, answer, dispatch, currIndex, numQuestions, secondsRemaining}) => {
    const isLastQuestions = currIndex === numQuestions - 1;

    return (
        <div>
            <h4>{currQuestion.question}</h4>
            <Option currQuestion={currQuestion} answer={answer} dispatch={dispatch}/>

            {answer !== null &&
                <button className="btn btn-ui"
                        onClick={() => dispatch({type: isLastQuestions ? 'finish' : 'nextQuestion'})}>{isLastQuestions ? "Finish" : "Next"}</button>}

            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
        </div>
    );
};

export default Questions;