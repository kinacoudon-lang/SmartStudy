import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuizContextProvider } from "./context/QuizContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import MyPage from "./pages/MyPage";
import ManageQuestions from "./pages/ManageQuestions";
import Header from "./components/Header";

function App() {
  return (
    <QuizContextProvider> {/* ← ここで全体をラップ */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/manage" element={<ManageQuestions />} />
        </Routes>
      </Router>
    </QuizContextProvider>
  );
}

export default App;