import { Button, Typography } from "@mui/material";
import MicIcon               from "@mui/icons-material/Mic";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export default function MicButton({ onClick, listening = false, size = "lg" }) {
  const isLg = size === "lg";
  return (
    <Button
      onClick={onClick}
      variant="contained"
      startIcon={
        listening
          ? <RadioButtonCheckedIcon sx={{ fontSize: isLg ? "1.8rem" : "1.3rem", color: "#fff" }} />
          : <MicIcon               sx={{ fontSize: isLg ? "2rem"   : "1.5rem", color: "#fff" }} />
      }
      sx={{
        px: isLg ? 6 : 4,
        py: isLg ? 2.2 : 1.6,
        borderRadius: 10,
        background: listening
          ? "linear-gradient(135deg,#ff6b6b,#ee5a24)"
          : "linear-gradient(135deg,#f6d365,#fda085)",
        color: "#fff",
        fontFamily: "'Fredoka One', cursive",
        fontSize: isLg ? "1.3rem" : "1rem",
        boxShadow: listening
          ? "0 0 0 0 rgba(255,107,107,0.5)"
          : "0 6px 22px rgba(253,160,133,0.55)",
        transform: listening ? "scale(1.04)" : "scale(1)",
        transition: "all 0.2s ease",
        animation: listening ? "pulse 1.2s ease infinite" : "none",
        "&:hover": {
          background: listening
            ? "linear-gradient(135deg,#ff5252,#d84315)"
            : "linear-gradient(135deg,#feca57,#ff9f43)",
          transform: "scale(1.06)",
          boxShadow: "0 8px 28px rgba(253,160,133,0.7)",
        },
      }}
    >
      <Typography sx={{ fontFamily: "'Fredoka One', cursive", fontSize: isLg ? "1.2rem" : "1rem", color: "#fff" }}>
        {listening ? "Listening…" : "Tap to Speak"}
      </Typography>
    </Button>
  );
}
