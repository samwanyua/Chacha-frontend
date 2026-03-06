import { useState } from "react";
import { Box, Button, Paper, Typography, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SettingsIcon     from "@mui/icons-material/Settings";
import StarBar          from "../components/StarBar";
import FeedbackBadge    from "../components/FeedbackBadge";
import SideNav          from "../components/SideNav";
import ChachaLogo       from "../components/ChachaLogo";
import { BG_STYLE }     from "../constants/theme";
import { MODULE2_PAIRS } from "../constants/data";

export default function Module2({ onNavigate }) {
  const [pairIdx,   setPairIdx]   = useState(0);
  const [listening, setListening] = useState(null);
  const [scores,    setScores]    = useState({});

  const left  = MODULE2_PAIRS[pairIdx];
  const right = MODULE2_PAIRS[(pairIdx + 1) % MODULE2_PAIRS.length];

  const handleMic = (which) => {
    if (listening) return;
    setListening(which);
    setTimeout(() => {
      setScores((prev) => ({ ...prev, [which]: Math.floor(Math.random() * 35) + 65 }));
      setListening(null);
    }, 2000);
  };

  const handleNext = () => {
    setPairIdx((i) => (i + 2) % MODULE2_PAIRS.length);
    setScores({});
  };

  const PhraseCard = ({ item, side }) => {
    const sc = scores[side];
    return (
      <Paper
        elevation={4}
        sx={{
          borderRadius: 8, p: 4,
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 3,
          flex: 1, minWidth: 280, maxWidth: 360,
          position: "relative",
        }}
      >
        {sc && (
          <Box sx={{ position: "absolute", top: -16, right: -12, fontSize: "2.2rem" }}>
            {sc >= 85 ? "🥇" : sc >= 60 ? "🏅" : "💪"}
          </Box>
        )}

        {/* Scene panel */}
        <Box
          sx={{
            width: "100%", height: 200, borderRadius: 6,
            background: `linear-gradient(135deg,${item.gradientFrom},${item.gradientTo})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          }}
        >
          <Box sx={{ fontSize: "6rem", filter: "drop-shadow(2px 4px 10px rgba(0,0,0,0.2))" }}>
            {item.emoji}
          </Box>
          <Box sx={{ position: "absolute", top: 12, left: 14, fontSize: "1.8rem", opacity: 0.7 }}>
            {item.icon}
          </Box>
        </Box>

        {/* Phrase */}
        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
          {item.phrase.split(" ").map((w, wi) => (
            <Typography
              key={wi}
              sx={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: "2rem",
                color: ["#e74c3c","#3498db","#27ae60","#9b59b6"][wi % 4],
              }}
            >
              {w}
            </Typography>
          ))}
        </Stack>

        <FeedbackBadge score={sc ?? null} />

        <Button
          variant="contained"
          onClick={() => handleMic(side)}
          sx={{
            background: listening === side
              ? "linear-gradient(135deg,#ff6b6b,#ee5a24)"
              : "linear-gradient(135deg,#74b9ff,#0984e3)",
            fontFamily: "'Fredoka One', cursive",
            fontSize: "1.2rem",
            px: 4, py: 1.6,
            borderRadius: 8,
            animation: listening === side ? "pulse 1.2s ease infinite" : "none",
          }}
        >
          {listening === side ? "🔴 Listening…" : `🎙️ ${sc ? "Try Again" : "Tap to Say"}`}
        </Button>
      </Paper>
    );
  };

  return (
    <Box sx={{ ...BG_STYLE, display: "flex" }}>
      <SideNav
        current="modules"
        onChange={(id) => {
          if (id === "home") onNavigate("landing");
          else onNavigate(id);
        }}
      />

      <Box
        sx={{
          flex: 1, ml: "100px",
          display: "flex", flexDirection: "column",
          alignItems: "center", px: 3, py: 3,
        }}
      >
        {/* Header */}
        <Stack
          direction="row" justifyContent="space-between" alignItems="center"
          sx={{ width: "100%", maxWidth: 820, mb: 2 }}
        >
          <Button
            variant="outlined"
            onClick={() => onNavigate("modules")}
            sx={{
              borderRadius: 8, borderColor: "rgba(0,0,0,0.15)",
              color: "#555", fontFamily: "'Nunito', sans-serif",
              fontWeight: 800, fontSize: "1rem",
              background: "rgba(255,255,255,0.75)",
              px: 3, py: 1.2,
            }}
          >
            ← Back
          </Button>
          <ChachaLogo height={52} align="center" />
          <SettingsIcon sx={{ color: "#bbb", fontSize: "2rem", cursor: "pointer" }} />
        </Stack>

        <Typography
          sx={{
            fontFamily: "'Nunito', sans-serif", fontWeight: 900,
            color: "#444", fontSize: "1.4rem", mb: 2,
          }}
        >
          Module 2: TWO WORD FUN
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: "2rem" }}>🏝️</Typography>
          <StarBar filled={3} total={6} size="1.8rem" />
          <Typography sx={{ fontSize: "1.8rem" }}>🦎</Typography>
        </Stack>

        {/* Two phrase cards */}
        <Stack
          direction="row" spacing={3} flexWrap="wrap" justifyContent="center"
          sx={{ width: "100%", maxWidth: 820, flex: 1, alignItems: "center" }}
        >
          <PhraseCard item={left}  side="left"  />
          <PhraseCard item={right} side="right" />
        </Stack>

        {Object.keys(scores).length === 2 && (
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon sx={{ fontSize: "1.5rem" }} />}
            onClick={handleNext}
            sx={{
              mt: 4,
              background: "linear-gradient(135deg,#feca57,#ff9f43)",
              fontFamily: "'Fredoka One', cursive",
              fontSize: "1.4rem",
              px: 6, py: 1.8,
              borderRadius: 9,
              boxShadow: "0 6px 20px rgba(255,159,67,0.45)",
            }}
          >
            Next Pair
          </Button>
        )}
      </Box>
    </Box>
  );
}
