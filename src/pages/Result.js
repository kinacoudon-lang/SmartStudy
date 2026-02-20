import React from "react";
import { useLocation, Link } from "react-router-dom";

function Result() {
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div style={{ padding: "20px" }}>
      <h2>結果</h2>
      <p>スコア: {score} / {total}</p>

      <Link to="/quiz">
        <button>もう一度</button>
      </Link>
      <Link to="/">
        <button>ホームへ</button>
      </Link>
    </div>
  );
}

export default Result;