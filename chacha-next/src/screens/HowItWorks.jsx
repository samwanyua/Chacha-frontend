import { Box, Typography, Stack, Paper } from "@mui/material";
import ChachaLogo from "../components/ChachaLogo";
import ChameleonMascot from "../components/ChameleonMascot";
import { BG_STYLE } from "../constants/theme";
import SideNav from "../components/SideNav";
import { Button } from "@mui/material";

export default function HowItWorks({ onNavigate }) {
  return (
    <>
      {/* Sidebar */}
      <SideNav
        current="guide"
        onChange={(id) => {
          if (id === "home") onNavigate("landing");
          if (id === "modules") onNavigate("modules");
          if (id === "progress") onNavigate("progress");
        }}
      />

      {/* Page Content */}
      <Box
        sx={{
          ...BG_STYLE,
          minHeight: "100vh",
          pl: 14, // important so content doesn't go under sidebar
          px: { xs: 3, md: 10 },
          py: 6,
        }}
      >
        <Stack spacing={5} maxWidth={900} mx="auto">

          {/* Logo should go home */}
          <Box sx={{ cursor: "pointer" }} onClick={() => onNavigate("landing")}>
            <ChachaLogo height={60} />
          </Box>

            <Typography
              sx={{
                fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                textAlign: "center",
                color: "#2d3436",
                textShadow: "2px 2px 0px #fff, 4px 4px 0px rgba(0,0,0,0.1)",
                mb: -2
              }}
            >
              Adventure Guide! 🗺️
            </Typography>

            <Typography
              sx={{
                textAlign: "center",
                fontSize: "1.3rem",
                color: "#636e72",
                fontFamily: "var(--font-nunito), sans-serif",
                fontWeight: 700,
                maxWidth: 600,
                mx: "auto"
              }}
            >
              Follow these simple steps to start your speaking journey with Chacha!
            </Typography>

            {/* STEP 1 */}
            <Paper 
              elevation={4}
              sx={{ 
                p: 5, 
                borderRadius: 8, 
                borderLeft: "12px solid #ffca28",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                position: "relative",
                overflow: "visible",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.02)" }
              }}
            >
              <Box sx={{ position: "absolute", right: -40, top: -30, display: { xs: "none", md: "block" } }}>
                <ChameleonMascot size={100} animation="float" />
              </Box>
              <Typography 
                sx={{ 
                  fontFamily: "var(--font-fredoka), cursive", 
                  fontSize: "1.8rem", 
                  color: "#f57c00", 
                  mb: 2 
                }}
              >
                 1. Choose an Adventure
              </Typography>
              <Typography sx={{ fontSize: "1.1rem", color: "#444", fontWeight: 600 }}>
                Pick a level that feels right for you!
              </Typography>
              <Stack mt={3} spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, borderRadius: 4, bgcolor: "#fff9c4" }}>
                  <Typography sx={{ fontSize: "1.5rem" }}>🐱</Typography>
                  <Typography sx={{ fontWeight: 800 }}>Level 1: One-Word Fun</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, borderRadius: 4, bgcolor: "#e3f2fd" }}>
                  <Typography sx={{ fontSize: "1.5rem" }}>🐶</Typography>
                  <Typography sx={{ fontWeight: 800 }}>Level 2: Two-Word Pairs</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, borderRadius: 4, bgcolor: "#e8f5e9" }}>
                  <Typography sx={{ fontSize: "1.5rem" }}>🐒</Typography>
                  <Typography sx={{ fontWeight: 800 }}>Level 3: Sentence Safari</Typography>
                </Box>
              </Stack>
            </Paper>

            {/* STEP 2 */}
            <Paper 
              elevation={4}
              sx={{ 
                p: 5, 
                borderRadius: 8, 
                borderLeft: "12px solid #42a5f5",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.02)" }
              }}
            >
              <Typography 
                sx={{ 
                  fontFamily: "var(--font-fredoka), cursive", 
                  fontSize: "1.8rem", 
                  color: "#1976d2", 
                  mb: 2 
                }}
              >
                2. Tap the Magic Mic! 🎤
              </Typography>
              <Typography sx={{ fontSize: "1.1rem", color: "#444", fontWeight: 600 }}>
                Press the big colorful microphone and say the words you see on the screen.
              </Typography>
              <Typography sx={{ mt: 2, p: 2, borderRadius: 4, bgcolor: "#f3e5f5", color: "#7b1fa2", fontWeight: 800, textAlign: "center" }}>
                Tip: Speak out loud like a brave lion! 🦁
              </Typography>
            </Paper>

            {/* STEP 3 */}
            <Paper 
              elevation={4}
              sx={{ 
                p: 5, 
                borderRadius: 8, 
                borderLeft: "12px solid #43a047",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                position: "relative",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.02)" }
              }}
            >
              <Box sx={{ position: "absolute", left: -60, bottom: -20, display: { xs: "none", md: "block" }, transform: "scaleX(-1)" }}>
                <ChameleonMascot size={110} animation="peek" />
              </Box>
              <Typography 
                sx={{ 
                  fontFamily: "var(--font-fredoka), cursive", 
                  fontSize: "1.8rem", 
                  color: "#2e7d32", 
                  mb: 2 
                }}
              >
                3. Chacha Listens 🦎
              </Typography>
              <Typography sx={{ fontSize: "1.1rem", color: "#444", fontWeight: 600 }}>
                Chacha uses magic ears (AI!) to hear how you say your words.
              </Typography>
              <Typography sx={{ mt: 2, color: "#666" }}>
                Our friendly chamaeleon friend works hard to understand exactly what you say!
              </Typography>
            </Paper>

            {/* STEP 4 */}
            <Paper 
              elevation={4}
              sx={{ 
                p: 5, 
                borderRadius: 8, 
                borderLeft: "12px solid #ff7043",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.02)" }
              }}
            >
              <Typography 
                sx={{ 
                  fontFamily: "var(--font-fredoka), cursive", 
                  fontSize: "1.8rem", 
                  color: "#d84315", 
                  mb: 2 
                }}
              >
                4. Win Shiny Stars! ⭐
              </Typography>
              <Typography sx={{ fontSize: "1.1rem", color: "#444", fontWeight: 600 }}>
                The better you speak, the more stars you collect!
              </Typography>
              <Stack direction="row" mt={3} spacing={2} justifyContent="center" flexWrap="wrap">
                <Box sx={{ textAlign: "center", p: 2, borderRadius: 4, bgcolor: "#fff3e0", border: "2px solid #ffb74d" }}>
                  <Typography sx={{ fontSize: "2rem" }}>🏆</Typography>
                  <Typography sx={{ fontWeight: 800 }}>Excellent!</Typography>
                </Box>
                <Box sx={{ textAlign: "center", p: 2, borderRadius: 4, bgcolor: "#f1f8e9", border: "2px solid #81c784" }}>
                  <Typography sx={{ fontSize: "2rem" }}>👍</Typography>
                  <Typography sx={{ fontWeight: 800 }}>Good Job!</Typography>
                </Box>
                <Box sx={{ textAlign: "center", p: 2, borderRadius: 4, bgcolor: "#fce4ec", border: "2px solid #f06292" }}>
                  <Typography sx={{ fontSize: "2rem" }}>💪</Typography>
                  <Typography sx={{ fontWeight: 800 }}>Try Again!</Typography>
                </Box>
              </Stack>
            </Paper>

            {/* STEP 5 */}
            <Paper 
              elevation={4}
              sx={{ 
                p: 5, 
                borderRadius: 8, 
                borderLeft: "12px solid #ba68c8",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.02)" }
              }}
            >
              <Typography 
                sx={{ 
                  fontFamily: "var(--font-fredoka), cursive", 
                  fontSize: "1.8rem", 
                  color: "#7b1fa2", 
                  mb: 2 
                }}
              >
                5. Level Up! 🚀
              </Typography>
              <Typography sx={{ fontSize: "1.1rem", color: "#444", fontWeight: 600 }}>
                Keep practicing every day to unlock badges and move to higher levels.
              </Typography>
              <Typography sx={{ mt: 2, fontStyle: "italic", color: "#888" }}>
                You're becoming a speaking superstar!
              </Typography>
            </Paper>

            <Box sx={{ textAlign: "center", pt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => onNavigate("modules")}
                sx={{
                  background: "linear-gradient(135deg, #a29bfe, #6c5ce7)",
                  color: "white",
                  px: 8,
                  py: 2.5,
                  borderRadius: 6,
                  fontSize: "1.5rem",
                  fontFamily: "var(--font-fredoka), cursive",
                  boxShadow: "0 10px 30px rgba(108, 92, 231, 0.4)",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px) scale(1.05)",
                    boxShadow: "0 15px 40px rgba(108, 92, 231, 0.6)",
                  }
                }}
              >
                Start Playing! 🎮
              </Button>
            </Box>

        </Stack>
      </Box>
    </>
  );
}
