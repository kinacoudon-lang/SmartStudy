import React from "react";

function QuestionCard({ question, choices, onAnswer }) {
  return (
    <div>
      <h3>{question}</h3>
      {choices.map((choice, index) => (
        <button key={index} onClick={() => onAnswer(index)}>
          {choice}
        </button>
      ))}
    </div>
  );
}

export default QuestionCard;