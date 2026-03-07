import { useState, useEffect } from "react";
import { Box, Paper, Typography, Stack, LinearProgress, Chip } from "@mui/material";
import SideNav         from "../components/SideNav";
import ChameleonMascot from "../components/ChameleonMascot";
import StarBar         from "../components/StarBar";
import { BG_STYLE }    from "../constants/theme";
import { MODULE1_WORDS, MODULE2_PAIRS, MODULE3_SENTENCES } from "../constants/data";

// ── Mock module progress & badges (to be dynamic next update) ───────────────────

const MODULES = [
  {
    id: "module1",
    title: "ONE WORD ADVENTURE",
    icon: "⭐", animal: "🐱",
    color: "#f9a825", bg: "linear-gradient(135deg,#ffe082,#ffca28)",
    border: "#f9a825",
    progress: 0,       
    starsEarned: 0, starsTotal: MODULE1_WORDS.length,
    wordsLeft: MODULE1_WORDS.length,
  },
  {
    id: "module2",
    title: "TWO WORD FUN",
    icon: "🚀", animal: "🐶",
    color: "#1e88e5", bg: "linear-gradient(135deg,#90caf9,#42a5f5)",
    border: "#1e88e5",
    progress: 0,
    starsEarned: 0, starsTotal: MODULE2_PAIRS.length,
    wordsLeft: MODULE2_PAIRS.length,
  },
  {
    id: "module3",
    title: "SENTENCE SAFARI",
    icon: "🌍", animal: "🐒",
    color: "#43a047", bg: "linear-gradient(135deg,#a5d6a7,#66bb6a)",
    border: "#43a047",
    progress: 0,
    starsEarned: 0, starsTotal: MODULE3_SENTENCES.length,
    wordsLeft: MODULE3_SENTENCES.length,
  },
];

const BADGES = [
  { emoji: "🥇", label: "First Word!",    unlocked: true  },
  { emoji: "🎯", label: "Bullseye",        unlocked: true  },
  { emoji: "🔥", label: "7-Day Streak",    unlocked: true  },
  { emoji: "🌟", label: "Star Collector",  unlocked: false },
  { emoji: "🦁", label: "Brave Speaker",   unlocked: false },
  { emoji: "🏅", label: "Module Master",   unlocked: false },
];

// ── Sub-components ─────────────────────────────────────────────────────────────
function StatCard({ emoji, value, label }) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 6,
        p: 3.5,
        textAlign: "center",
        flex: 1,
        minWidth: 140,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-6px)" },
      }}
    >
      <Typography sx={{ fontSize: "3.5rem", lineHeight: 1, mb: 1 }}>{emoji}</Typography>
      <Typography
        sx={{
          fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
          fontSize: "3rem",
          color: "#333",
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
          fontWeight: 800,
          fontSize: "1rem",
          color: "#777",
          mt: 0.5,
        }}
      >
        {label}
      </Typography>
    </Paper>
  );
}

function ModuleProgressCard({ mod, onNavigate }) {
  return (
    <Paper
      elevation={3}
      onClick={() => onNavigate(mod.id)}
      sx={{
        borderRadius: 7,
        p: 5,
        flex: 1,
        minWidth: 260,
        background: "rgba(255,255,255,0.9)",
        border: `3px solid ${mod.border}22`,
        cursor: "pointer",
        transition: "all 0.22s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 16px 40px ${mod.border}33`,
          border: `3px solid ${mod.border}`,
        },
      }}
    >
      {/* Module label pill */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1.5,
          background: mod.bg,
          border: `2px solid ${mod.border}`,
          borderRadius: 6,
          px: 2.5, py: 1,
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: "1.8rem" }}>{mod.icon}</Typography>
        <Typography sx={{ fontSize: "1.8rem" }}>{mod.animal}</Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
            fontSize: "1.1rem",
            color: "#333",
          }}
        >
          {mod.title}
        </Typography>
      </Box>

      {/* Star bar */}
      <Box sx={{ mb: 1.5 }}>
        <StarBar filled={mod.starsEarned} total={mod.starsTotal} size="1.6rem" />
      </Box>

      {/* Progress bar */}
      <Box sx={{ mb: 1 }}>
        <LinearProgress
          variant="determinate"
          value={mod.progress}
          sx={{
            height: 16, borderRadius: 8,
            backgroundColor: "#eee",
            "& .MuiLinearProgress-bar": {
              background: mod.bg,
              borderRadius: 8,
            },
          }}
        />
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
            fontWeight: 800, fontSize: "1rem", color: "#555",
          }}
        >
          {mod.progress}% complete
        </Typography>
        <Chip
          label={`${mod.wordsLeft} left 💬`}
          size="small"
          sx={{
            fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
            fontWeight: 800, fontSize: "0.85rem",
            background: `${mod.border}22`,
            color: mod.color,
            border: `1.5px solid ${mod.border}44`,
          }}
        />
      </Stack>
    </Paper>
  );
}

function BadgeCard({ emoji, label, unlocked }) {
  return (
    <Paper
      elevation={unlocked ? 4 : 1}
      sx={{
        borderRadius: 5,
        p: 2.5,
        textAlign: "center",
        minWidth: 120,
        width: 130,
        background: unlocked ? "rgba(255,255,255,0.95)" : "rgba(200,200,200,0.25)",
        border: unlocked ? "2.5px solid #feca57" : "2px dashed #ccc",
        transition: "transform 0.2s",
        "&:hover": unlocked ? { transform: "scale(1.08)" } : {},
      }}
    >
      <Typography
        sx={{
          fontSize: "3rem", lineHeight: 1,
          filter: unlocked ? "none" : "grayscale(1) opacity(0.35)",
          mb: 1,
        }}
      >
        {emoji}
      </Typography>
      <Typography
        sx={{
          fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
          fontWeight: 800,
          fontSize: "0.85rem",
          color: unlocked ? "#444" : "#aaa",
        }}
      >
        {label}
      </Typography>
      {!unlocked && (
        <Typography sx={{ fontSize: "1rem", mt: 0.5, opacity: 0.5 }}>🔒</Typography>
      )}
    </Paper>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function ProgressPage({ onNavigate }) {
  const [dynamicStats, setDynamicStats] = useState([
    { emoji: "🗣️", value: 0, label: "Total Attempts" },
    { emoji: "🎯", value: "0%", label: "Avg. Accuracy" },
    { emoji: "🌟", value: 0, label: "Excellent 🥇" },
    { emoji: "📈", value: 0, label: "Good 🏅" },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userRaw = localStorage.getItem("chacha_user");
        if (!userRaw) return;
        const user = JSON.parse(userRaw);
        const userId = user.user_id || user.id || 1;
        
        const res = await fetch(`http://localhost:8000/api/users/${userId}/stats`);
        const data = await res.json();
        
        if (data.stats) {
          setDynamicStats([
            { emoji: "🗣️", value: data.stats.total_sessions || 0, label: "Total Attempts" },
            { emoji: "🎯", value: `${data.stats.average_score || 0}%`, label: "Avg. Accuracy" },
            { emoji: "🌟", value: data.stats.excellent || 0, label: "Excellent 🥇" },
            { emoji: "📈", value: data.stats.good || 0, label: "Good 🏅" },
          ]);
        }
      } catch (err) {
        console.error("Failed to load progress stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <Box sx={{ ...BG_STYLE, display: "flex" }}>
      <SideNav
        current="progress"
        onChange={(id) => {
          if (id === "home") onNavigate("landing");
          else onNavigate(id);
        }}
      />

      {/* Scrollable main area */}
      <Box
        sx={{
          flex: 1,
          ml: 0,
          overflowY: "auto",
          px: { xs: 3, md: 5 },
          py: 4,
        }}
      >
        {/* ── Page header ── */}
        <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 4 }}>
          <ChameleonMascot size={90} animation="wave" />
          <Box>
            <Typography
              sx={{
                fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                fontSize: "2.8rem",
                background: "linear-gradient(135deg,#ff6b6b,#feca57,#48dbfb)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
              }}
            >
              My Progress! 🎉
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: "1.2rem",
                color: "#777",
              }}
            >
              Keep going — you're doing amazing! 🌟
            </Typography>
          </Box>
        </Stack>

        {/* ── Stats row ── */}
        <Stack direction="row" spacing={3} flexWrap="wrap" sx={{ mb: 5 }}>
          {dynamicStats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </Stack>

        {/* ── Overall star level ── */}
        {(() => {
          // Dynamic Level Calculation
          const excellentCount = dynamicStats.find(s => s.label.includes("Excellent"))?.value || 0;
          const goodCount = dynamicStats.find(s => s.label.includes("Good"))?.value || 0;
          
          const totalStars = (excellentCount * 3) + (goodCount * 1);
          const starsPerLevel = 20;
          const currentLevel = Math.floor(totalStars / starsPerLevel) + 1;
          const starsIntoLevel = totalStars % starsPerLevel;
          const progressPercent = (starsIntoLevel / starsPerLevel) * 100;
          const starsToNext = starsPerLevel - starsIntoLevel;

          return (
            <Paper
              elevation={3}
              sx={{
                borderRadius: 7,
                p: 4, mb: 5,
                background: "linear-gradient(135deg,rgba(255,255,255,0.95),rgba(255,255,255,0.8))",
                backdropFilter: "blur(12px)",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 4,
              }}
            >
              <Box sx={{ textAlign: "center", flexShrink: 0 }}>
                <Typography sx={{ fontSize: "5rem", lineHeight: 1 }}>
                  {currentLevel >= 5 ? "👑" : currentLevel >= 3 ? "🏆" : "⭐"}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                    fontSize: "1.4rem",
                    color: "#f9a825",
                    mt: 0.5,
                  }}
                >
                  Level {currentLevel}
                </Typography>
              </Box>

              <Box sx={{ flex: 1, width: "100%" }}>
                <Typography
                  sx={{
                    fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                    fontSize: "1.8rem",
                    color: "#333",
                    mb: 1,
                  }}
                >
                  Overall Progress
                </Typography>
                <StarBar filled={starsIntoLevel} total={starsPerLevel} size="2rem" />
                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progressPercent}
                    sx={{
                      height: 22, borderRadius: 10,
                      backgroundColor: "#eee",
                      "& .MuiLinearProgress-bar": {
                        background: "linear-gradient(to right,#ff6b6b,#feca57,#48dbfb)",
                        borderRadius: 10,
                      },
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
                    fontWeight: 800, fontSize: "1rem",
                    color: "#888", mt: 1,
                  }}
                >
                  {starsIntoLevel} / {starsPerLevel} stars — {starsToNext} more to reach Level {currentLevel + 1}! 🚀
                </Typography>
              </Box>
            </Paper>
          );
        })()}

        {/* ── Module progress cards ── */}
        <Typography
          sx={{
            fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
            fontSize: "2rem", color: "#444", mb: 2.5,
          }}
        >
          📚 My Modules
        </Typography>
        <Stack direction="row" spacing={3} flexWrap="wrap" sx={{ mb: 5 }}>
          {MODULES.map((mod) => (
            <ModuleProgressCard key={mod.id} mod={mod} onNavigate={onNavigate} />
          ))}
        </Stack>

        {/* ── Badges ── */}
        <Typography
          sx={{
            fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
            fontSize: "2rem", color: "#444", mb: 2.5,
          }}
        >
          🏅 My Badges
        </Typography>
        <Stack direction="row" spacing={2.5} flexWrap="wrap" sx={{ mb: 5 }}>
          {BADGES.map((b) => (
            <BadgeCard key={b.label} {...b} />
          ))}
        </Stack>

        {/* ── Encouragement footer banner ── */}
        <Paper
          elevation={2}
          sx={{
            borderRadius: 7, p: 4,
            background: "linear-gradient(135deg,#a29bfe33,#fd79a833)",
            border: "2px solid #a29bfe55",
            textAlign: "center",
            mb: 2,
          }}
        >
          <Typography sx={{ fontSize: "3rem", mb: 1 }}>💪🌈✨</Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
              fontSize: "2rem", color: "#6c5ce7",
            }}
          >
            You're a Speaking Superstar!
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
              fontWeight: 800, fontSize: "1.1rem",
              color: "#888", mt: 0.5,
            }}
          >
            Practice every day and unlock all your badges! 🎖️
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
