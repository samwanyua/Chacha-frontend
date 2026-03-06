import { IconButton, Box } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

const waves = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" fill="white"/>
    <path d="M19 12C19 15.866 15.866 19 12 19V21C16.9706 21 21 16.9706 21 12H19Z" fill="white"/>
    <path d="M19 12C19 8.13401 15.866 5 12 5V3C16.9706 3 21 7.02944 21 12H19Z" fill="white"/>
    <path d="M5 12C5 8.13401 8.13401 5 12 5V3C7.02944 3 3 7.02944 3 12H5Z" fill="white"/>
    <path d="M5 12C5 15.866 8.13401 19 12 19V21C7.02944 21 3 16.9706 3 12H5Z" fill="white"/>
  </svg>
);

export default function MicButton({ onClick, listening = false, size = "lg", color = "yellow" }) {
  const isLg = size === "lg";
  
  const gradients = {
    yellow: "linear-gradient(180deg, #ffeb99 0%, #ffc107 100%)",
    green: "linear-gradient(180deg, #b9fbc0 0%, #68d391 100%)",
  };
  
  const hoverGradients = {
    yellow: "linear-gradient(180deg, #fff0b3 0%, #ffca28 100%)",
    green: "linear-gradient(180deg, #c6f6d5 0%, #56ab2f 100%)",
  };

  return (
    <IconButton
      onClick={onClick}
      disableRipple
      sx={{
        width: isLg ? 160 : 130,
        height: isLg ? 60 : 50,
        borderRadius: 40,
        background: gradients[color] || gradients.yellow,
        color: "#fff",
        boxShadow: "0px 6px 0px rgba(0,0,0,0.1), 0px 4px 12px rgba(0,0,0,0.2)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        transform: listening ? "scale(0.96) translateY(4px)" : "scale(1)",
        transition: "all 0.15s ease",
        animation: listening ? "pulse 1.2s ease infinite" : "none",
        "&:hover": {
          background: hoverGradients[color] || hoverGradients.yellow,
        },
        "&:active": {
          transform: "scale(0.96) translateY(4px)",
          boxShadow: "0px 2px 0px rgba(0,0,0,0.1), 0px 4px 8px rgba(0,0,0,0.2)",
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', ml: -1.5 }}>
        <svg width={isLg ? "24" : "18"} height={isLg ? "24" : "18"} viewBox="0 0 24 24" fill="none">
          <path d="M5 12C5 8.134 8.134 5 12 5V3C7.03 3 3 7.03 3 12H5ZM5 12C5 15.866 8.134 19 12 19V21C7.03 21 3 16.97 3 12H5Z" fill="white" opacity="0.6"/>
          <path d="M8 12C8 9.79 9.79 8 12 8V6C8.686 6 6 8.686 6 12H8ZM8 12C8 14.21 9.79 16 12 16V18C8.686 18 6 15.314 6 12H8Z" fill="white" opacity="0.8"/>
        </svg>
      </Box>
      <MicIcon sx={{ fontSize: isLg ? "2.2rem" : "1.6rem" }} />
      <Box sx={{ display: 'flex', alignItems: 'center', mr: -1.5 }}>
        <svg width={isLg ? "24" : "18"} height={isLg ? "24" : "18"} viewBox="0 0 24 24" fill="none">
          <path d="M19 12C19 8.134 15.866 5 12 5V3C16.97 3 21 7.03 21 12H19ZM19 12C19 15.866 15.866 19 12 19V21C16.97 21 21 16.97 21 12H19Z" fill="white" opacity="0.6"/>
          <path d="M16 12C16 9.79 14.21 8 12 8V6C15.314 6 18 8.686 18 12H16ZM16 12C16 14.21 14.21 16 12 16V18C15.314 18 18 15.314 18 12H16Z" fill="white" opacity="0.8"/>
        </svg>
      </Box>
    </IconButton>
  );
}
