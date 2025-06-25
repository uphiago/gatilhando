import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

import Logo from "../assets/dotmindlabs.svg";

const Header = () => {
  const { scrollY } = useScroll();

  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = (e) => setIsSmall(e.matches);
    update(mq);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const startFade = isSmall ? 40 : 150;
  const endFade = isSmall ? 200 : 300;
  const hideOffset = isSmall ? -80 : -120;

  const yRaw = useTransform(scrollY, [0, startFade, endFade], [0, 0, hideOffset]);
  const y = useSpring(yRaw, { stiffness: 160, damping: 24 });

  const baseOpacity = useTransform(scrollY, [0, startFade, endFade], [1, 1, 0]);

  const hoverFlag = useMotionValue(0);
  const mergedOpacity = useTransform([baseOpacity, hoverFlag], ([o, h]) => (h > 0 ? 1 : o));
  const opacity = useSpring(mergedOpacity, { stiffness: 160, damping: 24 });

  return (
    <motion.img
      src={Logo}
      alt="Dotmind logo"
      draggable={false}
      className="fixed top-4 left-4 sm:top-7 sm:left-15 h-10 z-50 select-none"
      style={{ opacity, y }}
      onHoverStart={() => hoverFlag.set(1)}
      onHoverEnd={() => hoverFlag.set(0)}
      whileHover={{ opacity: 1, scale: 1.08 }}
      transition={{ type: "spring", stiffness: 150, damping: 26 }}
    />
  );
};

export default Header;
