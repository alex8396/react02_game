import Card from "./components/Card";
import Button from "./components/Button";
import css from "./css/App.module.css";
import { useState } from "react";

const App = () => {
  // 게임 상태 관리
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const choices2 = {
    paper: { name: "보", style: "paper" },
    rock: { name: "바위", style: "rock" },
    scissors: { name: "가위", style: "scissors" },
  };

  const keys = Object.keys(choices2);
  const values = Object.values(choices2);

  // 선택지 정의
  const choices = ["가위", "바위", "보", "?"];

  const generateRandomChoice = () => {
    const index = Math.floor(Math.random() * 3);
    return choices[index];
  };
  const determineWinner = (user, computer) => {
    if (user === computer) return "무승부";
    if (
      (user === "가위" && computer === "보") ||
      (user === "바위" && computer === "가위") ||
      (user === "보" && computer === "바위")
    ) {
      return "이겼다";
    }
    return "졌다";
  };

  const handleUserChoice = (choice) => {
    console.log("버튼 클릭", choice);
    if (isPlaying) return;
    setIsPlaying(true);
    setUserChoice(choice);
    setTimeout(() => {
      const compChoice = generateRandomChoice();
      setComputerChoice(compChoice);
      setResult(determineWinner(choice, compChoice));
      setIsPlaying(false);
    }, 300);
  };
  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
  };
  return (
    <div className={css.container}>
      <h1>가위바위보 게임</h1>

      {/* 게임 영역 */}
      <section>
        {/* 플레이어 영역 */}
        <Card
          userTitle="너님"
          choice={userChoice}
          result={
            result === "이겼다" ? "이겼다" : result === "졌다" ? "졌다" : result
          }
          type="user"
        />
        <Card
          userTitle="상대선수"
          choice={computerChoice}
          result={
            result === "졌다" ? "이겼다" : result === "이겼다" ? "졌다" : result
          }
          type="computer"
        />

        {/* 버튼 영역 */}
        <div className={css.buttonGroup}>
          {choices.slice(0, 3).map((choice) => (
            <Button
              key={choice}
              choice={choice}
              onClick={() => handleUserChoice(choice)}
              disabled={isPlaying}
            />
          ))}

          {/* 결과 표시 */}
          <div className={css.resultDisplay}>{result}</div>

          {/* 리셋 버튼 */}
          <button className={css.resetButton} onClick={resetGame}>
            다시하기
          </button>
        </div>
      </section>

      <div>
        <p>버튼을 클릭하여 가위, 바위, 보 중 하나를 선택하세요.</p>
        <p>컴퓨터는 랜덤으로 선택합니다.</p>
      </div>
    </div>
  );
};

export default App;
