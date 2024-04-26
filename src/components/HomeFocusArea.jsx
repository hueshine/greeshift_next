import { useRef } from "react";

import { Container, Grid } from "@mui/material";
import homeStyle from "../styles/home.module.scss";
import Button from "@/components/Button/Button";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// hooks
import { useIsomorphicLayoutEffect } from "@/hook";

const HomeFocusArea = () => {
  const cardRrefs = useRef([]);
  const focusAreaData = [
    {
      title: "Plastic waste management",
      text: "The project will mainly focus on two principles of circular economy: elimination of waste and pollution and circulate products and materials. GreenShift Nepal will work with youths and school children to generate awareness on plastic waste and support small businesses for the promotion of plastic alternative products. Likewise, it will also work with private waste enterprises in enhancing plastic waste collection and recycling. Additionally, the project will work  ",
      image: "/chitwna.jpeg",
    },
    {
      title:
        "Innovation around non-plastic packaging, and promotion of green enterprises ",
      text: "1600+ WW from marginalized communities, 11,019 Young people (10,800 youths, 180 youths, nine waste smart fellows, 10 YSB), Nine local governments and 207 government representatives, 3 provincial governments, 1 federal government, 5 youth entrepreneurial groups, 30,000 People (policymakers, civil society members, youth, local community members, and journalists) ",
      image: "/focusarea2.png",
    },
    {
      title: "Supporting advocacy, data and policy changes ",
      text: "Circular economy is a concept that aims to minimize waste and promote sustainable use of natural resources through smarter product design, longer use, recycling, and regenerate nature. Circular economy is driven by three major principles which are: eliminate waste and pollution, circulate products and materials (at their highest values), and regenerate nature.",
      image: "/focusarea3.png",
    },
  ];

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      cardRrefs.current.forEach((ref, index) => {
        let start;

        let windowWidth = window.innerWidth;

        if (windowWidth < 1720) {
          start = 80 - index * 35;
        } else start = 100 - index * 42;

        gsap.fromTo(
          ref,
          {
            opacity: 1,
            yPercent: -index * 4,
          },
          {
            duration: 1,
            scrollTrigger: {
              trigger: ref,
              start: `${start}% 65%`,
              endTrigger: ".wrap",
              end: "bottom bottom",
              pin: true,
              pinSpacing: false,
              scrub: true,
            },
            yPercent: -25,
          }
        );

        let bgImage = ref.querySelector(".lineart");

        gsap.to(bgImage, {
          rotate: 90,
          scale: 1,
          opacity: 0.6,
          scrollTrigger: {
            trigger: ref,
            start: "top center",
            scrub: true,
          },
        });
      });

      ScrollTrigger.refresh();
    });

    console.log(window.innerWidth);
    if (window.innerWidth < 500) {
      console.log("hello");
      ctx.revert();
    }

    return () => ctx.revert();
  }, []);

  return (
    <div className="wrap">
      {focusAreaData.map((val, index) => {
        return (
          <div
            className={homeStyle.focusCard}
            key={index}
            ref={(el) => (cardRrefs.current[index] = el)}
            style={{ backgroundColor: index % 2 === 0 ? "#5abdc1" : "#33b2b6" }}
          >
            <Container maxWidth={"lg"}>
              <Grid container spacing={1}>
                <Grid item md={4}>
                  <div className={homeStyle.focusCard_image}>
                    <img
                      src="/partners.svg"
                      alt=""
                      className={`${homeStyle.lineart} lineart`}
                    />
                    <img src={val.image} alt="" />
                  </div>
                </Grid>

                <Grid item md={8}>
                  <div className={homeStyle.focusCard_text}>
                    <h4>{val.title}</h4>
                    <p>{val.text}</p>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        );
      })}
    </div>
  );
};

export default HomeFocusArea;
