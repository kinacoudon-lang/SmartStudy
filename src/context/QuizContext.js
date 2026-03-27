import React, { createContext, useState } from "react";

// Context の作成
export const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {
  // ここで全体で使う questions を管理
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "single",
      question: "Reactは何のライブラリ？",
      options: ["フレームワーク", "ライブラリ", "データベース"],
      answer: 1,
      tags: ["React", "基礎"]
    },
    {
      id: 2,
      type: "multiple",
      question: "JavaScriptのプリミティブ型は？",
      options: ["String", "Number", "Object", "Boolean"],
      answer: [0,1,3],
      tags: ["JS", "基礎"]
    },
    {
      id: 3,
      type: "text",
      question: "HTMLで段落を作るタグは？",
      correctTexts: ["p", "<p>"],
      tags: ["HTML", "基礎"]
    }
  ]);

  return (
    <QuizContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuizContext.Provider>
  );
};