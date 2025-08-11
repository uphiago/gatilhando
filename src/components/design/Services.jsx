import { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";

import { dotmindlabsSymbolWhite, gradient, loading, pause, play } from "../../assets";
import ChatBubbleWing from "../../assets/svg/ChatBubbleWing";
import { useTranslation } from "../../locale/Translation";

export const Gradient = () => {
  const { t } = useTranslation();
  return (
    <div className="absolute top-0 -left-[5rem] w-[56.625rem] h-[56.625rem] opacity-25 mix-blend-color-dodge pointer-events-none">
      <img
        className="absolute top-1/2 left-1/2 w-[79.5625rem] max-w-[79.5625rem] h-[88.5625rem] -translate-x-1/2 -translate-y-1/2"
        src={gradient}
        width={1417}
        height={1417}
        alt={t("services.ui.gradientAlt")}
      />
    </div>
  );
};

export const PhotoChatMessage = () => {
  const { t } = useTranslation();
  return (
    <div className="absolute top-8 right-8 w-[18rem] h-[6rem] py-6 px-8 bg-black rounded-t-xl rounded-bl-xl font-code text-base lg:top-16 lg:right-[8.75rem]">
      <Typewriter
        options={{
          strings: t("services.photo.messages"),
          autoStart: true,
          loop: true,
        }}
      />
      <ChatBubbleWing className="absolute left-full bottom-0" />
    </div>
  );
};

export const VideoChatMessage = ({ isPlaying }) => {
  const { t } = useTranslation();
  return (
    <div className="absolute top-8 left-[3.125rem] w-full max-w-[14rem] pt-2.5 pr-2.5 pb-7 pl-5 bg-black rounded-t-xl rounded-br-xl font-code text-base md:max-w-[17.5rem]">
      <Typewriter
        options={{
          strings: isPlaying ? [t("services.video.playing")] : [t("services.video.done")],
          cursor: isPlaying ? "|" : "",
          autoStart: true,
          deleteSpeed: isPlaying ? "natural" : Infinity,
          loop: isPlaying,
        }}
      />
      <div className="absolute left-5 -bottom-[1.125rem] flex items-center justify-center w-[2.25rem] h-[2.25rem] bg-black rounded-[0.75rem]">
        <img src={dotmindlabsSymbolWhite} width={26} height={26} alt={t("services.video.brandAlt")} />
      </div>
      <div className="tagline absolute right-2.5 bottom-1 text-[0.625rem] text-n-3 uppercase">
        {isPlaying ? (
          <img
            src={loading}
            alt={t("services.video.loadingAlt")}
            className="w-4 h-4 animate-spin pointer-events-none select-none"
          />
        ) : (
          <span>{t("services.video.justNow")}</span>
        )}
      </div>
      <ChatBubbleWing className="absolute right-full bottom-0 -scale-x-100" pathClassName="bg-black" />
    </div>
  );
};

export const VideoBar = ({ isPlaying, setIsPlaying }) => {
  const { t } = useTranslation();
  const [counter, setCounter] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter >= 100) setCounter(0);
      if (!isPlaying) return clearInterval(interval);

      progressRef.current.style.width = `${counter}%`;
      setCounter((oldCounter) => oldCounter + 0.5);
    }, 100);

    return () => clearInterval(interval);
  }, [counter, isPlaying]);

  return (
    <div className="absolute left-0 bottom-0 w-full flex items-center p-6">
      <img
        src={isPlaying ? pause : play}
        width={24}
        height={24}
        alt={isPlaying ? t("services.controls.pauseAlt") : t("services.controls.playAlt")}
        className="object-contain mr-3 cursor-pointer"
        onClick={() => setIsPlaying(!isPlaying)}
      />

      <div className="flex-1 bg-black">
        <div ref={progressRef} className="h-0.5 bg-white transition-all" />
      </div>
    </div>
  );
};
