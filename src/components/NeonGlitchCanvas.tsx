import { useEffect, useRef } from "react";

export function NeonGlitchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let animId: number;
    let W = 0,
      H = 0;

    interface Stream {
      x: number;
      y: number;
      speed: number;
      width: number;
      height: number;
      alpha: number;
      color: string;
    }

    let streams: Stream[] = [];

    const COLORS = [
      "rgba(139, 92, 246", 
      "rgba(99, 102, 241",
      "rgba(168, 85, 247",
      "rgba(217, 70, 239",
    ];

    function init() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      W = canvas!.width = rect.width;
      H = canvas!.height = rect.height;

      streams = [];
      const streamCount = Math.floor((W / 1920) * 80) + 20;

      for (let i = 0; i < streamCount; i++) {
        const baseColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        streams.push({
          x: Math.random() * W,
          y: Math.random() * H - H,
          speed: Math.random() * 4 + 2,
          width: Math.random() * 2 + 1,
          height: Math.random() * 120 + 60,
          alpha: Math.random() * 0.4 + 0.1,
          color: baseColor,
        });
      }
    }

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "lighter";

      streams.forEach((s) => {
        const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.height);
        grad.addColorStop(0, `${s.color}, 0)`);
        grad.addColorStop(0.7, `${s.color}, ${s.alpha * 0.5})`);
        grad.addColorStop(1, `${s.color}, ${s.alpha})`);

        ctx.fillStyle = grad;
        ctx.fillRect(s.x, s.y, s.width, s.height);

        if (Math.random() > 0.3) {
          ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * 1.5})`;
          ctx.fillRect(s.x - 0.5, s.y + s.height - 2, s.width + 1, 2);
        }

        s.y += s.speed;

        if (Math.random() < 0.01) {
          s.x += (Math.random() - 0.5) * 15;
        }

        if (s.y > H) {
          s.y = -s.height;
          s.x = Math.random() * W;
          s.speed = Math.random() * 4 + 2;
          s.alpha = Math.random() * 0.4 + 0.1;
        }
      });

      ctx.globalCompositeOperation = "source-over";
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
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
