import { BR, US } from "country-flag-icons/react/3x2";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useContext, useEffect, useState } from "react";

import Logo from "../assets/dotmindlabs.svg";
import { LanguageContext } from "../locale/LanguageContext";

const Header = () => {
  const { scrollY } = useScroll();
  const { language, toggleLanguage } = useContext(LanguageContext);

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
    <>
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
      <motion.div
        className="fixed top-4 right-4 sm:top-7 sm:right-15 z-50 flex gap-1 bg-black/10 rounded-full p-1"
        style={{ opacity, y }}
        onHoverStart={() => hoverFlag.set(1)}
        onHoverEnd={() => hoverFlag.set(0)}
      >
        <button
          onClick={() => language !== "en-US" && toggleLanguage()}
          className={`w-5 h-5 rounded-sm overflow-hidden transition-all ${
            language === "en-US" ? "opacity-100 scale-110" : "opacity-50 hover:opacity-80"
          }`}
        >
          <US title="English" className="w-full h-full" />
        </button>
        <button
          onClick={() => language !== "pt-BR" && toggleLanguage()}
          className={`w-5 h-5 rounded-sm overflow-hidden transition-all ${
            language === "pt-BR" ? "opacity-100 scale-110" : "opacity-50 hover:opacity-80"
          }`}
        >
          <BR title="Português" className="w-full h-full" />
        </button>
      </motion.div>
    </>
  );
};

export default Header;
