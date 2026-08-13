"use client";

import { useEffect, useState } from "react";

export default function PixelPlayground() {
  const [target, setTarget] = useState({ x: 86, y: 82 });

  useEffect(() => {
    const moveBall = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      if (element.closest("a, button, input, textarea, select")) return;
      setTarget({
        x: Math.min(92, Math.max(8, (event.clientX / window.innerWidth) * 100)),
        y: Math.min(88, Math.max(10, (event.clientY / window.innerHeight) * 100)),
      });
    };
    window.addEventListener("click", moveBall);
    return () => window.removeEventListener("click", moveBall);
  }, []);

  return (
    <div className="pixel-playground" aria-hidden="true">
      <div className="pixel-girl" style={{ left: `calc(${target.x}% - 68px)`, top: `calc(${target.y}% - 78px)` }}>
        <i className="hair" /><i className="face" /><i className="shirt" /><i className="leg left-leg" /><i className="leg right-leg" /><i className="shoe left-shoe" /><i className="shoe right-shoe" />
      </div>
      <div className="pixel-ball" style={{ left: `${target.x}%`, top: `${target.y}%` }}>
        <i /><i /><i />
      </div>
    </div>
  );
}
