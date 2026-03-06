import { useState, useRef, useEffect } from "react";
import { Box, Button, Paper, Typography, Stack, IconButton, CircularProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmojiEventsIcon  from "@mui/icons-material/EmojiEvents";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ChameleonMascot  from "../components/ChameleonMascot";
import StarBar          from "../components/StarBar";
import ProgressDots     from "../components/ProgressDots";
import MicButton        from "../components/MicButton";
import FeedbackBadge    from "../components/FeedbackBadge";
import SideNav          from "../components/SideNav";
import { BG_STYLE }     from "../constants/theme";
import { MODULE1_WORDS } from "../constants/data";
import { useSpeech }     from "../hooks/useSpeech";

export default function Module1({ onNavigate }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [score, setScore] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [completed, setCompleted] = useState([]);
  const timeoutRef = useRef(null);

  const { isRecording, isPlaying, playTTS, startRecording, stopRecordingAndEvaluate } = useSpeech();

  const getUserId = () => {
    try {
      const u = JSON.parse(localStorage.getItem("chacha_user"));
      return u?.user_id || u?.id || 1;
    } catch { return 1; }
  };

  useEffect(() => {
    const uid = getUserId();
    setCompleted(JSON.parse(localStorage.getItem(`chacha_mod1_${uid}`) || "[]"));
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const markCompleted = (text) => {
    const uid = getUserId();
    const saved = JSON.parse(localStorage.getItem(`chacha_mod1_${uid}`) || "[]");
    if (!saved.includes(text)) {
      const next = [...saved, text];
      localStorage.setItem(`chacha_mod1_${uid}`, JSON.stringify(next));
      setCompleted(next);
    }
  };

  const word = MODULE1_WORDS[wordIdx];
  const stars = completed.length;

  const handleScore = (s) => {
    setScore(s);
    if (s >= 60) markCompleted(word.word);
  };

  const handleMic = async () => {
    if (isRecording) {
      clearTimeout(timeoutRef.current);
      setEvaluating(true);
      try {
        const result = await stopRecordingAndEvaluate(word.word);
        const s = result.evaluation?.accuracy || 0;
        setTranscription(result.transcription || "");
        handleScore(s);
      } catch (err) {
        console.error(err);
        setScore(0);
      } finally {
        setEvaluating(false);
      }
    } else {
      startRecording();
      setScore(null);
      setTranscription("");
      timeoutRef.current = setTimeout(async () => {
        setEvaluating(true);
        try {
          const result = await stopRecordingAndEvaluate(word.word);
          const s = result.evaluation?.accuracy || 0;
          setTranscription(result.transcription || "");
          handleScore(s);
        } catch (e) {
          console.error(e);
          setScore(0);
        } finally {
          setEvaluating(false);
        }
      }, 60000); // 1 minute max
    }
  };

  const handleNext = () => {
    setWordIdx((i) => (i + 1) % MODULE1_WORDS.length);
    setScore(null);
    setTranscription("");
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
          flex: 1, ml: 0,
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

          <Stack direction="row" spacing={2} alignItems="center">
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

            <IconButton 
              onClick={() => playTTS(word.word)}
              disabled={isPlaying}
              sx={{ 
                color: word.color, 
                bgcolor: `${word.color}22`,
                '&:hover': { bgcolor: `${word.color}44` }
              }}
            >
              <PlayCircleFilledIcon sx={{ fontSize: "3rem" }} />
            </IconButton>
          </Stack>

          {/* Display Transcription */}
          {transcription && !isRecording && !evaluating && (
            <Box sx={{ 
              bgcolor: 'rgba(0,0,0,0.03)', 
              borderRadius: 3, 
              px: 3, 
              py: 1.5,
              mb: 1
            }}>
              <Typography sx={{ fontFamily: "var(--font-nunito)", fontSize: "1rem", color: "#666", textAlign: 'center' }}>
                You said: <br/>
                <strong style={{ color: '#444', fontSize: '1.2rem' }}>"{transcription}"</strong>
              </Typography>
            </Box>
          )}

          <FeedbackBadge score={score} />

          {evaluating ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={50} sx={{ color: word.color }} />
              <Typography sx={{ fontFamily: "var(--font-nunito)", fontWeight: 700, color: "#666" }}>
                Checking Pronunciation...
              </Typography>
            </Box>
          ) : (
            <MicButton onClick={handleMic} listening={isRecording} size="lg" color={isRecording ? "error" : "primary"} />
          )}

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
