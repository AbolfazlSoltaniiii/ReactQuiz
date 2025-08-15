import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import { useEffect } from "react";
import Loader from "./components/Loader.jsx";
import Error from "./components/Error.jsx";
import StartScreen from "./components/StartScreen.jsx";
import Questions from "./components/Questions.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import FinishScreen from "./components/FinishScreen.jsx";
import { useQuiz } from "./hooks/useQuiz.js";

const App = () => {
  const {dispatch, status} = useQuiz();

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then(res => res.json())
      .then(data => dispatch({
        type: "receivedData",
        payload: data
      }))
      .catch(() => dispatch({
        type: "failedData",
        payload: []
      }));
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "failed" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" &&
          <>
            <ProgressBar />
            <Questions />
          </>
        }
        {status === "finished" &&
          <FinishScreen />}
      </Main>
    </div>
  );
};

export default App;