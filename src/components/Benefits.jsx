import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import Lottie from "lottie-react";
import { useRef, useState, useEffect } from "react";

import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import { SquigglyTextHighlight } from "./design/Underline";

// Evervault Card Pattern Component
const CardPattern = ({ mouseX, mouseY, randomString }) => {
  let maskImage = useMotionTemplate`radial-gradient(80px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };
  
  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white via-blue-500 to-white opacity-0 group-hover:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover:opacity-100"
        style={style}
      >
        <p className="absolute inset-x-0 p-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
};

// Generate random string function
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateRandomString = (length) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const Benefits = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
            const [randomString, setRandomString] = useState("");
            const lastStrUpdate = useRef(0);

            useEffect(() => {
              const now = performance.now();
              if (now - lastStrUpdate.current > 80) {
                lastStrUpdate.current = now;
                setRandomString(generateRandomString(2000));
              }
            }, []);

            const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
              const { left, top } = currentTarget.getBoundingClientRect();
              mouseX.set(clientX - left);
              mouseY.set(clientY - top);
              
              const str = generateRandomString(2000);
              setRandomString(str);
            };

            return (
              <div
                className="block relative p-0.5 md:max-w-[24rem] group"
                key={benefit.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Evervault Card Container */}
                <div
                  className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full border border-white/[0.2]"
                  onMouseMove={handleMouseMove}
                >
                  {/* Evervault Pattern */}
                  <CardPattern
                    mouseX={mouseX}
                    mouseY={mouseY}
                    randomString={randomString}
                  />

                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col min-h-[22rem] p-[2.4rem] w-full">
                    <h5 className="h5 mb-5 transition-colors duration-300 text-white group-hover:text-white">
                      {benefit.title}
                    </h5>
                    <p className="body-3 mb-6 text-n-3 transition-colors duration-300 group-hover:text-white/90">
                      {benefit.text}
                    </p>

                    {/* Animated Lottie Icon */}
                    <motion.div
                      className="pointer-events-auto mt-auto w-12 h-12 rounded-xl bg-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/100 group-hover:shadow-lg group-hover:scale-110"
                      // drag
                      // dragElastic={0.210}
                      // dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
                      // dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                      // whileDrag={{ cursor: "grabbing" }}
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

                {/* Corner Icons */}
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