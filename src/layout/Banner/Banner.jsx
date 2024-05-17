import style from "./banner.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useIsomorphicLayoutEffect } from "@/hook";

const Banner = ({ title, parent, image }) => {
  gsap.registerPlugin(ScrollTrigger);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("#banner h2", {
        y: 30,
        scale: 1.1,
        scrollTrigger: {
          trigger: "#banner",
          start: "top top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  });

  return (
    <>
      <div
        id="banner"
        className={style.header}
        style={image ? { backgroundImage: `url(${image})` } : {}}
      >
        <div className={style.inner_header}>
          <div className={style.text}>
            <h6>{parent}</h6>
            <h2>{title}</h2>
          </div>
        </div>

        <div>
          <svg
            className={style.waves}
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className={style.parallax}>
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Banner;
