import { useState } from "react";
import { Box, Button, Paper, Typography, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChameleonMascot  from "../components/ChameleonMascot";
import StarBar          from "../components/StarBar";
import FeedbackBadge    from "../components/FeedbackBadge";
import SideNav          from "../components/SideNav";
import { BG_STYLE }     from "../constants/theme";
import { MODULE3_SENTENCES, WORD_COLORS } from "../constants/data";

export default function Module3({ onNavigate }) {
  const [sentIdx,   setSentIdx]   = useState(0);
  const [listening, setListening] = useState(false);
  const [score,     setScore]     = useState(null);
  const [stars,     setStars]     = useState(3);

  const sent = MODULE3_SENTENCES[sentIdx];

  const handleMic = () => {
    if (listening) return;
    setListening(true);
    setScore(null);
    setTimeout(() => {
      const s = Math.floor(Math.random() * 35) + 65;
      setScore(s);
      setListening(false);
      if (s >= 70) setStars((p) => Math.min(5, p + 1));
    }, 2500);
  };

  const handleNext = () => {
    setSentIdx((i) => (i + 1) % MODULE3_SENTENCES.length);
    setScore(null);
  };

  const words = sent.sentence.split(" ");

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
          sx={{ width: "100%", maxWidth: 820, mb: 3 }}
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
          <Typography
            sx={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 900,
              fontSize: "1.3rem", color: "#444",
            }}
          >
            Module 3: SENTENCE SAFARI
          </Typography>
          <Typography sx={{ fontSize: "2rem" }}>🌍</Typography>
        </Stack>

        {/* Star progress */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: "2.4rem" }}>🏝️</Typography>
          <StarBar filled={stars} total={5} size="2rem" />
        </Stack>

        {/* Mascot fixed right */}
        <Box
          sx={{
            position: "fixed", right: 28, top: "50%",
            transform: "translateY(-50%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 2, zIndex: 10,
          }}
        >
          <ChameleonMascot size={110} animation="wave" />
          <Typography sx={{ fontSize: "2rem" }}>🏅</Typography>
          <Typography sx={{ fontSize: "2rem" }}>🎖️</Typography>
        </Box>

        {/* ── Main card ── */}
        <Paper
          elevation={5}
          sx={{
            borderRadius: 8, p: 4,
            width: "100%", maxWidth: 760,
            display: "flex", gap: 4, alignItems: "stretch",
          }}
        >
          {/* Scene panel */}
          <Box
            sx={{
              width: 250, flexShrink: 0, borderRadius: 6,
              background: `linear-gradient(135deg,${sent.color}33,${sent.color}88)`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 2, p: 2,
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <Box
              className="float"
              sx={{ fontSize: "7rem", filter: "drop-shadow(3px 6px 12px rgba(0,0,0,0.2))" }}
            >
              {sent.emoji}
            </Box>
            <Stack direction="row" spacing={0.5}>
              {sent.scene.match(/\p{Emoji}/gu)?.map((e, i) => (
                <Typography key={i} sx={{ fontSize: "1.8rem" }}>{e}</Typography>
              ))}
            </Stack>
          </Box>

          {/* Text + controls */}
          <Stack flex={1} justifyContent="space-between" spacing={3}>
            {/* Rainbow sentence */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center" }}>
              {words.map((w, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontFamily: "'Fredoka One', cursive",
                    fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                    color: WORD_COLORS[i % WORD_COLORS.length],
                    lineHeight: 1.25,
                  }}
                >
                  {w}
                </Typography>
              ))}
            </Box>

            <FeedbackBadge score={score} />

            <Stack spacing={2} alignItems="flex-start">
              <Button
                variant="contained"
                onClick={handleMic}
                sx={{
                  background: listening
                    ? "linear-gradient(135deg,#ff6b6b,#ee5a24)"
                    : "linear-gradient(135deg,#55efc4,#00b894)",
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: "1.3rem", px: 5, py: 1.8,
                  borderRadius: 8,
                  animation: listening ? "pulse 1.2s ease infinite" : "none",
                }}
              >
                {listening ? "🔴 Listening…" : "🎙️ Say the Sentence"}
              </Button>

              {score !== null && (
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: "1.4rem" }} />}
                  onClick={handleNext}
                  sx={{
                    background: "linear-gradient(135deg,#a29bfe,#6c5ce7)",
                    fontFamily: "'Fredoka One', cursive",
                    fontSize: "1.2rem", px: 4, py: 1.6,
                    borderRadius: 8,
                    boxShadow: "0 4px 16px rgba(108,92,231,0.35)",
                  }}
                >
                  Next Sentence
                </Button>
              )}
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
