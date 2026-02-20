import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        SmartStudy ホーム
      </Typography>
      <Typography variant="body1" gutterBottom>
        {isLoggedIn
          ? "クイズを始めたり、マイページで学習履歴を確認できます。"
          : "ログインまたはサインアップして学習を始めましょう。"}
      </Typography>

      <Box mt={2}>
        {isLoggedIn ? (
          <>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/quiz"
              sx={{ mr: 2 }}
            >
              クイズスタート
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/mypage"
              sx={{ mr: 2 }}
            >
              マイページ
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              component={Link}
              to="/manage"
            >
              問題管理
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
              sx={{ mr: 2 }}
            >
              ログイン
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/signup"
            >
              サインアップ
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Home;