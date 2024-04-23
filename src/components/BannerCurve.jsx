import gsap from "gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/dist/MorphSVGPlugin";

import { useIsomorphicLayoutEffect } from "@/hook";

const BannerWave = () => {
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "#initialCurve",
        {
          morphSVG:
            "M1440,0l-60,0c-60,0-180,0-300,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0l0,96l60-10.7C120,75,240,53,360,42.7C480,32,600,32,720,69.3C840,107,960,181,1080,202.7c120,21.3,240-10.7,300-26.7l60-16V0z",
        },
        {
          scrollTrigger: {
            trigger: ".svgCurve",
            start: "top 80%",
            end: "350% top",
            scrub: true,
          },
          morphSVG:
            "M0,0C584,0,632.6,0,960,0C1284.8,0,1337.4,0,1920,0V0L0,0L0,0z",
        }
      );

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  });

  return (
    <svg viewBox="0 0 1440 320" className="svgCurve">
      <path
        fill="#33b2b6"
        id="initialCurve"
        d="M1440,0l-60,0c-60,0-180,0-300,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0l0,96l60-10.7
        C120,75,240,53,360,42.7C480,32,600,32,720,69.3C840,107,960,181,1080,202.7c120,21.3,240-10.7,300-26.7l60-16V0z"
      ></path>
    </svg>
  );
};

export default BannerWave;
