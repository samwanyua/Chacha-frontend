import { useState } from "react";
import { Box, Tooltip, Typography, IconButton } from "@mui/material";
import HomeIcon    from "@mui/icons-material/Home";
import GroupIcon   from "@mui/icons-material/Group";
import ExploreIcon from "@mui/icons-material/Explore";
import ChameleonMascot from "./ChameleonMascot";

const NAV_ITEMS = [
  { id: "home",     label: "Home",     Icon: HomeIcon    },
  { id: "progress", label: "Progress", Icon: GroupIcon   },
  { id: "modules",  label: "Explore",  Icon: ExploreIcon },
];

/**
 * SideNav – slide-out left sidebar, toggled by the Chameleon Mascot.
 */
export default function SideNav({ current, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          position: "fixed", top: 10, left: 10, zIndex: 110,
          cursor: "pointer",
          transition: "transform 0.2s",
          "&:hover": { transform: "scale(1.05)" }
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Tooltip title="Menu" placement="right">
          <Box>
            <ChameleonMascot size={80} animation="float" />
          </Box>
        </Tooltip>
      </Box>

      {/* Drawer Background (optional overlay if we wanted, but not needed for left rail) */}
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
          pt: 12, // padding top to push items below the chameleon
          gap: 2,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(14px)",
          borderRight: "2px solid rgba(255,255,255,0.6)",
          boxShadow: "4px 0 24px rgba(0,0,0,0.1)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
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

      <Box sx={{ flexGrow: 1 }} />
      
      <Tooltip title="Log Out" placement="right" arrow>
        <Box
          onClick={() => {
            localStorage.removeItem("chacha_user");
            window.location.reload();
          }}
          sx={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 0.6, width: 72, height: 72,
            borderRadius: 4, cursor: "pointer",
            background: "transparent",
            mb: 2,
            border: "2.5px solid transparent",
            transition: "all 0.2s ease",
            "&:hover": {
              background: "rgba(231,76,60,0.1)",
              transform: "scale(1.08)",
            },
          }}
        >
          <GroupIcon sx={{ fontSize: "2rem", color: "#e74c3c" }} />
          <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#e74c3c", fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}>
            Logout
          </Typography>
        </Box>
      </Tooltip>
    </Box>
    </>
  );
}
