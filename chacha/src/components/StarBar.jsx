import { Box } from "@mui/material";

/**
 * StarBar
 * Displays a row of ⭐ icons where `filled` are bright and the rest are greyed.
 * @param {number} filled - number of filled stars
 * @param {number} total  - total stars
 * @param {string} size   - font-size for each star (default "1.4rem")
 */
export default function StarBar({ filled = 3, total = 5, size = "1.4rem" }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      {Array.from({ length: total }).map((_, i) => (
        <Box
          key={i}
          component="span"
          sx={{
            fontSize: size,
            filter: i < filled ? "none" : "grayscale(1) opacity(0.35)",
            transition: "filter 0.3s ease",
          }}
        >
          ⭐
        </Box>
      ))}
    </Box>
  );
}
