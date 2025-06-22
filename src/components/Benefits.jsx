import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import Lottie from "lottie-react";
import { useRef, useState } from "react";

import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import { SquigglyTextHighlight } from "./design/Underline";

const CardPattern = ({ mouseX, mouseY }) => {
  let maskImage = useMotionTemplate`radial-gradient(60px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };
  
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white via-blue-500 to-white opacity-0 group-hover:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
    </div>
  );
};

const Benefits = () => {
  const [setHoveredIndex] = useState(null);

  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title={
            <>
              Agilize sua rotina com{" "}
              <SquigglyTextHighlight delay={1000} color="#ffffff">
                Gatilhando.
              </SquigglyTextHighlight>
            </>
          }
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((benefit, idx) => {
            const lottieRef = useRef(null);
            const mouseX = useMotionValue(0);
            const mouseY = useMotionValue(0);

            const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
              const { left, top } = currentTarget.getBoundingClientRect();
              mouseX.set(clientX - left);
              mouseY.set(clientY - top);
            };

            return (
              <div
                className="block relative p-0.5 md:max-w-[24rem] group"
                key={benefit.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                                  <CardPattern
                    mouseX={mouseX}
                    mouseY={mouseY}
                  />
                <div
                  className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full border border-white/[0.2] group-hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all duration-500"
                  onMouseMove={handleMouseMove}
                >


                  <div className="relative z-10 flex flex-col min-h-[22rem] p-[2.4rem] w-full">
                    <h5 className="">
                      {benefit.title}
                    </h5>
                    <p className="body-3 mb-6 text-n-3 transition-colors duration-300 group-hover:text-white/90">
                      {benefit.text}
                    </p>

                    <motion.div
                      className="pointer-events-auto mt-auto w-12 h-12 rounded-xl bg-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/100 group-hover:shadow-lg group-hover:scale-110"
                      onMouseEnter={() => lottieRef.current?.goToAndPlay(0, true)}
                    >
                      <Lottie
                        animationData={benefit.iconUrl}
                        lottieRef={lottieRef}
                        autoplay={false}
                        loop={false}
                        style={{ width: 40, height: 40 }}
                        className={benefit.iconWrapperClass ?? ""}
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="absolute -top-2 -left-2 w-4 h-4 text-white transition-colors group-hover:text-white">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 text-white transition-colors group-hover:text-white">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 text-white transition-colors group-hover:text-white">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 text-white transition-colors group-hover:text-white">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;