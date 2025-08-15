import React from 'react';

const Option = ({currQuestion, answer, dispatch}) => {
    const hasAnswered = answer !== null;

    return (
        <div className="options">
            {
                currQuestion.options.map((option, index) =>
                    <button
                        className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? index === currQuestion.correctOption ? "correct" : "wrong" : ""}`}
                        key={option}
                        onClick={() => dispatch({type: 'updatedAnswer', payload: index})}
                        disabled={hasAnswered}
                    >
                        {option}
                    </button>
                )
            }
        </div>
    );
};

export default Option;