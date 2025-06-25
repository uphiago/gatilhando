import React, { useEffect, useRef } from "react";
import TypeIt from "typeit";

const TypeItComponent = () => {
  const typeRef = useRef(null);

  useEffect(() => {
    const instance = new TypeIt(typeRef.current, {
      speed: 80,
      startDelay: 500,
      loop: false,
    })
      .type("We design Software that Boosts your Business.")
      .pause(1400)
      .delete(9)
      .type("Efficiency.")
      .pause(1000)
      .delete(11)
      .type("Strateegia.")
      .pause(1000)
      .delete(5)
      .type("gi.")
      .pause(1000)
      .delete(2)
      .type("y.")
      .pause(1400)
      .delete(9)
      .type("Innovation.")
      .pause(1200)
      .delete(11)
      .type("Idea.")
      .pause(1200)
      .delete(1)
      .type("s.")
      .pause(1200)
      .type(" Let's Do It")
      .pause(3)
      .type("!")
      .go();

    return () => instance.destroy();
  }, []);

  return (
    <div
      className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-bold w-full whitespace-normal break-words line-clamp-3 overflow-hidden -mt-4 h-[12rem]"
      ref={typeRef}
    ></div>
  );
};

export default TypeItComponent;
