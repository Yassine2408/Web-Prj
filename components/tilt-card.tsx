"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tiltStrength?: number;
};

export function TiltCard({
  children,
  className,
  glowColor = "#0066CC",
  tiltStrength = 14,
}: TiltCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [mouseX, setMouseX] = useState(0.5);
  const [mouseY, setMouseY] = useState(0.5);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    setMouseX(Math.min(1, Math.max(0, x)));
    setMouseY(Math.min(1, Math.max(0, y)));
  };

  const onMouseEnter = () => setIsHovering(true);
  const onMouseLeave = () => {
    setIsHovering(false);
    setMouseX(0.5);
    setMouseY(0.5);
  };

  const rotateX = (mouseY - 0.5) * -tiltStrength;
  const rotateY = (mouseX - 0.5) * tiltStrength;
  const glareX = `${Math.round(mouseX * 100)}%`;
  const glareY = `${Math.round(mouseY * 100)}%`;

  return (
    <div
      className={cn("relative", className)}
      style={{ perspective: "800px" }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="relative rounded-2xl"
        animate={{
          rotateX,
          rotateY,
          scale: isHovering ? 1.015 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, ${glowColor}59 0%, transparent 70%)`,
          }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        <motion.div
          className="animated-gradient-border pointer-events-none absolute -inset-[1.5px] z-10 rounded-2xl"
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {children}

        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
}

