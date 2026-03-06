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
    <Box
      sx={{
        ...BG_STYLE,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* ── Navbar ────────────────────────────────────────────────────────── */}
      <Box
        component="nav"
        sx={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          px: 6, py: 2.2,
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          borderBottom: "1.5px solid rgba(255,255,255,0.5)",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <ChachaLogo height={56} />
        <Stack direction="row" spacing={4} alignItems="center">
          <Typography
            onClick={() => onNavigate("how-it-works")}
            sx={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 800,
              fontSize: "1.1rem", color: "#555", cursor: "pointer",
              letterSpacing: 0.5,
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
              fontSize: "1.2rem",
              px: 4.5, py: 1.4,
              borderRadius: 8,
              boxShadow: "0 5px 18px rgba(30,136,229,0.45)",
              "&:hover": { transform: "scale(1.04)" },
              transition: "transform 0.2s",
            }}
          >
            GET STARTED
          </Button>
        </Stack>
      </Box>

      {/* ── Hero: two equal columns filling the rest of the screen ────────── */}
      <Box
        sx={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",  // left = mascot, right = content
          overflow: "hidden",
        }}
      >
        {/* ── LEFT COLUMN: mascot, bar, stars ── */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            px: 4,
            // subtle left-side tint
            background: "radial-gradient(ellipse at 40% 60%, #ffe08a44 0%, transparent 70%)",
          }}
        >
          <ChameleonMascot size={340} animation="float" />

          {/* Rainbow bar */}
          <Box
            sx={{
              height: 26, width: "60%",
              borderRadius: 7,
              background: "linear-gradient(to right,#ff6b6b,#feca57,#48dbfb,#ff9ff3)",
              boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
            }}
          />

          {/* Stars */}
          <Stack direction="row" spacing={2}>
            {[0, 1, 2].map((i) => (
              <Typography key={i} sx={{ fontSize: "3rem" }}>⭐</Typography>
            ))}
          </Stack>
        </Box>

        {/* ── RIGHT COLUMN: headline + cards + CTA ── */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pr: { md: 8, lg: 12 },
            pl: { md: 2, lg: 4 },
            gap: 3,
            overflowY: "auto",
            py: 4,
          }}
        >
          {/* Headline */}
          <Box>
            <Typography
              sx={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: "clamp(3rem, 4.5vw, 5.5rem)",
                background: "linear-gradient(135deg,#ff6b6b 0%,#feca57 50%,#48dbfb 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.05,
                mb: 1.5,
              }}
            >
              WELCOME TO CHACHA!
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Nunito', sans-serif", fontWeight: 800,
                fontSize: "clamp(1.4rem, 2vw, 2.1rem)",
                color: "#444",
              }}
            >
              The Fun Way to Practice Speaking. 🎉
            </Typography>
          </Box>

          {/* Module cards row */}
          <Stack direction="row" spacing={3} flexWrap="wrap">
            {MODULE_CARDS.map((m) => (
              <Paper
                key={m.id}
                elevation={hovered === m.id ? 16 : 4}
                onMouseEnter={() => setHovered(m.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onNavigate(m.id)}
                sx={{
                  background: m.bg,
                  border: `5px solid ${m.border}`,
                  borderRadius: 9,
                  py: 4, px: 3,
                  width: 200,
                  textAlign: "center",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.8,
                  transform: hovered === m.id ? "scale(1.1) rotate(-1.5deg)" : "scale(1)",
                  transition: "all 0.25s ease",
                  boxShadow: hovered === m.id ? `0 20px 50px ${m.border}66` : undefined,
                }}
              >
                <Typography sx={{ fontSize: "4.5rem", lineHeight: 1 }}>{m.icon}</Typography>
                <Typography sx={{ fontSize: "3rem",   lineHeight: 1 }}>{m.animal}</Typography>
                <Typography
                  sx={{
                    fontFamily: "'Nunito', sans-serif", fontWeight: 800,
                    fontSize: "0.95rem", color: "#666", mt: 0.5,
                  }}
                >
                  {m.label}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Fredoka One', cursive",
                    fontSize: "1.4rem",
                    color: "#333", whiteSpace: "pre-line", lineHeight: 1.25,
                  }}
                >
                  {m.title}
                </Typography>
              </Paper>
            ))}
          </Stack>

          {/* CTA button */}
          <Button
            variant="contained"
            onClick={() => onNavigate("module1")}
            sx={{
              alignSelf: "flex-start",
              background: "linear-gradient(135deg,#feca57,#ff9f43)",
              fontFamily: "'Fredoka One', cursive",
              fontSize: "clamp(1.6rem, 2vw, 2.1rem)",
              px: 9, py: 2.4,
              borderRadius: 12,
              boxShadow: "0 10px 34px rgba(255,159,67,0.5)",
              "&:hover": {
                transform: "scale(1.06)",
                boxShadow: "0 18px 44px rgba(255,159,67,0.65)",
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