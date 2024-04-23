import { Container } from "@mui/material";

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import EastIcon from "@mui/icons-material/East";

import { useIsomorphicLayoutEffect } from "@/hook";

import gsap from "gsap";

import { Jar, WaterJar, TakeAway, Plastic, Glass, Bottle } from "./HeroSvg";

import homeStyle from "../styles/home.module.scss";

const Hero = () => {
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
    <section className={homeStyle.hero}>
      <div className={homeStyle.hero_svg}>
        <div className={homeStyle.hero_svg_left}>
          <HtmlTooltip
            title={
              <div className="tooltip">
                <h5>Circular Economy</h5>
                <p>
                  The circular economy is a system where materials never become
                  waste and nature is regenerated. In a circular economy,
                  products and materials are kept in circulation through
                  processes like maintenance, reuse, refurbishment,
                  remanufacture, recycling, and composting.{" "}
                </p>
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
                <h5>Net-Zero</h5>
                <p>
                  Net zero means cutting carbon emissions to a small amount of
                  residual emissions that can be absorbed and durably stored by
                  nature and other carbon dioxide removal measures, leaving zero
                  in the atmosphere.
                </p>
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
                <h5>Plastic Pollution</h5>
                <p>
                  Plastic pollution, accumulation in the environment of
                  synthetic plastic products to the point that they create
                  problems for wildlife and their habitats as well as for human
                  populations.
                </p>
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
                <h5>Recycling</h5>
                <p>
                  Recycling is the process of collecting and processing
                  materials that would otherwise be thrown away as trash and
                  turning them into new products. Recycling can benefit your
                  community, the economy, and the environment.
                </p>
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
                <h5>#GreenShift</h5>
                <p>
                  The #GreenShift campaign, an initiative under the GreenShift
                  Nepal project, aims to promote a just transition towards
                  Circular Economy among youths and children. It provides them
                  with dynamic platforms to express their creativity. Through
                  avenues like slogans, art, photography, and posters, this
                  campaign empowers young minds to showcase their talents while
                  simultaneously deepening their understanding of environmental
                  sustainability, plastic pollution, and the principles of
                  circular economy.
                </p>
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
                <h5>Climate Smart Schools</h5>
                <p>
                  Climate Smart Schools are a part of the GreenShift project,
                </p>
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
          <h1>
            How <span>Green</span> Are You?
          </h1>

          <div className={homeStyle.hero_btn}>
            <div className={homeStyle.icon}>
              <EastIcon />
            </div>
            <span>Take a Quiz </span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
