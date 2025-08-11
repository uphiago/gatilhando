import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useRef } from "react";

import { check, dotmindlabsSymbol } from "../assets";
import { collabApps, collabContent } from "../constants";
import { useTranslation } from "../locale/Translation";
import Section from "./Section";
import { LeftCurve, RightCurve } from "./design/Collaboration";
import { BottomLine } from "./design/Hero";
import TooltipIcon from "./design/Tooltips";

const Collaboration = () => {
  const { t } = useTranslation();

  const lottieRefs = useRef([]);
  return (
    <Section crosses>
      <div className="container lg:flex">
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">
            {t("collab.heading.leading")} {t("collab.heading.highlight")}
          </h2>
          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collabContent.map((item, index) => {
              if (!lottieRefs.current[index]) {
                lottieRefs.current[index] = { current: null };
              }

              return (
                <li className="mb-3 py-3" key={item.id}>
                  <div className="flex items-center">
                    <Lottie
                      lottieRef={lottieRefs.current[index]}
                      animationData={check}
                      autoplay={false}
                      loop={false}
                      className=""
                      speed={2}
                      style={{ width: 28, height: 28 }}
                      onMouseEnter={() => {
                        lottieRefs.current[index].current?.stop();
                        lottieRefs.current[index].current?.play();
                      }}
                    />
                    <h6 className="body-2 ml-5">{t(`collab.items.${item.id}.title`)}</h6>
                  </div>
                  {item.text && <p className="body-2 mt-3 text-n-4">{t(`collab.items.${item.id}.text`)}</p>}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <p className="body-2 mb-4 text-n-4 md:mb-16 lg:mb-32 lg:w-[32rem] lg:mx-auto">{t("collab.text")}</p>

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
          <BottomLine />
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;
