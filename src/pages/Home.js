import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>SmartStudyへようこそ</h1>
      <p>あなたの学習を最適化するアプリ</p>

      <Link to="/quiz">
        <button>学習を開始</button>
      </Link>
    </div>
  );
}

export default Home;