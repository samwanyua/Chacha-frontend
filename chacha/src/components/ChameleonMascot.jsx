import { Box } from "@mui/material";
import mascotSrc from "../assets/chameleon-mascot.png";

/**
 * ChameleonMascot
 * Shows the actual Chacha chameleon image.
 * @param {number} size      - width/height in px (default 120)
 * @param {"float"|"wave"|""} animation
 */
export default function ChameleonMascot({ size = 120, animation = "float" }) {
  return (
    <Box
      component="img"
      src={mascotSrc}
      alt="Chacha mascot"
      className={animation}
      sx={{
        width: size,
        height: size,
        objectFit: "contain",
        filter: "drop-shadow(3px 6px 10px rgba(0,0,0,0.18))",
      }}
    />
  );
}
