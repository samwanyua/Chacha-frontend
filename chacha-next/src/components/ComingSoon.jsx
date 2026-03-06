import { Box, Button, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import SideNav          from "./SideNav";
import { BG_STYLE }     from "../constants/theme";

export default function ComingSoon({ title, onNavigate }) {
  return (
    <Box sx={{ ...BG_STYLE, display: "flex" }}>
      <SideNav
        current=""
        onChange={(id) => {
          if (id === "home") onNavigate("landing");
          else onNavigate(id);
        }}
      />
      <Box
        sx={{
          flex: 1, ml: "100px",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 4,
        }}
      >
        <ConstructionIcon sx={{ fontSize: "6rem", color: "#f9a825" }} />
        <Typography
          sx={{ fontFamily: "var(--font-fredoka), 'Fredoka One', cursive", fontSize: "3rem", color: "#555" }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontSize: "1.3rem", color: "#999" }}
        >
          Coming soon — stay tuned! 🚀
        </Typography>
        <Button
          variant="contained"
          onClick={() => onNavigate("landing")}
          sx={{
            background: "linear-gradient(135deg,#74b9ff,#0984e3)",
            fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
            fontSize: "1.3rem",
            px: 5, py: 1.8, borderRadius: 8,
          }}
        >
          ← Go Home
        </Button>
      </Box>
    </Box>
  );
}
