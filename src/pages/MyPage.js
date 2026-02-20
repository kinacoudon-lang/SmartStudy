import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

function MyPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [average, setAverage] = useState(0);

  // ログインチェック
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/login");
  }, [navigate]);

  // 履歴取得 & 平均計算
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(storedHistory);

    if (storedHistory.length > 0) {
      const sum = storedHistory.reduce((acc, item) => acc + item.score, 0);
      setAverage(sum / storedHistory.length);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>マイページ</Typography>

      <Typography variant="h6">学習履歴</Typography>
      <Typography variant="body1" gutterBottom>今までの平均正答率: {average.toFixed(1)}%</Typography>

      <Box display="flex" flexDirection="column" gap={2} mb={4}>
        {history.map((item, index) => (
          <Card key={index} variant="outlined">
            <CardContent>
              <Typography variant="body1">{item.date}</Typography>
              <Typography variant="body2">正答率: {item.score.toFixed(1)}%</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography variant="h6" gutterBottom>正答率の推移</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey={() => average} stroke="#82ca9d" dot={false} name="平均" />
        </LineChart>
      </ResponsiveContainer>

      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 4 }}>
        ログアウト
      </Button>
    </Box>
  );
}

export default MyPage;