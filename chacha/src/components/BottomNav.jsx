import { Box, IconButton, Typography } from "@mui/material";
import HomeIcon          from "@mui/icons-material/Home";
import GroupIcon         from "@mui/icons-material/Group";
import ExploreIcon       from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon      from "@mui/icons-material/Settings";

const NAV_ITEMS = [
  { id: "home",     label: "Home",     Icon: HomeIcon          },
  { id: "progress", label: "Progress", Icon: GroupIcon         },
  { id: "modules",  label: "Explore",  Icon: ExploreIcon       },
  { id: "alerts",   label: "Alerts",   Icon: NotificationsIcon },
  { id: "settings", label: "Settings", Icon: SettingsIcon      },
];

/**
 * BottomNav
 * Glassmorphism pill-shaped bottom navigation bar.
 * @param {string}   current  - active nav id
 * @param {Function} onChange - called with the clicked nav id
 */
export default function BottomNav({ current, onChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderRadius: 10,
        px: 2,
        py: 1,
        maxWidth: 380,
        mx: "auto",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
    >
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const active = current === id;
        return (
          <Box
            key={id}
            onClick={() => onChange(id)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.3,
              cursor: "pointer",
              px: 1.5,
              py: 0.8,
              borderRadius: 4,
              background: active ? "rgba(124,58,237,0.12)" : "transparent",
              transition: "background 0.2s",
              "&:hover": { background: "rgba(124,58,237,0.08)" },
            }}
          >
            <Icon
              sx={{
                fontSize: "1.3rem",
                color: active ? "#7c3aed" : "#888",
                transition: "color 0.2s",
              }}
            />
            <Typography
              sx={{
                fontSize: "0.6rem",
                fontWeight: active ? 800 : 600,
                color: active ? "#7c3aed" : "#888",
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              {label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
