import { useState, useEffect } from "react";
import "./Result.scss";

const Result = ({ totalQuestions, result, onTryAgain }) => {
  const [name, setName] = useState("");
  const [highScores, setHighScores] = useState([]);
  const [showScores, setShowScores] = useState(false);
  useEffect(() => {
    setHighScores(JSON.parse(localStorage.getItem('highScores')) || []);
  }, []);

  const handleSave = () => {
    const score = {
      name,
      score: result.score,
    };
    const newHighScores = [...highScores, score].sort(
      (a, b) => b.score - a.score
    );
    setHighScores(newHighScores);
    setShowScores(true);
    localStorage.setItem("highScores", JSON.stringify(newHighScores));
  };

  const handleTryAgain = () => {
    setShowScores(false);
    setHighScores([]);
    onTryAgain();
  };
  return (
    <div className="result">
      <h3>Result</h3>
      <p>
        Total Questions: <span>{totalQuestions}</span>
      </p>
      <p>
        Total score: <span>{result.score}</span>
      </p>
      <p>
        Correct Answers: <span>{result.correctAnswers}</span>
      </p>
      <p>
        Wrong Answers: <span>{result.wrongAnswers}</span>
      </p>
      <button onClick={handleTryAgain}>Try Again</button>
      {!showScores ? (
        <>
          <h3>
            Enter your name below <br />
            to sava your score!
          </h3>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <button onClick={handleSave}>save</button>
        </>
      ) : (
        <>
          <table>
            <thead>
              <th>Ranking</th>
              <th>Name</th>
              <th>Score</th>
            </thead>
            <tbody>
              {highScores.map((highScore, i) => {
                return (
                  <tr key={`${highScore.score}${highScore.name}${i}`}>
                    <td>{i + 1}</td>
                    <td>{highScore.name}</td>
                    <td>{highScore.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Result;
