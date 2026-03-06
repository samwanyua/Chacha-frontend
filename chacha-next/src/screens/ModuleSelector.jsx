import { useState } from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import ChachaLogo      from "../components/ChachaLogo";
import ChameleonMascot from "../components/ChameleonMascot";
import SideNav         from "../components/SideNav";
import { BG_STYLE }    from "../constants/theme";

const MODULES = [
  {
    id: "module1", num: 1, icon: "⭐", animal: "🐱",
    title: "ONE WORD\nADVENTURE",
    gradient: "linear-gradient(135deg,#ffe082,#ffca28)", border: "#f9a825",
    locks: ["locked", "locked"], badge: "🌟",
  },
  {
    id: "module2", num: 2, icon: "🚀", animal: "🐶",
    title: "TWO WORD\nFUN",
    gradient: "linear-gradient(135deg,#90caf9,#42a5f5)", border: "#1e88e5",
    locks: ["locked", "unlocked"], badge: "🏅",
  },
  {
    id: "module3", num: 3, icon: "🌍", animal: "🐒",
    title: "SENTENCE\nSAFARI",
    gradient: "linear-gradient(135deg,#a5d6a7,#66bb6a)", border: "#43a047",
    locks: ["locked", "unlocked"], badge: "🏅",
  },
];

export default function ModuleSelector({ onNavigate }) {
  const [hovered, setHovered] = useState(null);

  return (
    <Box sx={{ ...BG_STYLE, display: "flex" }}>
      {/* Sidebar */}
      <SideNav
        current="modules"
        onChange={(id) => {
          if (id === "home") onNavigate("landing");
          else onNavigate(id);
        }}
      />

      {/* Main content – offset by sidebar width */}
      <Box
        sx={{
          flex: 1, ml: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          p: 4,
        }}
      >
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 5 }}>
          <ChameleonMascot size={110} animation="wave" />
          <ChachaLogo height={70} align="center" />
        </Stack>

        {/* Module blobs + connectors */}
        <Stack direction="row" alignItems="center" spacing={0}>
          {MODULES.map((m, idx) => (
            <Stack key={m.id} direction="row" alignItems="center">
              <Paper
                elevation={hovered === m.id ? 14 : 4}
                onMouseEnter={() => setHovered(m.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onNavigate(m.id)}
                sx={{
                  background: m.gradient,
                  border: `4px solid ${m.border}`,
                  borderRadius: "50% 40% 55% 45% / 40% 50% 50% 60%",
                  p: "44px 36px",
                  width: 240, minHeight: 280,
                  cursor: "pointer",
                  position: "relative",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 1.5,
                  transform: hovered === m.id ? "scale(1.08) rotate(-1.5deg)" : "scale(1)",
                  transition: "all 0.25s ease",
                  boxShadow: hovered === m.id
                    ? `0 18px 48px ${m.border}55`
                    : "0 6px 20px rgba(0,0,0,0.1)",
                }}
              >
                {/* Badge */}
                <Box sx={{ position: "absolute", top: -14, right: -10, fontSize: "2rem" }}>
                  {m.badge}
                </Box>

                {/* Icon circle */}
                <Box
                  sx={{
                    width: 80, height: 80, borderRadius: "50%",
                    background: "rgba(255,255,255,0.75)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "2.6rem",
                    boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  {m.icon}
                </Box>

                <Typography sx={{ fontSize: "1.8rem" }}>{m.animal}</Typography>

                <Typography
                  sx={{
                    fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 800,
                    fontSize: "0.9rem", color: "#555",
                  }}
                >
                  Module {m.num}:
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "var(--font-fredoka), 'Fredoka One', cursive", fontSize: "1.25rem",
                    color: "#333", textAlign: "center",
                    whiteSpace: "pre-line", lineHeight: 1.3,
                  }}
                >
                  {m.title}
                </Typography>

                <Stack direction="row" spacing={1.5} sx={{ mt: 1 }}>
                  {m.locks.map((lock, li) => (
                    <Box
                      key={li}
                      sx={{
                        width: 46, height: 46, borderRadius: 3,
                        background: lock === "locked" ? "#ff6b6b" : "#51cf66",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.3rem",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                      }}
                    >
                      {lock === "locked" ? "🔒" : "🔓"}
                    </Box>
                  ))}
                </Stack>
              </Paper>

              {/* Connector */}
              {idx < MODULES.length - 1 && (
                <Box
                  sx={{
                    width: 52, height: 9, borderRadius: 5,
                    background: `linear-gradient(to right,${m.border},${MODULES[idx + 1].border})`,
                    mx: "-5px", zIndex: 1,
                  }}
                />
              )}
            </Stack>
          ))}
        </Stack>

        {/* Floating decorative badges */}
        {[
          { emoji: "🥇", top: 160, left: 130 },
          { emoji: "🏅", bottom: 100, right: 60 },
          { emoji: "🎖️", top: 340, left: 150 },
        ].map((b, i) => (
          <Box
            key={i}
            className="float"
            sx={{
              position: "fixed",
              top: b.top, bottom: b.bottom,
              left: b.left, right: b.right,
              fontSize: "2.8rem", opacity: 0.6,
              animationDelay: `${i * 0.35}s`,
              pointerEvents: "none",
            }}
          >
            {b.emoji}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
