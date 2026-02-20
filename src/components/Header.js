import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{ padding: "10px", background: "#282c34", color: "white" }}>
      <h2>SmartStudy</h2>
      <nav>
        <Link to="/" style={{ marginRight: "10px", color: "white" }}>Home</Link>
        <Link to="/quiz" style={{ marginRight: "10px", color: "white" }}>Quiz</Link>
        <Link to="/mypage" style={{ color: "white" }}>MyPage</Link>
      </nav>
    </header>
  );
}

export default Header;