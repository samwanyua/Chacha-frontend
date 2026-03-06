import { Box, Typography, Stack, Paper } from "@mui/material";
import ChachaLogo from "../components/ChachaLogo";
import { BG_STYLE } from "../constants/theme";
import SideNav from "../components/SideNav";

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
              fontFamily: "'Fredoka One', cursive",
              fontSize: "clamp(2.5rem,5vw,3.5rem)",
              textAlign: "center",
            }}
          >
            How To Use Chacha
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              fontSize: "1.1rem",
              color: "#555",
            }}
          >
            A simple guide for parents, teachers, and children to practice speaking with Chacha.
          </Typography>

          {/* STEP 1 */}
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h5" fontWeight={800} mb={2}>
               1. Choose a Learning Module
            </Typography>

            <Typography>
              Start by selecting a speech module based on the child's learning level.
            </Typography>

            <Stack mt={2} spacing={1}>
              <Typography>⭐ Module 1 – Single Word Practice</Typography>
              <Typography>🚀 Module 2 – Two Word Phrases</Typography>
              <Typography>🌍 Module 3 – Full Sentence Practice</Typography>
            </Stack>
          </Paper>

          {/* STEP 2 */}
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h5" fontWeight={800} mb={2}>
              2. Press the Microphone
            </Typography>

            <Typography>
              When the activity begins, press the microphone button and let the child say
              the word or sentence shown on the screen.
            </Typography>

            <Typography mt={2}>
              Speak clearly and at a normal pace for the best results.
            </Typography>
          </Paper>

          {/* STEP 3 */}
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h5" fontWeight={800} mb={2}>
              3. Chacha Listens and Analyzes
            </Typography>

            <Typography>
              Chacha uses AI speech recognition to listen to the child's pronunciation.
            </Typography>

            <Typography mt={2}>
              The system checks how closely the spoken words match the expected pronunciation.
            </Typography>
          </Paper>

          {/* STEP 4 */}
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h5" fontWeight={800} mb={2}>
              4. Get Friendly Feedback
            </Typography>

            <Typography>
              After speaking, Chacha gives immediate feedback to encourage the child.
            </Typography>

            <Stack mt={2} spacing={1}>
              <Typography>⭐ Correct pronunciation earns stars</Typography>
              <Typography>🔁 If needed, the child can try again</Typography>
              <Typography>🎉 Positive encouragement builds confidence</Typography>
            </Stack>
          </Paper>

          {/* STEP 5 */}
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h5" fontWeight={800} mb={2}>
              5. Track Progress
            </Typography>

            <Typography>
              Parents and teachers can view progress to see how the child improves over time.
            </Typography>

            <Typography mt={2}>
              Chacha tracks pronunciation accuracy, practice sessions, and completed activities.
            </Typography>
          </Paper>

        </Stack>
      </Box>
    </>
  );
}
