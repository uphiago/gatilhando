import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useRef } from "react";

import { curve } from "../assets";
// import Arrow from "../assets/svg/Arrow";
import ClipPath from "../assets/svg/ClipPath";
import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import { GradientLight } from "./design/Benefits";
import { SquigglyTextHighlight } from "./design/Underline";

const Benefits = () => {
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
          {benefits.map((benefit) => {
            const lottieRef = useRef(null);
            return (
              <div
                className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
                style={{
                  backgroundImage: `url(${benefit.backgroundUrl})`,
                }}
                key={benefit.id}
              >
                <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                  <h5 className="h5 mb-5">{benefit.title}</h5>
                  <p className="body-3 mb-6 text-n-3">{benefit.text}</p>

                  <motion.div
                    className="pointer-events-auto mt-auto w-12 h-12 rounded-md bg-[#ffffff] flex items-center justify-center"
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

                  {/* <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                    Explore more
                  </p>
                  <Arrow /> */}
                </div>

                {benefit.light && <GradientLight />}

                <div className="absolute inset-0.5 bg-n-8" style={{ clipPath: "url(#benefits)" }}>
                  <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
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
