import { useState, useRef, useEffect } from "react";
import { Box, Button, Paper, Typography, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChameleonMascot  from "../components/ChameleonMascot";
import StarBar          from "../components/StarBar";
import FeedbackBadge    from "../components/FeedbackBadge";
import SideNav          from "../components/SideNav";
import MicButton        from "../components/MicButton";
import ChachaLogo       from "../components/ChachaLogo";
import { BG_STYLE }     from "../constants/theme";
import { MODULE3_SENTENCES, WORD_COLORS } from "../constants/data";

export default function Module3({ onNavigate }) {
  const [sentIdx,   setSentIdx]   = useState(0);
  const [listening, setListening] = useState(false);
  const [score,     setScore]     = useState(null);
  const [stars,     setStars]     = useState(3);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const sent = MODULE3_SENTENCES[sentIdx];

  const finishRecording = () => {
    clearTimeout(timeoutRef.current);
    const s = Math.floor(Math.random() * 35) + 65;
    setScore(s);
    setListening(false);
    if (s >= 70) setStars((p) => Math.min(5, p + 1));
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
          direction="row" justifyContent="center" alignItems="center"
          sx={{ width: "100%", maxWidth: 820, mb: 3, position: "relative" }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 800,
              fontSize: "1.6rem", color: "#111",
            }}
          >
            Module 3: SENTENCE SAFARI
          </Typography>
          <Box sx={{ position: "absolute", right: 0 }}>
             <ChachaLogo height={45} align="right" />
          </Box>
        </Stack>

        {/* Star progress */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Box sx={{
             width: 60, height: 60, borderRadius: '50%', background: '#c8e6c9', border: '3px solid white',
             display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}>
             <Typography sx={{ fontSize: "2rem" }}>🏝️</Typography>
          </Box>
          <StarBar filled={stars} total={5} size="2rem" />
        </Stack>

        {/* Mascot fixed right */}
        <Box
          sx={{
            position: "fixed", right: -10, top: "50%",
            transform: "translateY(-50%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 2, zIndex: 10,
          }}
        >
          <ChameleonMascot size={150} animation="wave" />
          <Typography sx={{ fontSize: "2.5rem", WebkitFilter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>🎖️</Typography>
          <Typography sx={{ fontSize: "2.5rem", WebkitFilter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>🏅</Typography>
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
              background: `linear-gradient(135deg,${sent.color}33,${sent.color}99)`,
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
          <Stack flex={1} justifyContent="center" alignItems="center" spacing={4}>
            {/* Rainbow sentence */}
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 14px", alignItems: "center", mb: 2 }}>
              {words.map((w, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                    fontSize: "2.8rem",
                    color: WORD_COLORS[i % WORD_COLORS.length],
                    WebkitTextStroke: "1.5px rgba(0,0,0,0.4)",
                    textShadow: `3px 3px 0 rgba(0,0,0,0.1)`,
                    lineHeight: 1.1,
                  }}
                >
                  {w}
                </Typography>
              ))}
            </Box>

            <FeedbackBadge score={score} />

            <Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
              <MicButton onClick={handleMic} listening={listening} size="lg" color="green" />

              {score !== null && (
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: "1.4rem" }} />}
                  onClick={handleNext}
                  sx={{
                    background: "linear-gradient(135deg,#a29bfe,#6c5ce7)",
                    fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
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
