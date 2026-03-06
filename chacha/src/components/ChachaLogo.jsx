import { Box } from "@mui/material";
import logoSrc from "../assets/chacha-logo.png";

/**
 * ChachaLogo
 * Uses the actual uploaded Chacha brand image.
 * @param {number} height   - rendered height in px (default 48)
 * @param {"left"|"center"} align
 */
export default function ChachaLogo({ height = 48, align = "left" }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: align === "center" ? "center" : "flex-start",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={logoSrc}
        alt="Chacha logo"
        sx={{
          height,
          width: "auto",
          objectFit: "contain",
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.12))",
        }}
      />
    </Box>
  );
}
