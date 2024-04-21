import React, { useEffect } from "react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/dist/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);
const BannerWave = (props) => {
  useEffect(() => {
    gsap.fromTo(
      "#initialCurve",
      {
        morphSVG:
          "M0 119.95c582.58,0 635.23,0.05 960,0.05 324.77,0 377.43,-0.05 960,-0.05l0 0.05 -1920 0 0 -0.05z",
      },
      {
        scrollTrigger: {
          trigger: "svg",
          start: "top 80%",
          end: "bottom 35%",
          scrub: true,
        },
        morphSVG: "#initialCurve",
      }
    );
  });
  return (
    <svg viewBox="0 0 1920 120" preserveAspectRatio="none">
      <path
        fill={props.fill}
        id="initialCurve"
        d="M0 119.83c582.58,0 635.23,-119.83 960,-119.83 324.77,0 377.43,119.83 960,119.83l0 0.17 -1920 0 0 -0.17z"
      ></path>
    </svg>
  );
};

export default BannerWave;
