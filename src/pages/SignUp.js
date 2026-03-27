import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/login");
  };

  return (
    <Box p={4}>
      <Typography variant="h5">Sign Up</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSignUp} sx={{ mt: 2 }}>
        サインアップ
      </Button>
    </Box>
  );
}

export default SignUp;