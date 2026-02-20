import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          SmartStudy
        </Typography>

        {/* Homeボタンは誰でも見える */}
        <Button color="inherit" component={Link} to="/">
          ホーム
        </Button>

        {isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/mypage">
              マイページ
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              ログアウト
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              ログイン
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              サインアップ
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;