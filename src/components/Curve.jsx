import React, { useEffect } from "react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/dist/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

const Curve = (props) => {
  useEffect(() => {
    let curveSection = document.querySelectorAll(".sectionSvg");

    curveSection.forEach((section) => {
      let path = section.querySelector("path");

      gsap.fromTo(
        path,
        {
          morphSVG:
            "M0,32L48,64C96,96,192,160,288,176C384,192,480,160,576,133.3C672,107,768,85,864,69.3C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
        },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "350% top",
            scrub: true,
          },
          morphSVG:
            "M0,0C584,0,632.6,0,960,0C1284.8,0,1337.4,0,1920,0V0L0,0L0,0z",
        }
      );
    });
  });
  return (
    <svg viewBox="0 0 1440 320" className="sectionSvg">
      <path
        fill={props.fill}
        id="curve"
        d="M0,32L48,64C96,96,192,160,288,176C384,192,480,160,576,133.3C672,107,768,85,864,69.3C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      ></path>
    </svg>
  );
};

export default Curve;
