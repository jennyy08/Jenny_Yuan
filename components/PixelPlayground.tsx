"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Point = { x: number; y: number };
type TrailDot = Point & { vx: number; vy: number; alpha: number };

export default function PixelPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballRef = useRef({ x: 85, y: 24, start: { x: 85, y: 24 }, end: { x: 85, y: 24 }, startedAt: 0, duration: 0, moving: false, bounces: 1, rotation: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showRollHint, setShowRollHint] = useState(false);
  const [isKicking, setIsKicking] = useState(false);
  const hasKicked = useRef(false);
  const kickTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowHint(true), 3000);
    return () => { window.clearTimeout(timeout); if (kickTimeout.current !== undefined) window.clearTimeout(kickTimeout.current); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isPlaying) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const dots: TrailDot[] = [];
    let frame = 0;
    let lastDotAt = 0;

    const resize = () => {
      const scale = window.devicePixelRatio || 1;
      const pageWidth = document.documentElement.scrollWidth;
      const pageHeight = document.documentElement.scrollHeight;
      canvas.width = pageWidth * scale;
      canvas.height = pageHeight * scale;
      canvas.style.width = `${pageWidth}px`;
      canvas.style.height = `${pageHeight}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.imageSmoothingEnabled = false;
    };

    const drawBall = (x: number, y: number, scaleX: number, scaleY: number, rotation: number) => {
      context.save();
      context.translate(x, y);
      context.scale(scaleX, scaleY);
      context.rotate(Math.round(rotation / (Math.PI / 8)) * (Math.PI / 8));
      context.fillStyle = "#14211c";
      context.fillRect(-11, -14, 22, 28);
      context.fillRect(-14, -10, 28, 20);
      context.fillStyle = "#f5f1e7";
      context.fillRect(-9, -12, 18, 24);
      context.fillRect(-12, -8, 24, 16);
      context.fillStyle = "#14211c";
      context.fillRect(-4, -4, 8, 8);
      context.fillRect(-8, -10, 5, 5);
      context.fillRect(4, -10, 5, 5);
      context.fillRect(-10, 5, 5, 5);
      context.fillRect(5, 5, 5, 5);
      context.restore();
    };

    const render = (now: number) => {
      context.clearRect(0, 0, document.documentElement.scrollWidth, document.documentElement.scrollHeight);
      const ball = ballRef.current;
      let drawY = ball.y;
      let squash = 0;
      let stretch = 0;

      if (ball.moving) {
        const progress = Math.min(1, (now - ball.startedAt) / ball.duration);
        const arc = Math.sin(progress * Math.PI * ball.bounces);
        const arcHeight = Math.min(9, Math.hypot(ball.end.x - ball.start.x, ball.end.y - ball.start.y) * .025);
        ball.x = ball.start.x + (ball.end.x - ball.start.x) * progress;
        ball.y = ball.start.y + (ball.end.y - ball.start.y) * progress - arc * arcHeight;
        ball.rotation += .08;
        drawY = ball.y;
        const bounceProgress = (progress * ball.bounces) % 1;
        stretch = Math.max(0, Math.sin(progress * Math.PI * ball.bounces - .45)) * .045;
        squash = bounceProgress > .88 ? (bounceProgress - .88) / .12 * .08 : 0;
        if (now - lastDotAt > 95) {
          lastDotAt = now;
          dots.push({ x: ball.x, y: ball.y, vx: -0.18 + Math.random() * .36, vy: .18 + Math.random() * .22, alpha: 1 });
        }
        if (progress === 1) ball.moving = false;
      } else {
        drawY += Math.sin(now / 520) * .8;
      }

      for (let index = dots.length - 1; index >= 0; index--) {
        const dot = dots[index];
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.alpha -= .028;
        if (dot.alpha <= 0) dots.splice(index, 1);
      }
      while (dots.length > 3) dots.shift();

      context.fillStyle = "#244b3f";
      dots.forEach((dot) => {
        context.globalAlpha = dot.alpha;
        context.fillRect(Math.round(dot.x) - 1, Math.round(dot.y) - 1, 3, 3);
      });
      context.globalAlpha = 1;
      drawBall(ball.x, drawY, 1 + squash - stretch * .5, 1 - squash + stretch, ball.rotation);
      frame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(render);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [isPlaying]);

  const kickTo = (point: Point) => {
    const ball = ballRef.current;
    const start = { x: ball.x, y: ball.y };
    const distance = Math.hypot(point.x - start.x, point.y - start.y);
    ball.start = start;
    ball.end = point;
    ball.startedAt = performance.now();
    ball.duration = Math.max(16, distance / 460 * 1000);
    ball.bounces = Math.max(1, Math.round(distance / 320));
    ball.moving = true;
  };

  useEffect(() => {
    const moveBall = (event: MouseEvent) => {
      if (!isPlaying) return;
      setShowRollHint(false);
      if ((event.target as HTMLElement).closest("a, button, input, textarea, select")) return;
      if (!hasKicked.current) {
        hasKicked.current = true;
        setIsKicking(true);
        kickTimeout.current = window.setTimeout(() => setIsKicking(false), 380);
      }
      kickTo({ x: event.clientX + window.scrollX, y: event.clientY + window.scrollY });
    };
    window.addEventListener("click", moveBall);
    return () => window.removeEventListener("click", moveBall);
  }, [isPlaying]);

  return <>
    <div className="pixel-playground">
    <button className={`pixel-girl${isKicking ? " is-kicking" : ""}`} aria-label="Start moving the ball" onClick={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); ballRef.current.x = bounds.left + 32 * 1.28 + window.scrollX; ballRef.current.y = bounds.top + 69 * 1.28 + window.scrollY; setIsPlaying(true); setShowHint(false); setShowRollHint(true); }}>
      {showHint && !isPlaying && <span className="pixel-hint">hmm…<br />click me!</span>}
      {showRollHint && <span className="pixel-hint pixel-roll-hint">now click<br />anywhere!</span>}
      <i className="hair" /><i className="face" /><i className="shirt" /><i className="leg left-leg" /><i className="leg right-leg" /><i className="shoe left-shoe" /><i className="shoe right-shoe" />
    </button>
    </div>
    {isPlaying && createPortal(<canvas ref={canvasRef} className="pixel-canvas" aria-hidden="true" />, document.body)}
  </>;
}
