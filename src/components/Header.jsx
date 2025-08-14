import { BR, US } from "country-flag-icons/react/3x2";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from "../assets/dotmindlabs.svg";
import { LanguageContext } from "../locale/LanguageContext";
import { useTranslation } from "../locale/Translation";

const Header = () => {
  const location = useLocation();
  const { scrollY } = useScroll();
  const { language, toggleLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = (e) => setIsSmall(e.matches);
    update(mq);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const startFade = isSmall ? 10 : 150;
  const endFade = isSmall ? 60 : 300;
  const hideOffset = isSmall ? -60 : -120;

  const yRaw = useTransform(scrollY, [0, startFade, endFade], [0, 0, hideOffset]);
  const y = useSpring(yRaw, { stiffness: 160, damping: 24 });

  const baseOpacity = useTransform(scrollY, [0, startFade, endFade], [1, 1, 0]);

  const hoverFlag = useMotionValue(0);
  const mergedOpacity = useTransform([baseOpacity, hoverFlag], ([o, h]) => (h > 0 ? 1 : o));
  const opacity = useSpring(mergedOpacity, { stiffness: 160, damping: 24 });

  return (
    <>
      {/* Logo */}
      <motion.button
        type="button"
        onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
        className="fixed top-8 left-4 sm:top-7 sm:left-15 z-50"
        style={{ opacity, y }}
        onHoverStart={() => hoverFlag.set(1)}
        onHoverEnd={() => hoverFlag.set(0)}
        whileHover={{ opacity: 1, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 150, damping: 26 }}
      >
        <img src={Logo} alt="Dotmindlabs" draggable={false} className="h-10 select-none" />
      </motion.button>

      {/* Container direito */}
      <motion.div
        className="fixed top-8 right-4 sm:top-7 sm:right-15 z-50 flex items-center gap-4"
        style={{ opacity, y }}
        onHoverStart={() => hoverFlag.set(1)}
        onHoverEnd={() => hoverFlag.set(0)}
      >
        {/* Botão de Contato */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Link
            to="/contact"
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ease-out relative overflow-hidden border ${
              location.pathname === "/contact"
                ? "bg-white text-black border-white"
                : "bg-white/8 text-white hover:bg-white/15 backdrop-blur-sm border-white/15 hover:border-white/25 hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]"
            }`}
          >
            {/* Efeito shimmer muito sutil */}
            {location.pathname !== "/contact" && (
              <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                animate={{ x: ["0%", "200%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: [0.4, 0, 0.6, 1],
                }}
              />
            )}
            <span className="relative z-10">{t("contact.title")}</span>
          </Link>
        </motion.div>

        {/* Seletores de Idioma - mantendo quase original */}
        <div className="flex items-center gap-1 bg-black/10 rounded-full p-1">
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
        </div>
      </motion.div>
    </>
  );
};

export default Header;
