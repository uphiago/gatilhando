import React, { useEffect, useRef } from 'react';
import TypeIt from 'typeit';

const TypeItComponent = () => {
  const typeRef = useRef(null);

  useEffect(() => {
    const instance = new TypeIt(typeRef.current, {
      speed: 70,
      startDelay: 500,
      loop: true,
    })
      .type("We design stuff to Boost your Business.")
      .pause(1400)
      .delete(9)
      .type("Idea.")
      .pause(1200)
      .delete(1)
      .type("s.")
      .pause(1200)
      .delete(6)
      .pause(400)
      .type("Efficiency.")
      .pause(1200)
      .delete(11)
      .type("Strateegia.")
      .pause(1200)
      .delete(5)
      .type("gi.")
      .pause(1200)
      .delete(2)
      .type("y.")
      .pause(1200)
      .delete(9)
      .type("Innovation.")
      .pause(1200)
      .delete(11)
      .type("Results.")
      .pause(1200)
      .type(" Let's Do It..")
      .pause(800)
      .type(".")
      .pause(800)
      .delete(3)
      .type("!")
      .pause(20000)
      .type("!")
      .type("!")
      .go();

    return () => instance.destroy();
  }, []);

  return <div className="text-5xl font-bold h-24 w-full whitespace-nowrap" ref={typeRef}></div>;
};

export default TypeItComponent;
