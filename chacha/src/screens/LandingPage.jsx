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
    <Box sx={{ ...BG_STYLE, display: "flex", flexDirection: "column" }}>
      {/* ── Navbar ── */}
      <Box
        component="nav"
        sx={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          px: 5, py: 2.5,
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <ChachaLogo height={52} />

        <Stack direction="row" spacing={4} alignItems="center">
          {["HOW IT WORKS", "OUR MODULES", "FOR PARENTS"].map((label) => (
            <Typography
              key={label}
              sx={{
                fontFamily: "'Nunito', sans-serif", fontWeight: 800,
                fontSize: "1rem", color: "#555", cursor: "pointer",
                "&:hover": { color: "#1e88e5" }, transition: "color 0.2s",
              }}
            >
              {label}
            </Typography>
          ))}
          <Button
            variant="contained"
            onClick={() => onNavigate("modules")}
            sx={{
              background: "linear-gradient(135deg,#42a5f5,#1e88e5)",
              fontFamily: "'Fredoka One', cursive",
              fontSize: "1.1rem",
              px: 4, py: 1.3,
              borderRadius: 8,
              boxShadow: "0 4px 14px rgba(30,136,229,0.4)",
            }}
          >
            GET STARTED
          </Button>
        </Stack>
      </Box>

      {/* ── Hero ── */}
      <Box
        sx={{
          flex: 1, display: "flex", alignItems: "center",
          px: { xs: 4, md: 10 }, py: 6, gap: 6,
        }}
      >
        {/* Mascot + rainbow bar */}
        <Stack alignItems="center" spacing={3} sx={{ flexShrink: 0 }}>
          <ChameleonMascot size={240} animation="float" />
          <Box
            sx={{
              height: 22, width: 220, borderRadius: 5,
              background: "linear-gradient(to right,#ff6b6b,#feca57,#48dbfb,#ff9ff3)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            }}
          />
          <Stack direction="row" spacing={1}>
            {[0, 1, 2].map((i) => (
              <Typography key={i} sx={{ fontSize: "2rem" }}>⭐</Typography>
            ))}
          </Stack>
        </Stack>

        {/* Content */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: "clamp(2.8rem,6vw,4.5rem)",
              background: "linear-gradient(135deg,#ff6b6b,#feca57,#48dbfb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1.5,
              lineHeight: 1.1,
            }}
          >
            WELCOME TO CHACHA!
          </Typography>

          <Typography
            sx={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 800,
              fontSize: "1.7rem", color: "#333", mb: 4,
            }}
          >
            The Fun Way to Practice Speaking. 🎉
          </Typography>

          {/* Module cards */}
          <Stack direction="row" spacing={3} flexWrap="wrap" sx={{ mb: 5 }}>
            {MODULE_CARDS.map((m) => (
              <Paper
                key={m.id}
                elevation={hovered === m.id ? 10 : 3}
                onMouseEnter={() => setHovered(m.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onNavigate(m.id)}
                sx={{
                  background: m.bg,
                  border: `4px solid ${m.border}`,
                  borderRadius: 6,
                  p: 3,
                  minWidth: 160,
                  textAlign: "center",
                  cursor: "pointer",
                  transform: hovered === m.id ? "scale(1.1) rotate(-1.5deg)" : "scale(1)",
                  transition: "all 0.25s ease",
                }}
              >
                <Typography sx={{ fontSize: "2.5rem", mb: 0.5 }}>{m.icon}</Typography>
                <Typography sx={{ fontSize: "1.5rem" }}>{m.animal}</Typography>
                <Typography
                  sx={{
                    fontFamily: "'Nunito', sans-serif", fontWeight: 700,
                    fontSize: "0.8rem", color: "#555", mt: 0.5,
                  }}
                >
                  {m.label}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Fredoka One', cursive", fontSize: "1rem",
                    color: "#333", whiteSpace: "pre-line", lineHeight: 1.3,
                  }}
                >
                  {m.title}
                </Typography>
              </Paper>
            ))}
          </Stack>

          <Button
            variant="contained"
            size="large"
            onClick={() => onNavigate("module1")}
            sx={{
              background: "linear-gradient(135deg,#feca57,#ff9f43)",
              fontFamily: "'Fredoka One', cursive",
              fontSize: "1.7rem",
              px: 8, py: 2.2,
              borderRadius: 10,
              boxShadow: "0 8px 28px rgba(255,159,67,0.5)",
              "&:hover": { transform: "scale(1.05)", boxShadow: "0 12px 36px rgba(255,159,67,0.6)" },
              transition: "all 0.2s",
            }}
          >
            Start Here! 🚀
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
