import React, { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";

const sampleQuestions = [
  {
    question: "Javaはどれ？",
    choices: ["言語", "OS", "ブラウザ", "DB"],
    answer: 0,
  },
  {
    question: "HTMLは何？",
    choices: ["プログラミング言語", "マークアップ言語", "OS", "DB"],
    answer: 1,
  },
];

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = (index) => {
    if (index === sampleQuestions[current].answer) {
      setScore(score + 1);
    }

    if (current + 1 < sampleQuestions.length) {
      setCurrent(current + 1);
    } else {
      navigate("/result", { state: { score, total: sampleQuestions.length } });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <QuestionCard
        question={sampleQuestions[current].question}
        choices={sampleQuestions[current].choices}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

export default Quiz;