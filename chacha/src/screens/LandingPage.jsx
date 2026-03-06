import { useState } from "react";
import { Box, Button, Typography, Stack, Paper } from "@mui/material";
import ChachaLogo      from "../components/ChachaLogo";
import ChameleonMascot from "../components/ChameleonMascot";
import { BG_STYLE }    from "../constants/theme";

const MODULE_CARDS = [
  { id: "module1", icon: "⭐", animal: "🐱", label: "Module 1:", title: "ONE WORD\nADVENTURE", bg: "#ffe082", border: "#f9a825" },
  { id: "module2", icon: "🚀", animal: "🐶", label: "Module 2:", title: "TWO WORD\nFUN",       bg: "#90caf9", border: "#1e88e5" },
  { id: "module3", icon: "🌍", animal: "🐒", label: "Module 3:", title: "SENTENCE\nSAFARI",    bg: "#a5d6a7", border: "#43a047" },
];

export default function LandingPage({ onNavigate }) {
  const [hovered, setHovered] = useState(null);

  return (
    <Box sx={{ ...BG_STYLE, display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── Navbar ── */}
      <Box
        component="nav"
        sx={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          px: { xs: 4, md: 6 }, py: 2,
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.4)",
          flexShrink: 0,
        }}
      >
        <ChachaLogo height={52} />
        <Stack direction="row" spacing={4} alignItems="center">
          <Typography
            onClick={() => onNavigate("how-it-works")}
            sx={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 800,
              fontSize: "1.05rem", color: "#555", cursor: "pointer",
              "&:hover": { color: "#1e88e5" }, transition: "color 0.2s",
            }}
          >
            HOW IT WORKS
          </Typography>
          <Button
            variant="contained"
            onClick={() => onNavigate("modules")}
            sx={{
              background: "linear-gradient(135deg,#42a5f5,#1e88e5)",
              fontFamily: "'Fredoka One', cursive",
              fontSize: "1.15rem",
              px: 4, py: 1.3, borderRadius: 8,
              boxShadow: "0 4px 14px rgba(30,136,229,0.4)",
            }}
          >
            GET STARTED
          </Button>
        </Stack>
      </Box>

      {/* ── Hero: fills the rest of the viewport ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 4, md: 8, lg: 12 },
          py: { xs: 4, md: 0 },
          gap: { xs: 4, md: 8, lg: 10 },
          // ensure it fills the remaining height
          minHeight: "calc(100vh - 72px)",
        }}
      >
        {/* ── Left: Mascot column ── */}
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ flexShrink: 0 }}
        >
          <ChameleonMascot size={280} animation="float" />

          {/* Rainbow progress bar */}
          <Box
            sx={{
              height: 24, width: 260, borderRadius: 6,
              background: "linear-gradient(to right,#ff6b6b,#feca57,#48dbfb,#ff9ff3)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
          />

          {/* Stars */}
          <Stack direction="row" spacing={1.5}>
            {[0, 1, 2].map((i) => (
              <Typography key={i} sx={{ fontSize: "2.4rem" }}>⭐</Typography>
            ))}
          </Stack>
        </Stack>

        {/* ── Right: text + cards + CTA ── */}
        <Box sx={{ flex: 1, maxWidth: 1200 }}>

          {/* Headline */}
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
              background: "linear-gradient(135deg,#ff6b6b,#feca57,#48dbfb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
              mb: 2,
            }}
          >
            WELCOME TO CHACHA!
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 800,
              fontSize: "clamp(1.3rem, 2.2vw, 2rem)",
              color: "#333", mb: 4.5,
            }}
          >
            The Fun Way to Practice Speaking. 🎉
          </Typography>

          {/* Module cards */}
          <Stack direction="row" spacing={4} flexWrap="wrap" sx={{ mb: 5 }}>
            {MODULE_CARDS.map((m) => (
              <Paper
                key={m.id}
                elevation={hovered === m.id ? 14 : 4}
                onMouseEnter={() => setHovered(m.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onNavigate(m.id)}
                sx={{
                  background: m.bg,
                  border: `5px solid ${m.border}`,
                  borderRadius: 8,
                  p: 5,
                  minWidth: 200,
                  width: 210,
                  textAlign: "center",
                  cursor: "pointer",
                  transform: hovered === m.id ? "scale(1.08) rotate(-1.5deg)" : "scale(1)",
                  transition: "all 0.25s ease",
                  boxShadow: hovered === m.id ? `0 18px 48px ${m.border}66` : undefined,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography sx={{ fontSize: "5rem", lineHeight: 1, mb: 0.5 }}>{m.icon}</Typography>
                <Typography sx={{ fontSize: "3rem", lineHeight: 1 }}>{m.animal}</Typography>
                <Typography
                  sx={{
                    fontFamily: "'Nunito', sans-serif", fontWeight: 800,
                    fontSize: "1rem", color: "#555", mt: 1,
                  }}
                >
                  {m.label}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Fredoka One', cursive",
                    fontSize: "1.5rem",
                    color: "#333", whiteSpace: "pre-line", lineHeight: 1.3,
                  }}
                >
                  {m.title}
                </Typography>
              </Paper>
            ))}
          </Stack>

          {/* CTA */}
          <Button
            variant="contained"
            size="large"
            onClick={() => onNavigate("module1")}
            sx={{
              background: "linear-gradient(135deg,#feca57,#ff9f43)",
              fontFamily: "'Fredoka One', cursive",
              fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
              px: 9, py: 2.4,
              borderRadius: 12,
              boxShadow: "0 10px 32px rgba(255,159,67,0.5)",
              "&:hover": {
                transform: "scale(1.06)",
                boxShadow: "0 16px 40px rgba(255,159,67,0.65)",
              },
              transition: "all 0.22s ease",
            }}
          >
            Start Here! 🚀
          </Button>
        </Box>
      </Box>
    </Box>
  );
}