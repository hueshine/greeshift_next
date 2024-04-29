// GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

// Hooks
import { useIsomorphicLayoutEffect } from "@/hook";

// GSAP Register Plugin
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const useSnoothScroll = () => {
  useIsomorphicLayoutEffect(() => {
    const gsapCtx = gsap.context(() => {
      ScrollSmoother.create({
        smooth: 2,
        effects: true,
        smoothTouch: 0.1,
      });
    });

    if (window.innerWidth < 1100) {
      gsapCtx.revert();
    }

    return () => gsapCtx.revert();
  }, []);
};

export default useSnoothScroll;
