import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useLocation, Link } from "react-router-dom";

function Result() {
  const location = useLocation();
  const score = location.state?.score ?? 0;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        クイズ結果
      </Typography>
      <Typography variant="h5" gutterBottom>
        正答率: {score.toFixed(1)}%
      </Typography>

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/mypage"
          sx={{ mr: 2 }}
        >
          マイページへ
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to="/"
        >
          ホームへ
        </Button>
      </Box>
    </Box>
  );
}

export default Result;