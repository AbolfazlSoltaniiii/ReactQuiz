import React from 'react';

const StartScreen = ({numQuestions, dispatch}) => {
    return (
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{numQuestions} questions to test your React mastery</h3>
            <button className="btn btn-ui" onClick={() => dispatch({type: 'activeQuiz'})}>Let's start</button>
        </div>
    );
};

export default StartScreen;