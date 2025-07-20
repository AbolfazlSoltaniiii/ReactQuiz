import React from 'react';

const ProgressBar = ({currIndex, numQuestions, points, maxPossiblePoints, answer}) => {
    return (
        <header className="progress">
            <progress max={numQuestions} value={currIndex + Number(answer !== null)}/>

            <p>Question <strong>{currIndex + 1}</strong> / {numQuestions}</p>
            <p><strong>{points}</strong> / {maxPossiblePoints} points</p>
        </header>
    );
};

export default ProgressBar;