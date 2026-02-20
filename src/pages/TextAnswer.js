import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function TextAnswer({ q, onSubmit }) {
  const [answer, setAnswer] = useState("");

  return (
    <Box>
      <TextField
        fullWidth
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="回答を入力"
      />
      <Button onClick={() => onSubmit(answer)} variant="contained" color="primary" sx={{ mt: 1 }}>
        回答
      </Button>
    </Box>
  );
}

export default TextAnswer;