import { createTheme } from "@mui/material/styles";

// ── Global background style (reused on every screen) ──────────────────────────
export const BG_STYLE = {
  background:
    "radial-gradient(ellipse at 20% 50%, #ffe08a55 0%, transparent 50%)," +
    "radial-gradient(ellipse at 80% 20%, #ffb3c155 0%, transparent 50%), #fdf6ff",
  minHeight: "100vh",
};

// ── MUI theme override ────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    primary:   { main: "#1e88e5" },
    secondary: { main: "#f9a825" },
    success:   { main: "#43a047" },
    error:     { main: "#e53935" },
  },
  typography: {
    fontFamily: "'Nunito', sans-serif",
    h1: { fontFamily: "'Fredoka One', cursive" },
    h2: { fontFamily: "'Fredoka One', cursive" },
    h3: { fontFamily: "'Fredoka One', cursive" },
    h4: { fontFamily: "'Fredoka One', cursive" },
    h5: { fontFamily: "'Fredoka One', cursive" },
    h6: { fontFamily: "'Fredoka One', cursive" },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 40,
          textTransform: "none",
          fontFamily: "'Fredoka One', cursive",
          fontSize: "1rem",
          boxShadow: "none",
          "&:active": { transform: "scale(0.97)" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.88)",
        },
      },
    },
  },
});

export default theme;
