import { Box, Tooltip, Typography } from "@mui/material";
import HomeIcon    from "@mui/icons-material/Home";
import GroupIcon   from "@mui/icons-material/Group";
import ExploreIcon from "@mui/icons-material/Explore";

const NAV_ITEMS = [
  { id: "home",     label: "Home",     Icon: HomeIcon    },
  { id: "progress", label: "Progress", Icon: GroupIcon   },
  { id: "modules",  label: "Explore",  Icon: ExploreIcon },
];

/**
 * SideNav – fixed left sidebar with 3 oversized kid-friendly buttons.
 * @param {string}   current  – active nav id
 * @param {Function} onChange – called with clicked nav id
 */
export default function SideNav({ current, onChange }) {
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0, top: 0, bottom: 0,
        width: 100,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 2,
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(14px)",
        borderRight: "2px solid rgba(255,255,255,0.6)",
        boxShadow: "4px 0 24px rgba(0,0,0,0.06)",
      }}
    >
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const active = current === id;
        return (
          <Tooltip key={id} title={label} placement="right" arrow>
            <Box
              onClick={() => onChange(id)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.6,
                width: 72,
                height: 72,
                borderRadius: 4,
                cursor: "pointer",
                background: active
                  ? "linear-gradient(135deg,#7c3aed22,#a78bfa33)"
                  : "transparent",
                border: active ? "2.5px solid #7c3aed44" : "2.5px solid transparent",
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "rgba(124,58,237,0.1)",
                  transform: "scale(1.08)",
                },
              }}
            >
              <Icon
                sx={{
                  fontSize: "2rem",
                  color: active ? "#7c3aed" : "#aaa",
                  transition: "color 0.2s",
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: active ? 800 : 600,
                  color: active ? "#7c3aed" : "#aaa",
                  fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
                  lineHeight: 1,
                }}
              >
                {label}
              </Typography>
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
}
