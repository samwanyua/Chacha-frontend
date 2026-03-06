import { Box, Typography } from "@mui/material";

export default function FeedbackBadge({ score }) {
  if (score === null || score === undefined) return null;
  const info =
    score >= 85 ? { emoji: "🌟", label: "Amazing!",    color: "#27ae60" } :
    score >= 60 ? { emoji: "👏", label: "Great Try!",   color: "#f9a825" } :
                  { emoji: "💪", label: "Keep Going!",  color: "#e53935" };
  return (
    <Box
      className="pop-in"
      sx={{
        display: "flex", alignItems: "center", gap: 1.5,
        px: 3.5, py: 1.8,
        borderRadius: 50,
        background: `${info.color}22`,
        border: `3px solid ${info.color}`,
      }}
    >
      <Typography sx={{ fontSize: "2rem", lineHeight: 1 }}>{info.emoji}</Typography>
      <Typography sx={{ fontFamily: "var(--font-fredoka), 'Fredoka One', cursive", fontSize: "1.3rem", color: info.color }}>
        {info.label}&nbsp;({score}%)
      </Typography>
    </Box>
  );
}
