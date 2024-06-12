import { Container } from "@mui/material";

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import EastIcon from "@mui/icons-material/East";

import { useIsomorphicLayoutEffect } from "@/hook";

import { useRouter } from "next/router";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";

import { Jar, WaterJar, TakeAway, Plastic, Glass, Bottle } from "./HeroSvg";

import homeStyle from "../styles/home.module.scss";
import Link from "next/link";

const Hero = ({ data }) => {
  const router = useRouter();
  let lang = router.locale;

  useIsomorphicLayoutEffect(() => {
    // Define a function to create a random value within a range
    function random(min, max) {
      const delta = max - min;
      return (direction = 1) => (min + delta * Math.random()) * direction;
    }

    // Function to animate rotation of a target element
    function rotate(target, direction, randomAngle, randomTime2, randomDelay) {
      return gsap.to(target, randomTime2(), {
        rotation: randomAngle(direction),
        delay: randomDelay(),
        onComplete: rotate,
        onCompleteParams: [
          target,
          direction * -1,
          randomAngle,
          randomTime2,
          randomDelay,
        ],
      });
    }

    // Function to animate movement along the X-axis of a target element
    function moveX(target, direction, randomX, randomTime, randomDelay) {
      return gsap.to(target, randomTime(), {
        x: randomX(direction),
        onComplete: moveX,
        onCompleteParams: [
          target,
          direction * -1,
          randomX,
          randomTime,
          randomDelay,
        ],
      });
    }

    // Function to animate movement along the Y-axis of a target element
    function moveY(target, direction, randomY, randomTime, randomDelay) {
      return gsap.to(target, randomTime(), {
        y: randomY(direction),
        onComplete: moveY,
        onCompleteParams: [
          target,
          direction * -1,
          randomY,
          randomTime,
          randomDelay,
        ],
      });
    }

    const gsapCtx = gsap.context(() => {
      const randomX = random(20, 40);
      const randomY = random(30, 50);
      const randomDelay = random(2, 5);
      const randomTime = random(3, 6);
      const randomTime2 = random(5, 10);
      const randomAngle = random(-90, 180);

      const cans = gsap.utils.toArray(".element > svg");
      const tweens = []; // Store tweens to control them later

      cans.forEach((can) => {
        gsap.set(can, {
          x: randomX(-1),
          y: randomX(1),
          rotation: randomAngle(-1),
        });

        const tweenX = moveX(can, 1, randomX, randomTime, randomDelay);
        const tweenY = moveY(can, -1, randomY, randomTime, randomDelay);
        const tweenRotate = rotate(
          can,
          1,
          randomAngle,
          randomTime2,
          randomDelay
        );

        tweens.push(tweenX, tweenY, tweenRotate);
      });

      cans.forEach((can) => {
        can.addEventListener("mouseenter", () => {
          tweens.forEach((tween) => tween.pause());
        });

        can.addEventListener("mouseleave", () => {
          tweens.forEach((tween) => tween.resume());
        });

        can.addEventListener("click", () => {
          tweens.forEach((tween) => tween.pause());
        });
      });
    });

    return () => gsapCtx.revert();
  });

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      const split = new SplitText(".heading", {
        type: "lines",
        linesClass: "split-line",
      });

      const lines = document.querySelectorAll(".split-line");

      lines.forEach((line, index) => {
        const direction = index % 2 === 0 ? -50 : 50;

        gsap.to(line, {
          yPercent: direction,
          opacity: 0,
          scale: 1.3,
          duration: 1,
          scrollTrigger: {
            trigger: "#hero",
            start: "bottom 95%",
            end: "bottom 20%",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  });

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));
  return (
    <section className={homeStyle.hero} id="hero">
      <div className={homeStyle.hero_svg}>
        <div className={homeStyle.hero_svg_left}>
          <HtmlTooltip
            title={
              <div className="tooltip">
                <h5>{lang == "en" ? data[0].title : data[0].title_np}</h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: lang == "en" ? data[0].text : data[0].text_np,
                  }}
                />
              </div>
            }
          >
            <div className={`${homeStyle.jar} element`}>
              <Jar />
            </div>
          </HtmlTooltip>

          <HtmlTooltip
            title={
              <div className="tooltip">
                <h5>{lang == "en" ? data[1].title : data[1].title_np}</h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: lang == "en" ? data[1].text : data[1].text_np,
                  }}
                />
              </div>
            }
          >
            <div className={`${homeStyle.takeaway} element`}>
              <TakeAway />
            </div>
          </HtmlTooltip>

          <HtmlTooltip
            title={
              <div className="tooltip">
                <h5>{lang == "en" ? data[2].title : data[2].title_np}</h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: lang == "en" ? data[2].text : data[2].text_np,
                  }}
                />
              </div>
            }
          >
            <div className={`${homeStyle.waterjar} element`}>
              <WaterJar />
            </div>
          </HtmlTooltip>
        </div>

        <div className={homeStyle.hero_svg_right}>
          <HtmlTooltip
            title={
              <div className="tooltip">
                <h5>{lang == "en" ? data[3].title : data[3].title_np}</h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: lang == "en" ? data[3].text : data[3].text_np,
                  }}
                />
              </div>
            }
          >
            <div className={`${homeStyle.plastic} element`}>
              <Plastic />
            </div>
          </HtmlTooltip>

          <HtmlTooltip
            title={
              <div className="tooltip">
                <h5>{lang == "en" ? data[4].title : data[4].title_np}</h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: lang == "en" ? data[4].text : data[4].text_np,
                  }}
                />
              </div>
            }
          >
            <div className={`${homeStyle.glass} element`}>
              <Glass />
            </div>
          </HtmlTooltip>

          <HtmlTooltip
            title={
              <div className="tooltip">
                <h5>{lang == "en" ? data[5].title : data[5].title_np}</h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: lang == "en" ? data[5].text : data[5].text_np,
                  }}
                />
              </div>
            }
          >
            <div className={`${homeStyle.bottle} element`}>
              <Bottle />
            </div>
          </HtmlTooltip>
        </div>
      </div>

      <Container maxWidth="xl">
        <div className={homeStyle.text}>
          <h1 className="heading">
            How <span>Green</span> Are You?
          </h1>

          <Link href={"/quiz"}>
            <div className={homeStyle.hero_btn}>
              <div className={homeStyle.icon}>
                <EastIcon />
              </div>
              <span>{lang == "en" ? "Take a Quiz" : "Take a Quiz"} </span>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
