import { useState, useRef, useEffect } from "react";
import { Box, Button, Paper, Typography, Stack, IconButton, CircularProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SettingsIcon     from "@mui/icons-material/Settings";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ChameleonMascot  from "../components/ChameleonMascot";
import StarBar          from "../components/StarBar";
import FeedbackBadge    from "../components/FeedbackBadge";
import SideNav          from "../components/SideNav";
import ChachaLogo       from "../components/ChachaLogo";
import { BG_STYLE }     from "../constants/theme";
import { MODULE2_PAIRS } from "../constants/data";
import { useSpeech }     from "../hooks/useSpeech";

export default function Module2({ onNavigate }) {
  const [pairIdx, setPairIdx] = useState(0);
  const [listening, setListening] = useState(null);
  const [scores, setScores] = useState({});
  const [evaluating, setEvaluating] = useState(null);
  const [transcriptions, setTranscriptions] = useState({});
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
    setCompleted(JSON.parse(localStorage.getItem(`chacha_mod2_${uid}`) || "[]"));
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const markCompleted = (text) => {
    const uid = getUserId();
    const saved = JSON.parse(localStorage.getItem(`chacha_mod2_${uid}`) || "[]");
    if (!saved.includes(text)) {
      const next = [...saved, text];
      localStorage.setItem(`chacha_mod2_${uid}`, JSON.stringify(next));
      setCompleted(next);
    }
  };

  const left = MODULE2_PAIRS[pairIdx];
  const right = MODULE2_PAIRS[(pairIdx + 1) % MODULE2_PAIRS.length];

  const handleScore = (which, item, s) => {
    setScores((prev) => ({ ...prev, [which]: s }));
    if (s >= 60) markCompleted(item.phrase);
  };

  const handleMic = async (which) => {
    const item = which === "left" ? left : right;

    if (listening === which && isRecording) {
      clearTimeout(timeoutRef.current);
      setEvaluating(which);
      try {
        const result = await stopRecordingAndEvaluate(item.phrase);
        const s = result.evaluation?.accuracy || 0;
        setTranscriptions((prev) => ({ ...prev, [which]: result.transcription || "" }));
        handleScore(which, item, s);
      } catch (err) {
        console.error(err);
        setScores((prev) => ({ ...prev, [which]: 0 }));
      } finally {
        setListening(null);
        setEvaluating(null);
      }
    } else if (listening !== null) {
      return; // Already listening to the other side
    } else {
      startRecording();
      setListening(which);
      setTranscriptions((prev) => ({ ...prev, [which]: "" }));
      timeoutRef.current = setTimeout(async () => {
        setEvaluating(which);
        try {
          const result = await stopRecordingAndEvaluate(item.phrase);
          const s = result.evaluation?.accuracy || 0;
          setTranscriptions((prev) => ({ ...prev, [which]: result.transcription || "" }));
          handleScore(which, item, s);
        } catch (e) {
          console.error(e);
          setScores((prev) => ({ ...prev, [which]: 0 }));
        } finally {
          setListening(null);
          setEvaluating(null);
        }
      }, 60000); // 1 minute max
    }
  };

  const handleNext = () => {
    setPairIdx((i) => (i + 2) % MODULE2_PAIRS.length);
    setScores({});
    setTranscriptions({});
  };

  const PhraseCard = ({ item, side }) => {
    const sc = scores[side];
    const transcription = transcriptions[side];
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

        {/* Phrase + Play Button */}
        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" alignItems="center">
          {item.phrase.split(" ").map((w, wi) => (
            <Typography
              key={wi}
              sx={{
                fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                fontSize: "2rem",
                color: ["#e74c3c","#3498db","#27ae60","#9b59b6"][wi % 4],
              }}
            >
              {w}
            </Typography>
          ))}
          <IconButton 
            onClick={() => playTTS(item.phrase)}
            disabled={isPlaying}
            sx={{ color: '#444', bgcolor: 'rgba(0,0,0,0.05)', ml: 1 }}
          >
            <PlayCircleFilledIcon sx={{ fontSize: "2.2rem" }} />
          </IconButton>
        </Stack>

        {/* Show Transcription */}
        {transcription && listening !== side && evaluating !== side && (
          <Box sx={{ 
            bgcolor: 'rgba(0,0,0,0.03)', 
            borderRadius: 2, 
            px: 2, 
            py: 1,
            mb: 1
          }}>
            <Typography sx={{ fontFamily: "var(--font-nunito)", fontSize: "0.9rem", color: "#666", textAlign: 'center' }}>
              You said: <br/>
              <strong style={{ color: '#444' }}>"{transcription}"</strong>
            </Typography>
          </Box>
        )}

        <FeedbackBadge score={sc ?? null} />

        {evaluating === side ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={30} />
            <Typography sx={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "0.9rem", color: "#666" }}>
              Evaluating...
            </Typography>
          </Box>
        ) : (
          <Button
            variant="contained"
            onClick={() => handleMic(side)}
            sx={{
              background: listening === side
                ? "#e74c3c" // Solid red while recording
                : side === 'left' ? "linear-gradient(135deg,#ff6b6b,#ee5a24)" : "linear-gradient(135deg,#74b9ff,#0984e3)", 
              color: listening === side ? "#fff" : "#444",
              fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
              fontSize: "1.2rem",
              px: 4, py: 1.6,
              borderRadius: 8,
              animation: listening === side ? "pulse 1.2s ease infinite" : "none",
            }}
          >
            {listening === side ? "🔴 Stop Recording" : `🎙️ ${sc ? "Try Again" : "Tap to Say"}`}
          </Button>
        )}
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
          flex: 1, ml: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", px: 3, pt: 3, pb: 4,
          position: "relative",
        }}
      >
        {/* Header */}
        <Stack
          direction="row" justifyContent="space-between" alignItems="center"
          sx={{ width: "100%", maxWidth: 860, mb: 5, position: "relative" }}
        >
          <Stack spacing={-0.5} sx={{ zIndex: 1 }}>
            <Typography sx={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "1.1rem", color: "#333" }}>
              Module 2:
            </Typography>
            <Typography sx={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "1.35rem", color: "#000" }}>
              TWO WORD FUN
            </Typography>
          </Stack>
          
          <Box sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
            <ChachaLogo height={64} align="center" />
          </Box>

          <Box sx={{
             background: "rgba(255,255,255,0.7)", borderRadius: "50%", p: 1.5, zIndex: 1,
             display: "flex", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", cursor: "pointer",
             "&:hover": { background: "white" }
          }}>
             <SettingsIcon sx={{ color: "#9e9e9e", fontSize: "1.8rem" }} />
          </Box>
        </Stack>

        {/* Progress header board equivalent */}
        <Box sx={{ width: "100%", maxWidth: 820, position: "relative", mt: 2, mb: 1 }}>
           <Stack direction="row" alignItems="center" sx={{
              background: "#4facfe", borderRadius: "100px 100px 0 0", px: 4, pt: 2, pb: 4, mb: -3,
              boxShadow: "inset 0 4px 12px rgba(255,255,255,0.4)"
           }}>
              <Box sx={{
                 width: 50, height: 50, borderRadius: '50%', background: '#4facfe', border: '3px solid white',
                 display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', mr: 2
              }}>
                 <Typography sx={{ fontSize: "1.6rem" }}>🏝️</Typography>
              </Box>
              <StarBar filled={completed.length} total={MODULE2_PAIRS.length} size="1.8rem" />
           </Stack>
           
           <Box sx={{ position: "absolute", right: -20, top: -45, zIndex: 5 }}>
              <ChameleonMascot size={120} animation="wave" />
           </Box>
        </Box>

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
              fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
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
