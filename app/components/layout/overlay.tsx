"use client";

import React, { useEffect, useRef } from "react";

type ParticlesBackgroundProps = {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
  containerId?: string;
  className?: string;
};

export const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  count = 50,
  color = "rgba(0, 116, 255, 0.15)",
  minSize = 2,
  maxSize = 6,
  minDuration = 15,
  maxDuration = 40,
  containerId = "particles-container",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = ""; // Clear existing particles

    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");

      const size = Math.random() * (maxSize - minSize) + minSize;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.1;
      const duration =
        Math.random() * (maxDuration - minDuration) + minDuration;
      const delay = Math.random() * -40;

      Object.assign(particle.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: "50%",
        top: `${posY}%`,
        left: `${posX}%`,
        opacity: `${opacity}`,
        pointerEvents: "none",
        zIndex: "0",
        animationName: "float",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
      });

      particle.classList.add("float");

      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach((p) => container.removeChild(p));
    };
  }, [count, color, minSize, maxSize, minDuration, maxDuration]);

  return (
    <div
      id={containerId}
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
    />
  );
};

type GradientBackgroundProps = {
  primary?: string;
  secondary?: string;
  className?: string;
};

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  primary = "rgba(0, 116, 255, 0.15)",
  secondary = "rgba(0, 195, 255, 0.15)",
  className = "",
}) => {
  return (
    <div className={`fixed inset-0 pointer-events-none z-[-1] ${className}`}>
      <div
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-20"
        style={{
          background: `radial-gradient(circle, ${primary}, transparent)`,
        }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-20"
        style={{
          background: `radial-gradient(circle, ${secondary}, transparent)`,
        }}
      />
    </div>
  );
};
