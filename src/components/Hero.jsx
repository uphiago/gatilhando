import { motion } from "framer-motion";
import { useRef } from "react";
import { ScrollParallax } from "react-just-parallax";

import { heroBackground, robot } from "../assets";
import { heroIcons } from "../constants";
import Generating from "./Generating";
import Notification from "./Notification";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
// import TypeItComponent from "./design/Typew";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[10rem] -mt-[4.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div ref={parallaxRef} className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[2rem] md:mb-20 lg:mb-[6rem]">
          {/* <TypeItComponent /> */}
          <p className="body-1 max-w-4xl mx-auto mb-6 text-n-2 lg:mb-8 text-2xl lg:text-5xl font-semibold">
            We Design Drama Free Software that Boosts your Business
          </p>
          <br />
          <p className="body-1 max-w-4xl mx-auto mb-6 text-n-2 lg:mb-8">
            Clocks stop ticking when workflows click. Free your roadmap from routine.
          </p>
        </div>

        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5  rounded-2xl bg-conic-gradient  -mt-8 md:-mt-12 lg:-mt-16">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="{h-[1.4rem] bg-conic-gradient rounded-t-[0.9rem]}" />

              <div className="aspect-[33/40] rounded-t-[0.9rem] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <video
                  src={robot}
                  className="w-full h-full object-cover pointer-events-none select-none"
                  width={1024}
                  height={490}
                  alt="AI"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                />
                <div className="absolute inset-x-0 bottom-8 flex justify-center">
                  <Generating className="w-full max-w-[22rem] transition-none" />
                </div>

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden xl:block z-30  absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl ">
                    {heroIcons.map((icon, index) => (
                      <motion.li
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                        className="p-5"
                        key={index}
                      >
                        <img src={icon} width={24} height={25} alt={icon} />
                      </motion.li>
                    ))}
                  </ul>
                </ScrollParallax>
                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                    title="Thinking Tech"
                  />
                </ScrollParallax>
              </div>
            </div>
            <Gradient />
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full pointer-events-none select-none"
              width={1440}
              height={1800}
              alt="Hero"
            />
          </div>
          <BackgroundCircles />
        </div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;
