import { motion } from "framer-motion";
import { useRef } from "react";
import { ScrollParallax } from "react-just-parallax";
import Typewriter from "typewriter-effect";

import { curve, heroBackground, robot } from "../assets";
import { heroIcons } from "../constants";
import Button from "./Button";
// import CompanyLogos from "./CompanyLogos";
import Generating from "./Generating";
import Notification from "./Notification";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div ref={parallaxRef} className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem]">
          <h1 className="h1 mb-6">
            Transforme Seu Mundo
            <br />
            <Typewriter
              options={{
                strings: [
                  "Fluxos Inteligentes",
                  "Rotinas Otimizadas",
                  "Inteligência Artificial",
                  "Gestão Simplificada",
                  "Performance Máxima",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>

          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Deixe as rotinas repetitivas por nossa conta. Na{" "}
            <span className="inline-block relative font-semibold">
              Gatilhando
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
            , nós automatizamos enquanto você foca no que importa!
          </p>

          <Button href="#features" white>
            Comece Agora
          </Button>
        </div>

        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              {/* <div className="{h-[1.4rem] bg-conic-gradient rounded-t-[0.9rem]}" /> */}

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

                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="z-30  absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl ">
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
                    title="Time Estratégico"
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

        {/* <CompanyLogos className="hidden relative z-10 mt-20 lg:block" /> */}
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;
