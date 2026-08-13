"use client";

import { useEffect, useState } from "react";

export default function PixelPlayground() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [target, setTarget] = useState({ x: 85, y: 24 });

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowHint(true), 3000);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const moveBall = (event: MouseEvent) => {
      if (!isPlaying) return;
      const element = event.target as HTMLElement;
      if (element.closest("a, button, input, textarea, select")) return;
      setTarget({
        x: Math.min(94, Math.max(5, (event.clientX / window.innerWidth) * 100)),
        y: Math.min(94, Math.max(7, (event.clientY / window.innerHeight) * 100)),
      });
    };
    window.addEventListener("click", moveBall);
    return () => window.removeEventListener("click", moveBall);
  }, [isPlaying]);

  return <div className="pixel-playground">
    <button className="pixel-girl" aria-label="Start moving the ball" onClick={(event) => { setTarget({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 }); setIsPlaying(true); setShowHint(false); }}>
      {showHint && !isPlaying && <span className="pixel-hint">hmm…<br />click me!</span>}
      <i className="hair" /><i className="face" /><i className="shirt" /><i className="leg left-leg" /><i className="leg right-leg" /><i className="shoe left-shoe" /><i className="shoe right-shoe" />
    </button>
    {isPlaying && <p className="ball-instruction">now click anywhere to roll the ball</p>}
    {isPlaying && <div className="pixel-ball" style={{ left: `${target.x}%`, top: `${target.y}%` }} aria-hidden="true"><i /><i /><i /></div>}
  </div>;
}
