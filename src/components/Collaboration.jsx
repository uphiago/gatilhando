import Lottie from "lottie-react";
import { useRef } from "react";

import { brainwaveSymbol, check, curve } from "../assets";
import { collabApps, collabContent, collabText } from "../constants";
import Button from "./Button";
import Section from "./Section";
import { LeftCurve, RightCurve } from "./design/Collaboration";

const Collaboration = () => {
  // const lottieRef = useRef(null);
  return (
    <Section crosses>
      <div className="container lg:flex">
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">
            Sua Gestão Pronta para o {}
            <span className="inline-block relative font-semibold">
              Futuro.
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
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
                      style={{ width: 32, height: 32 }}
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
              <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <img src={brainwaveSymbol} width={48} height={48} alt="brainwave" />
                </div>
              </div>
            </div>

            <ul>
              {collabApps.map((app, i) => (
                <li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${i * 45}`}
                >
                  <div
                    className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${
                      i * 45
                    } animate-pulse`}
                  >
                    <img src={app.icon} alt={app.title} width={app.height} height={app.height} className="m-auto" />
                  </div>
                </li>
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
