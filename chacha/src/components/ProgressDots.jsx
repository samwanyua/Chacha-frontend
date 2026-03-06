import { Box } from "@mui/material";

/**
 * ProgressDots
 * Renders a row of coloured dots tracking progress.
 * @param {number} filled - number of completed dots
 * @param {number} total  - total dots
 */
export default function ProgressDots({ filled = 9, total = 12 }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <Box
          key={i}
          sx={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: i < filled ? "#f9a825" : "#c5c5e8",
            transition: "background 0.3s ease",
          }}
        />
      ))}
    </Box>
  );
}
