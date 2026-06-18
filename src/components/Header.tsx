import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (id: string) => {
    setMobileOpen(false);

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 250);
  };

  const menuItems = [
    { text: "O nas", id: "o-nas" },
    { text: "Możliwości", id: "mozliwosci" },
    { text: "Cennik", id: "cennik" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "none",
          zIndex: 1300,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            height: { xs: 60, md: 70 },
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMobileOpen(false);
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              "&:hover svg path": { fill: "#a855f7" },
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transition: "all 0.3s ease" }}
            >
              <defs>
                <linearGradient
                  id="navPurpleGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stop-color="#8b5cf6" />
                  <stop offset="100%" stop-color="#6366f1" />
                </linearGradient>
              </defs>
              <rect
                width="32"
                height="32"
                rx="8"
                fill="#121216"
                stroke="rgba(139, 92, 246, 0.2)"
                strokeWidth="1"
              />
              <path
                d="M 22 9 C 14 9, 10 12, 10 16 C 10 20, 14 23, 22 23 L 17 19 C 13 19, 13 13, 17 13 Z"
                fill="url(#navPurpleGradient)"
                style={{ transition: "fill 0.3s ease" }}
              />
              <circle cx="21" cy="16" r="2" fill="#ffffff" />
            </svg>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: 1,
                color: "#ffffff",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              CODEAST
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                sx={{
                  color: "#888",
                  "&:hover": { color: "#fff" },
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                {item.text}
              </Button>
            ))}
          </Stack>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => scrollToSection("kontakt")}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                bgcolor: "#ffffff",
                color: "#000000",
                fontWeight: 600,
                px: 3,
                py: 0.8,
                "&:hover": { bgcolor: "#eaeaea" },
              }}
            >
              KONTAKT
            </Button>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" }, color: "#ffffff", ml: 1, p: 1 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ zIndex: 1400 }}
        slotProps={{
          paper: {
            sx: {
              width: "100%",
              maxWidth: 300,
              bgcolor: "#000000",
              borderLeft: "1px solid rgba(255, 255, 255, 0.05)",
              p: 3,
            },
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: "#ffffff", p: 1 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 2 }}>
              <ListItemButton
                onClick={() => scrollToSection(item.id)}
                sx={{
                  borderRadius: "8px",
                  py: 1.5,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                }}
              >
                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      style: {
                        color: "#ffffff",
                        fontSize: "1.2rem",
                        fontWeight: 500,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding sx={{ mt: 4 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => scrollToSection("kontakt")}
              sx={{
                bgcolor: "#ffffff",
                color: "#000000",
                fontWeight: 600,
                py: 1.5,
                borderRadius: "8px",
                "&:hover": { bgcolor: "#eaeaea" },
              }}
            >
              KONTAKT
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
