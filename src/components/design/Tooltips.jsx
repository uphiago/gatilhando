"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState } from "react";

export default function TooltipIcon({ app, rotation }) {
  const [hovered, setHovered] = useState(false);

  // Track mouse movement with reduced sensitivity
  const x = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 15 }; // Stiffer spring, more damping

  // Reduced movement range for subtler effect
  const translateX = useSpring(useTransform(x, [-25, 25], [-8, 8]), springConfig);
  const tilt = useSpring(useTransform(x, [-25, 25], [-12, 12]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const mouseX = e.clientX - rect.left;
    // Limit the range to prevent extreme movements
    const clampedX = Math.max(-25, Math.min(25, mouseX - centerX));
    x.set(clampedX);
  };

  return (
    <li
      style={{ transform: `rotate(${rotation}deg)` }}
      className="absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom"
    >
      <div
        style={{ transform: `translateY(-1.6rem) rotate(${-rotation}deg)` }}
        className="relative flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-xl border border-n-1/15 bg-n-7 cursor-pointer transition-transform duration-200 hover:scale-105"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          x.set(0); // Reset position when mouse leaves
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Animated Tooltip - Positioned closer */}
        <AnimatePresence mode="wait">
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              exit={{ opacity: 0, y: 12, scale: 0.8 }}
              style={{
                translateX,
                rotate: tilt,
                whiteSpace: "nowrap",
              }}
              className="absolute -top-9 left-1/6 z-50 flex -translate-x-1/2 items-center justify-center rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-black shadow-lg backdrop-blur-sm border border-white/10"
            >
              {/* Subtle gradient accent */}
              <div className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
              {app.title}

              {/* Small arrow pointing down */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-white/10"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon */}
        <img
          src={app.icon}
          alt={app.title}
          width={app.height}
          height={app.height}
          className="m-auto transition-transform duration-200 pointer-events-none"
          draggable={false}
        />
      </div>
    </li>
  );
}
