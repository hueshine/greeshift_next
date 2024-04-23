// GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Lenis
import Lenis from "@studio-freight/lenis";

// Hooks
import { useIsomorphicLayoutEffect } from "@/hook";

// GSAP Register Plugin
gsap.registerPlugin(ScrollTrigger);

const useSnoothScroll = () => {
  useIsomorphicLayoutEffect(() => {
    let windowWidth = window.innerWidth;

    const gsapCtx = gsap.context(() => {
      const lenis = new Lenis({
        duration: windowWidth > 1024 ? 2.5 : 0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: true,
      });

      const raf = (time: any) => {
        lenis.raf(time);
        ScrollTrigger.update();
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    });

    return () => gsapCtx.revert();
  }, []);
};

export default useSnoothScroll;
