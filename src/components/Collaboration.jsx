import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useRef } from "react";

import { check, curve, dotmindlabsSymbol } from "../assets";
import { collabApps, collabContent, collabText } from "../constants";
import Button from "./Button";
import Section from "./Section";
import { LeftCurve, RightCurve } from "./design/Collaboration";
import TooltipIcon from "./design/Tooltips";
import { SquigglyTextHighlight } from "./design/Underline";

const Collaboration = () => {
  // const lottieRef = useRef(null);
  return (
    <Section crosses>
      <div className="container lg:flex">
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">
            Sua Gestão Pronta para o{" "}
            <SquigglyTextHighlight delay={1000} color="#ffffff">
              Futuro.
            </SquigglyTextHighlight>
          </h2>
          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collabContent.map((item) => {
              const lottieRef = useRef(null);
              return (
                <li className="mb-3 py-3" key={item.id}>
                  <div className="flex items-center">
                    <Lottie
                      lottieRef={lottieRef}
                      animationData={check}
                      autoplay={false}
                      loop={false}
                      className=""
                      speed={2}
                      style={{ width: 28, height: 28 }}
                      onMouseEnter={() => {
                        lottieRef.current?.stop();
                        lottieRef.current?.play();
                      }}
                    />

                    <h6 className="body-2 ml-5">{item.title}</h6>
                  </div>

                  {item.text && <p className="body-2 mt-3 text-n-4">{item.text}</p>}
                </li>
              );
            })}
          </ul>

          <Button>Converse Conosco</Button>
        </div>

        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <p className="body-2 mb-4 text-n-4 md:mb-16 lg:mb-32 lg:w-[32rem] lg:mx-auto">{collabText}</p>

          <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale-75 md:scale-100">
            <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
              <motion.div
                className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-gradient-to-r from-white to-gray-300 rounded-full"
                animate={{
                  scale: [1, 1.03, 1],
                  filter: [
                    "drop-shadow(0 0 8px rgba(255,255,255,0.4))",
                    "drop-shadow(0 0 14px rgba(255,255,255,0.6))",
                    "drop-shadow(0 0 8px rgba(255,255,255,0.4))",
                  ],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <motion.img
                    src={dotmindlabsSymbol}
                    width={48}
                    height={48}
                    alt="dotmindlab"
                    animate={{
                      scale: [1, 1, 1],
                      opacity: [1, 1, 1],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            </div>

            <ul>
              {collabApps.map((app, i) => (
                <TooltipIcon key={app.id} app={app} rotation={i * 45} />
              ))}
            </ul>

            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;
