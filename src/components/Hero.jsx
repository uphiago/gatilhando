import Section from "./Section";
import { BottomLine } from "./design/Hero";
import RippleGrid from "./design/RippleGrid";

const Hero = () => {
  return (
    <Section className="pt-[8rem] -mt-[5rem]" crosses crossesOffset="lg:translate-y-[5.25rem]" customPaddings id="hero">
      <div className="container relative">
        <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
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
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[2rem] md:mb-20 lg:mb-[-5rem]">
          <p className="body-1 max-w-4xl mx-auto mb-6 #ffffff lg:mb-8 text-2xl lg:text-5xl font-semibold">
            We Design Drama Free Software
          </p>
        </div>
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;
