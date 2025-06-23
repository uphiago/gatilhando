import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import { useState } from "react";

import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import { SquigglyTextHighlight } from "./design/Underline";

const Benefits = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [playingAnimations, setPlayingAnimations] = useState(new Set());

  const handleMouseEnter = (idx) => {
    setHoveredIndex(idx);
    setPlayingAnimations((prev) => new Set(prev).add(idx));
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title={
            <>
              Agilize sua rotina com{" "}
              <SquigglyTextHighlight delay={1000} color="#ffffff">
                Dotmindlabs.
              </SquigglyTextHighlight>
            </>
          }
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((benefit, idx) => {
            const isPlaying = playingAnimations.has(idx);

            return (
              <div
                className="block relative p-0.5 md:max-w-[24rem] group"
                key={benefit.id}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-white/[0.01] block rounded-3xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.15 } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    />
                  )}
                </AnimatePresence>

                <div className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full border border-white/[0.2] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-250 z-20">
                  <div className="relative z-10 flex flex-col min-h-[22rem] p-[2.4rem] w-full">
                    <h5 className="text-white mb-4 text-xl font-semibold">{benefit.title}</h5>
                    <p className="body-3 mb-6 text-n-3 transition-colors duration-300 group-hover:text-white/90">
                      {benefit.text}
                    </p>

                    <motion.div className="pointer-events-auto mt-auto w-12 h-12 rounded-xl bg-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/100 group-hover:shadow-lg group-hover:scale-110">
                      <Lottie
                        key={`lottie-${idx}-${isPlaying ? "playing" : "idle"}`} // Force re-mount
                        animationData={benefit.iconUrl}
                        autoplay={isPlaying}
                        loop={false}
                        style={{ width: 40, height: 40 }}
                        className={benefit.iconWrapperClass ?? ""}
                        onComplete={() => {
                          setPlayingAnimations((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(idx);
                            return newSet;
                          });
                        }}
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="absolute -top-2 -left-2 w-4 h-4 text-white/40 transition-colors group-hover:text-white">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 text-white/40 transition-colors group-hover:text-white">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 text-white/40 transition-colors group-hover:text-white">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 text-white/40 transition-colors group-hover:text-white">
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
