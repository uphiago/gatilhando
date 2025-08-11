import { useEffect, useState } from "react";
import { ScrollParallax } from "react-just-parallax";

import { useTranslation } from "../locale/Translation";
import Section from "./Section";
import { BottomLine } from "./design/Hero";
import RippleGrid from "./design/RippleGrid";

const Hero = () => {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 400);
  const blur = Math.min(10, scrollY / 50);
  return (
    <Section className="pt-[8rem] -mt-[5rem]" crosses crossesOffset="lg:translate-y-[5.25rem]" customPaddings id="hero">
      <div className="container relative">
        <div
          style={{
            zIndex: 999,
            position: "relative",
            height: "500px",
            transform: "translateY(250px)",
            overflow: "hidden",
          }}
        >
          <RippleGrid
            enableRainbow={false}
            gridColor="#ffffff"
            rippleIntensity={0.03}
            gridSize={10}
            gridThickness={15}
            mouseInteraction={true}
            mouseInteractionRadius={1.2}
            opacity={0.8}
          />
        </div>
        <ScrollParallax isAbsolutelyPositioned strength={0}>
          <div
            className="relative z-1 max-w-[62rem] mx-auto text-center mb-[2rem] md:mb-20 lg:mb-[-10rem] transform translate-y-8 lg:translate-y-0"
            style={{ opacity, filter: `blur(${blur}px)` }}
          >
            <p className="body-1 max-w-4xl mx-auto mt-20 mb-6 #ffffff lg:mb-8 text-4xl lg:text-5xl font-semibold">
              {t("hero.title")}
            </p>
            <p className="body-1 max-w-4xl mx-auto mb-6 #ffffff lg:mb-8 text-lg md:text-xl lg:text-2xl">
              {t("hero.subtitle")}
            </p>
          </div>
        </ScrollParallax>
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;
