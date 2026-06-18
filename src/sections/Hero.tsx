import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const NET_COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#3b82f6", "#d946ef", "#f43f5e"];

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    let animId: number;
    let t = 0;
    let W = 0, H = 0;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      rgb: string;
      size: number;
      id: number;
      phase: number;
    }

    interface Edge {
      n1: Node;
      n2: Node;
      dist: number;
      cpX: number;
      cpY: number;
    }

    interface Pulse {
      n1: Node;
      n2: Node;
      p: number;
      speed: number;
      color: string;
      rgb: string;
      cpX: number;
      cpY: number;
    }

    let nodes: Node[] = [];
    let pulses: Pulse[] = [];

    function init() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      W = canvas!.width = rect.width;
      H = canvas!.height = rect.height;

      nodes = [];
      
      nodes.push({
        x: W / 2,
        y: H / 2,
        vx: 0,
        vy: 0,
        color: "#ffffff",
        rgb: "255, 255, 255",
        size: 7,
        id: 0,
        phase: 0,
      });

      for (let i = 1; i <= 6; i++) {
        const color = NET_COLORS[i % NET_COLORS.length];
        nodes.push({
          x: W / 2 + (Math.random() - 0.5) * (W * 0.75),
          y: H / 2 + (Math.random() - 0.5) * (H * 0.75),
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          color: color,
          rgb: hexToRgb(color),
          size: Math.random() * 3 + 2.5,
          id: i,
          phase: Math.random() * Math.PI * 2,
        });
      }

      pulses = [];
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      t += 0.0005;

      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.rotate(t * 0.2);
      ctx.translate(-W / 2, -H / 2);

      const maxRad = Math.min(W, H) * 0.48;

      nodes.forEach((n, i) => {
        if (i !== 0) {
          n.x += n.vx;
          n.y += n.vy;
          const dx = n.x - W / 2;
          const dy = n.y - H / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > maxRad) {
            n.vx -= (dx / dist) * 0.0025;
            n.vy -= (dy / dist) * 0.0025;
          }
          n.vx -= dx * 0.000006;
          n.vy -= dy * 0.000006;
        } else {
          n.x = W / 2;
          n.y = H / 2;
        }
      });

      const activeEdges: Edge[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 380) {
            const cx = nodes[i].x + dx / 2;
            const cy = nodes[i].y + dy / 2;
            const perpX = -dy;
            const perpY = dx;
            const len = Math.sqrt(perpX * perpX + perpY * perpY);
            const normX = len === 0 ? 0 : perpX / len;
            const normY = len === 0 ? 0 : perpY / len;
            const offset = Math.sin(t * 20 + nodes[i].id + nodes[j].id) * 35;
            
            activeEdges.push({
              n1: nodes[i],
              n2: nodes[j],
              dist,
              cpX: cx + normX * offset,
              cpY: cy + normY * offset,
            });
          }
        }
      }

      activeEdges.forEach((e) => {
        const alpha = Math.max(0, 1 - e.dist / 380);
        const grad = ctx.createLinearGradient(e.n1.x, e.n1.y, e.n2.x, e.n2.y);
        grad.addColorStop(0, `rgba(${e.n1.rgb}, ${alpha * 0.3})`);
        grad.addColorStop(1, `rgba(${e.n2.rgb}, ${alpha * 0.3})`);

        ctx.beginPath();
        ctx.moveTo(e.n1.x, e.n1.y);
        ctx.quadraticCurveTo(e.cpX, e.cpY, e.n2.x, e.n2.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      });

      if (Math.random() < 0.018 && activeEdges.length > 0) {
        const e = activeEdges[Math.floor(Math.random() * activeEdges.length)];
        const isFwd = Math.random() > 0.5;
        const source = isFwd ? e.n1 : e.n2;
        const target = isFwd ? e.n2 : e.n1;
        
        pulses.push({
          n1: source,
          n2: target,
          p: 0,
          speed: 0.003 + Math.random() * 0.002,
          color: source.color === "#ffffff" ? target.color : source.color,
          rgb: source.color === "#ffffff" ? target.rgb : source.rgb,
          cpX: e.cpX,
          cpY: e.cpY,
        });
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.p += pulse.speed;

        if (pulse.p >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const u = 1 - pulse.p;
        const tt = pulse.p * pulse.p;
        const uu = u * u;
        const px = uu * pulse.n1.x + 2 * u * pulse.p * pulse.cpX + tt * pulse.n2.x;
        const py = uu * pulse.n1.y + 2 * u * pulse.p * pulse.cpY + tt * pulse.n2.y;
        const alpha = Math.sin(pulse.p * Math.PI);

        ctx.beginPath();
        ctx.arc(px, py, 3.5 * alpha + 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pulse.rgb}, ${alpha})`;
        ctx.shadowBlur = 25 * alpha;
        ctx.shadowColor = pulse.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      nodes.forEach((n, i) => {
        const pulseSize = 0.5 + 0.5 * Math.sin(t * 30 + n.phase);
        
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 4.5, 0, Math.PI * 2);
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 4.5);
        g.addColorStop(0, `rgba(${n.rgb}, ${0.12 + pulseSize * 0.25})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = i === 0 ? "#ffffff" : n.color;
        ctx.shadowBlur = 18;
        ctx.shadowColor = n.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.restore();
      animId = requestAnimationFrame(draw);
    }

    init();
    draw();

    const ro = new ResizeObserver(() => init());
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", mixBlendMode: "screen" }}
    />
  );
}

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
        pt: { xs: 14, sm: 16, md: 25 },
        pb: { xs: 8, sm: 12, md: 18 },
        background: "radial-gradient(ellipse at 50% -10%, #1a1a2e 0%, #0d0d14 40%, #000000 80%)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 20%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 20%, black 30%, transparent 75%)",
          pointerEvents: "none",
          zIndex: 1
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
            gap: { xs: 4, md: 5 },
            alignItems: "center",
          }}
        >
          <Stack
            spacing={4}
            sx={{
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
              pr: { md: 3 },
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
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: 2,
                  fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.1)",
                  px: 2,
                  py: 0.6,
                  borderRadius: "20px",
                  bgcolor: "rgba(255,255,255,0.02)",
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
                  fontSize: { xs: "2.2rem", sm: "3.2rem", md: "4.5rem" },
                  fontWeight: 800,
                  lineHeight: { xs: 1.2, sm: 1.12 },
                  background: "linear-gradient(180deg, #FFFFFF 20%, #666666 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: { xs: -1, sm: -2 },
                  pb: 1.5,
                }}
              >
                Autonomiczne systemy AI dla Twojego biznesu
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
                  color: "#888888",
                  maxWidth: 520,
                  fontWeight: 400,
                  fontSize: { xs: "0.95rem", sm: "1.05rem" },
                  lineHeight: 1.65,
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
              style={{ width: "100%", zIndex: 20 }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "center", md: "flex-start" } }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => scrollToSection("cennik")}
                  sx={{
                    px: 4,
                    py: 1.6,
                    bgcolor: "#ffffff",
                    color: "#000000",
                    fontWeight: 600,
                    borderRadius: "6px",
                    fontSize: "0.95rem",
                    textTransform: "none",
                    boxShadow: "none",
                    width: { xs: "100%", sm: "auto" },
                    "&:hover": { bgcolor: "#e8e8e8", boxShadow: "none" },
                  }}
                >
                  Rozpocznij teraz
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => scrollToSection("o-nas")}
                  sx={{
                    px: 4,
                    py: 1.6,
                    borderColor: "rgba(255,255,255,0.14)",
                    color: "#ffffff",
                    fontWeight: 600,
                    borderRadius: "6px",
                    fontSize: "0.95rem",
                    textTransform: "none",
                    width: { xs: "100%", sm: "auto" },
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.45)",
                      bgcolor: "rgba(255,255,255,0.03)",
                    },
                  }}
                >
                  Jak to działa?
                </Button>
              </Stack>
            </motion.div>
          </Stack>

          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            sx={{
              display: { xs: "none", md: "block" },
              position: "relative",
              height: 650,
              width: "100%",
              pointerEvents: "none",
              bgcolor: "transparent",
              zIndex: 1
            }}
          >
            <Box
              component={motion.div}
              animate={{ opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              sx={{
                position: "absolute",
                top: "15%",
                left: "20%",
                width: "55%",
                height: "55%",
                background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 60%)",
                filter: "blur(40px)",
              }}
            />
            <Box
              component={motion.div}
              animate={{ opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              sx={{
                position: "absolute",
                bottom: "15%",
                right: "15%",
                width: "45%",
                height: "45%",
                background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 60%)",
                filter: "blur(40px)",
              }}
            />
            <NetworkCanvas />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}