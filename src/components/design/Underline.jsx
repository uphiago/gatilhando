import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const SquigglyTextHighlight = ({ children, delay = 0, color = "#ffffff" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleHover = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <span className="inline-block relative font-bold text-white cursor-pointer" onMouseEnter={handleHover}>
      {children}
      {isVisible && (
        <motion.div className="absolute -bottom-[2px] left-0 right-0 h-[8px] overflow-visible">
          <svg width="100%" height="10" viewBox="6 0 110 8" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`waveGrad-${animationKey}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color} stopOpacity="0.6" />
                <stop offset="50%" stopColor={color} stopOpacity="1" />
                <stop offset="100%" stopColor={color} stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <motion.path
              key={animationKey}
              d="M8 4 C30 3.5 90 3.5 112 4"
              stroke={`url(#waveGrad-${animationKey})`}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, y: 0 }}
              animate={{ pathLength: 1, y: 0 }}
              transition={{
                pathLength: { duration: 0.5, ease: "easeOut" },
                y: { duration: 0.8, ease: "easeOut" },
              }}
            />
          </svg>
        </motion.div>
      )}
    </span>
  );
};
