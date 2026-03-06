import { useState, useRef, useEffect } from "react";
import { Box, Button, Paper, Typography, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmojiEventsIcon  from "@mui/icons-material/EmojiEvents";
import ChameleonMascot  from "../components/ChameleonMascot";
import StarBar          from "../components/StarBar";
import ProgressDots     from "../components/ProgressDots";
import MicButton        from "../components/MicButton";
import FeedbackBadge    from "../components/FeedbackBadge";
import SideNav          from "../components/SideNav";
import { BG_STYLE }     from "../constants/theme";
import { MODULE1_WORDS } from "../constants/data";

export default function Module1({ onNavigate }) {
  const [wordIdx,   setWordIdx]   = useState(0);
  const [listening, setListening] = useState(false);
  const [score,     setScore]     = useState(null);
  const [stars,     setStars]     = useState(6);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const word = MODULE1_WORDS[wordIdx];

  const finishRecording = () => {
    clearTimeout(timeoutRef.current);
    const s = Math.floor(Math.random() * 40) + 60;
    setScore(s);
    setListening(false);
    if (s >= 60) setStars((p) => Math.min(12, p + 1));
  };

  const handleMic = () => {
    if (listening) {
      finishRecording();
    } else {
      setListening(true);
      setScore(null);
      timeoutRef.current = setTimeout(() => {
        finishRecording();
      }, 60000); // 1 minute max
    }
  };

  const handleNext = () => {
    setWordIdx((i) => (i + 1) % MODULE1_WORDS.length);
    setScore(null);
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

      {/* Main */}
      <Box
        sx={{
          flex: 1, ml: "100px",
          display: "flex", flexDirection: "column",
          alignItems: "center",
          px: 3, py: 3,
        }}
      >
        {/* Header row */}
        <Box sx={{ width: "100%", maxWidth: 680, position: "relative", mb: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900,
              fontSize: "1.35rem", color: "#222", mb: 2,
            }}
          >
            Module 1: One Word Adventure
          </Typography>
          
          <Box sx={{ position: "absolute", right: 0, top: -10 }}>
            <Box sx={{
               background: "#7b61ff", borderRadius: "50%", p: 1.2,
               display: "flex", boxShadow: "0 4px 12px rgba(123,97,255,0.3)", cursor: "pointer",
               "&:hover": { background: "#664de8" }
            }}>
               <EmojiEventsIcon sx={{ color: "white", fontSize: "1.5rem" }} />
            </Box>
          </Box>

          <Stack sx={{ width: "100%" }} spacing={1.5} alignItems="center">
            <ProgressDots filled={stars} total={12} />
            <StarBar filled={Math.ceil(stars / 3)} total={5} size="1.8rem" />
          </Stack>
        </Box>

        {/* Floating mascot */}
        <Box sx={{ position: "absolute", left: { xs: 10, md: 50 }, top: 50, zIndex: 10 }}>
          <ChameleonMascot size={150} animation="wave" />
        </Box>

        {/* ── Big central card ── */}
        <Paper
          elevation={5}
          sx={{
            borderRadius: 10,
            px: { xs: 4, sm: 8 },
            py: 6,
            width: "100%", maxWidth: 520,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 4,
            mt: 1,
          }}
        >
          {/* Emoji */}
          <Box
            className={score !== null && score >= 85 ? "celebrate" : "float"}
            sx={{ fontSize: "10rem", userSelect: "none", lineHeight: 1 }}
          >
            {word.emoji}
          </Box>

          {/* Word */}
          <Typography
            sx={{
              fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
              fontSize: "clamp(3.5rem,9vw,5rem)",
              color: word.color,
              WebkitTextStroke: "2px rgba(0,0,0,0.1)",
              textShadow: `4px 4px 0 ${word.color}33`,
              letterSpacing: 3,
            }}
          >
            {word.word}
          </Typography>

          <FeedbackBadge score={score} />

          <MicButton onClick={handleMic} listening={listening} size="lg" />

          {score !== null && (
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ fontSize: "1.4rem" }} />}
              onClick={handleNext}
              sx={{
                background: "linear-gradient(135deg,#a8edea,#fed6e3)",
                color: "#444",
                fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                fontSize: "1.3rem",
                px: 5, py: 1.6,
                borderRadius: 8,
              }}
            >
              Next Word
            </Button>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
