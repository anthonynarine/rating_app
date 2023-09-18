import React, { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { useAuthServices } from "./AuthServices";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { obtainTokens } = useAuthServices();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle login logic here
    try {
      const tokens = await obtainTokens(username, password);
        
      localStorage.setItem("accessToken", tokens.access)
      localStorage.setItem("refreshToken", tokens.refresh)

      console.log("Access Token being stored:", tokens.access);
      console.log("Refresh Token being stored:", tokens.refresh);

      navigate("/");
      // Store the tokens somewhere (like a context, local storage, or a cookie).
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;
