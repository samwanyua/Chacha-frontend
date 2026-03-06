import { useState } from "react";
import { Box, Button, Typography, TextField, Paper, Stack, IconButton, Fade } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChachaLogo from "../components/ChachaLogo";
import ChameleonMascot from "../components/ChameleonMascot";
import { BG_STYLE } from "../constants/theme";

const API_URL = "http://localhost:8000/api";

export default function AuthPage({ onNavigate, onLoginSuccess }) {
  const [view, setView] = useState("choice"); // 'choice', 'login', 'signup', 'forgot'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Login failed");
      
      localStorage.setItem("chacha_user", JSON.stringify(data.user));
      onLoginSuccess();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Signup failed");
      
      localStorage.setItem("chacha_user", JSON.stringify({ id: data.user_id, username }));
      onLoginSuccess();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/auth/guest`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Guest login failed");
      
      localStorage.setItem("chacha_user", JSON.stringify(data.user));
      onLoginSuccess();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ ...BG_STYLE, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", px: 2 }}>
      
      <Box sx={{ position: "absolute", top: 20, left: 20 }}>
        {view !== "choice" ? (
          <IconButton onClick={() => { setView("choice"); setErrorMsg(""); }} sx={{ bgcolor: "white", boxShadow: 2, "&:hover": { bgcolor: "#f0f0f0" } }}>
            <ArrowBackIcon sx={{ color: "#444" }} />
          </IconButton>
        ) : (
          <ChachaLogo height={48} />
        )}
      </Box>

      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 8,
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          position: "relative",
          overflow: "visible",
          bgcolor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          border: "4px solid white"
        }}
      >
        <Box sx={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)" }}>
          <ChameleonMascot size={120} animation="float" />
        </Box>

        <Box sx={{ mt: 5 }}>
          {view === "choice" && (
            <Fade in={true}>
              <Stack spacing={3}>
                <Typography sx={{ fontFamily: "var(--font-fredoka), 'Fredoka One', cursive", fontSize: "2rem", color: "#e74c3c" }}>
                  Let's Play!
                </Typography>
                
                <Button 
                  fullWidth variant="contained" 
                  onClick={() => setView("login")}
                  sx={{ background: "linear-gradient(135deg,#74b9ff,#0984e3)", fontSize: "1.2rem", py: 1.5, borderRadius: 4, fontFamily: "var(--font-fredoka), 'Fredoka One', cursive" }}
                >
                  Log In
                </Button>

                <Button 
                  fullWidth variant="contained" 
                  onClick={() => setView("signup")}
                  sx={{ background: "linear-gradient(135deg,#a5d6a7,#43a047)", fontSize: "1.2rem", py: 1.5, borderRadius: 4, fontFamily: "var(--font-fredoka), 'Fredoka One', cursive" }}
                >
                  Sign Up
                </Button>

                <Typography sx={{ color: "#888", fontWeight: "bold" }}>OR</Typography>

                <Button 
                  fullWidth variant="outlined" 
                  onClick={handleGuest}
                  disabled={loading}
                  sx={{ color: "#f39c12", borderColor: "#f39c12", borderWidth: 2, fontSize: "1.2rem", py: 1.5, borderRadius: 4, fontFamily: "var(--font-fredoka), 'Fredoka One', cursive", "&:hover": { borderWidth: 2, bgcolor: "rgba(243,156,18,0.1)" } }}
                >
                  {loading ? "Loading..." : "Play as Guest"}
                </Button>
              </Stack>
            </Fade>
          )}

          {(view === "login" || view === "signup") && (
            <Fade in={true}>
              <Stack spacing={2.5}>
                <Typography sx={{ fontFamily: "var(--font-fredoka), 'Fredoka One', cursive", fontSize: "2rem", color: view === "login" ? "#0984e3" : "#43a047" }}>
                  {view === "login" ? "Welcome Back!" : "Create Account"}
                </Typography>
                
                <TextField 
                  fullWidth label="Username" variant="outlined" 
                  value={username} onChange={(e) => setUsername(e.target.value)}
                  sx={{ bgcolor: "white", borderRadius: 2 }}
                />
                
                <TextField 
                  fullWidth label="Password" type="password" variant="outlined" 
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  sx={{ bgcolor: "white", borderRadius: 2 }}
                />

                {errorMsg && <Typography color="error" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>{errorMsg}</Typography>}

                <Button 
                  fullWidth variant="contained" 
                  onClick={view === "login" ? handleLogin : handleSignup}
                  disabled={loading || !username || !password}
                  sx={{ background: view === "login" ? "linear-gradient(135deg,#74b9ff,#0984e3)" : "linear-gradient(135deg,#a5d6a7,#43a047)", fontSize: "1.2rem", py: 1.5, borderRadius: 4, fontFamily: "var(--font-fredoka), 'Fredoka One', cursive" }}
                >
                  {loading ? "Please wait..." : (view === "login" ? "Log In" : "Sign Up")}
                </Button>

                {view === "login" && (
                  <Typography 
                    onClick={() => setView("forgot")}
                    sx={{ color: "#888", cursor: "pointer", fontSize: "0.9rem", textDecoration: "underline", "&:hover": { color: "#444" } }}
                  >
                    Forgot Password?
                  </Typography>
                )}
              </Stack>
            </Fade>
          )}

          {view === "forgot" && (
            <Fade in={true}>
              <Stack spacing={2.5}>
                <Typography sx={{ fontFamily: "var(--font-fredoka), 'Fredoka One', cursive", fontSize: "1.8rem", color: "#e67e22" }}>
                  Forgot Password?
                </Typography>
                <Typography sx={{ color: "#666", fontSize: "0.95rem" }}>
                  Please ask your parent/teacher to help you reset your password. The reset link will be sent to the registered email.
                </Typography>
                <TextField 
                  fullWidth label="Parent/Teacher Email" variant="outlined" 
                  sx={{ bgcolor: "white", borderRadius: 2 }}
                />
                <Button 
                  fullWidth variant="contained" 
                  onClick={() => { setErrorMsg("For safety, password resets are simulated in this demo."); }}
                  sx={{ background: "linear-gradient(135deg,#feca57,#e67e22)", fontSize: "1.2rem", py: 1.5, borderRadius: 4, fontFamily: "var(--font-fredoka), 'Fredoka One', cursive" }}
                >
                  Send Reset Link
                </Button>
                {errorMsg && <Typography color="primary" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>{errorMsg}</Typography>}
              </Stack>
            </Fade>
          )}

        </Box>
      </Paper>
    </Box>
  );
}
