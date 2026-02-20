import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MultipleChoice from "./MultipleChoice";
import TextAnswer from "./TextAnswer";
import { QuizContext } from "../context/QuizContext";

function Quiz() {
  const navigate = useNavigate();
  const { questions } = useContext(QuizContext); // ここで questions を取得

  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate("/"); // 問題がなければHomeへ
    }
  }, [questions, navigate]);

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[current] = answer;
    setUserAnswers(newAnswers);

    if (current + 1 < questions.length) setCurrent(current + 1);
    else finishQuiz(newAnswers);
  };

  const finishQuiz = (answers) => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      const user = answers[idx];
      if (q.type === "single") {
        if (user === q.answer) correctCount++;
      } else if (q.type === "multiple") {
        const sortedUser = Array.isArray(user) ? [...user].sort() : [];
        const sortedAnswer = [...q.answer].sort();
        if (JSON.stringify(sortedUser) === JSON.stringify(sortedAnswer)) correctCount++;
      } else if (q.type === "text") {
        if (q.correctTexts.some(txt => txt.trim() === (user || "").trim())) correctCount++;
      }
    });

    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setFinished(true);

    // 学習履歴に保存
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({ date: new Date().toLocaleString(), score: percentage, total: questions.length });
    localStorage.setItem("history", JSON.stringify(history));
  };

  if (finished) {
    return (
      <div>
        <h2>結果</h2>
        <p>正答率: {score.toFixed(1)}%</p>
        <button onClick={() => navigate("/mypage")}>マイページへ</button>
        <button onClick={() => navigate("/")}>Homeへ</button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div>
      <h3>{q.question}</h3>

      {q.type === "single" && q.options.map((opt, idx) => (
        <button key={idx} onClick={() => handleAnswer(idx)}>{opt}</button>
      ))}

      {q.type === "multiple" && (
        <MultipleChoice q={q} onSubmit={handleAnswer} />
      )}

      {q.type === "text" && (
        <TextAnswer q={q} onSubmit={handleAnswer} />
      )}
    </div>
  );
}

export default Quiz;