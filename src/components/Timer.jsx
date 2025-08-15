import React, {useEffect} from 'react';

const Timer = ({dispatch, secondsRemaining}) => {
    const minute = secondsRemaining / 60;
    const second = secondsRemaining % 60;

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch({type: 'tick'})
        }, 1000)

        return () => clearInterval(intervalId)
    }, [dispatch]);

    return (
        <div className="timer">
            {minute < 10 && "0"}{Math.floor(minute)}:{second < 10 && "0"}{Math.floor(second)}
        </div>
    );
};

export default Timer;