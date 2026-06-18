import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { NeonGlitchCanvas } from "../components/NeonGlitchCanvas";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        pt: { xs: 16, sm: 20, md: 28 },
        pb: { xs: 12, sm: 16, md: 22 },
        // Глубокий фиолетово-угольный радиальный градиент
        background: "radial-gradient(ellipse at 50% 30%, #170b2e 0%, #06030a 50%, #000000 100%)",
        overflow: "hidden",
      }}
    >
      <Box 
        sx={{ 
          position: "absolute", 
          inset: 0, 
          zIndex: 2, 
          opacity: 0.45,
          pointerEvents: "none" 
        }}
      >
        <NeonGlitchCanvas />
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)",
          pointerEvents: "none",
          zIndex: 3
        }}
      />

      <Box
        component={motion.div}
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "60vh",
          // Фиолетовое мягкое свечение по центру страницы
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 4,
          pointerEvents: "none"
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 10 }}>
        <Stack
          spacing={4}
          sx={{
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                // Перевод верхней плашки на неоновый фиолетовый акцент
                color: "rgba(139, 92, 246, 0.85)",
                letterSpacing: 3,
                fontWeight: 600,
                border: "1px solid rgba(139, 92, 246, 0.3)",
                px: 2.5,
                py: 0.6,
                borderRadius: "20px",
                bgcolor: "rgba(139, 92, 246, 0.03)",
                backdropFilter: "blur(10px)",
                fontSize: { xs: "0.65rem", sm: "0.72rem" },
              }}
            >
              NEXT-GEN AI ARCHITECTURE
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.8rem", md: "4.8rem" },
                fontWeight: 800,
                lineHeight: 1.15,
                background: "linear-gradient(180deg, #FFFFFF 30%, #777777 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: { xs: -1, sm: -2 },
                pb: 1,
              }}
            >
              Autonomiczne systemy AI<br />dla Twojego biznesu
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#999999",
                maxWidth: 600,
                fontWeight: 400,
                fontSize: { xs: "1rem", sm: "1.15rem" },
                lineHeight: 1.7,
              }}
            >
              Projektujemy i wdrażamy zaawansowaną infrastrukturę sztucznej
              inteligencji. Automatyzujemy złożone procesy operacyjne,
              eliminując wąskie gardła i skalując efektywność przedsiębiorstw.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ width: "100%" }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ justifyContent: "center", width: "100%" }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => scrollToSection("cennik")}
                sx={{
                  px: 5,
                  py: 1.8,
                  bgcolor: "#ffffff",
                  color: "#000000",
                  fontWeight: 600,
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#eaeaea", boxShadow: "none" },
                }}
              >
                Rozpocznij teraz
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => scrollToSection("o-nas")}
                sx={{
                  px: 5,
                  py: 1.8,
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  fontWeight: 600,
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "rgba(139, 92, 246, 0.4)",
                    bgcolor: "rgba(139, 92, 246, 0.02)",
                  },
                }}
              >
                Jak to działa?
              </Button>
            </Stack>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
}