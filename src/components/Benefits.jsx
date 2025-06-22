import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { useRef, useState } from "react";

import { curve } from "../assets";
import ClipPath from "../assets/svg/ClipPath";
import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import { GradientLight } from "./design/Benefits";
import { SquigglyTextHighlight } from "./design/Underline";

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
            return (
              <div
                className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] group"
                style={{
                  backgroundImage: `url(${benefit.backgroundUrl})`,
                }}
                key={benefit.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                  <h5 className="h5 mb-5 transition-colors duration-300 group-hover:text-white">
                    {benefit.title}
                  </h5>
                  <p className="body-3 mb-6 text-n-3 transition-colors duration-300 group-hover:text-n-2">
                    {benefit.text}
                  </p>

                  <motion.div
                    className="pointer-events-auto mt-auto w-12 h-12 rounded-md bg-[#ffffff] flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:shadow-lg group-hover:scale-110"
                    drag
                    dragElastic={0.015}
                    dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
                    dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    whileDrag={{ cursor: "grabbing" }}
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

                {benefit.light && <GradientLight />}

                <div 
                  className="absolute inset-0.5 bg-n-8 transition-all duration-300 group-hover:bg-n-7" 
                  style={{ clipPath: "url(#benefits)" }}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20">
                    {benefit.imageUrl && (
                      <img
                        src={benefit.imageUrl}
                        width={380}
                        height={362}
                        alt={benefit.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                <ClipPath />
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;