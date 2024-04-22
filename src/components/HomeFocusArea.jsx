"use client";

import React from "react";
import { Container, Grid } from "@mui/material";
import homeStyle from "../styles/home.module.scss";
import Button from "@/components/Button/Button";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// hooks
import { useIsomorphicLayoutEffect } from "@/hook";

const HomeFocusArea = () => {
  const focusAreaData = [
    {
      title: "<h4>Plastic <span>waste management</span></h4>",
      text: "The project will mainly focus on two principles of circular economy: elimination of waste and pollution and circulate products and materials. GreenShift Nepal will work with youths",
      image: "/chitwna.jpeg",
    },
    {
      title:
        "<h4>Innovation around <span>non-plastic packaging</span>, and promotion of green enterprises</h4> ",
      text: "1600+ WW from marginalized communities, 11,019 Young people (10,800 youths, 180 youths, nine waste smart fellows, 10 YSB), Nine local governments and 207 government representatives,",
      image: "./focusarea2.png",
    },
    {
      title:
        "<h4><span>Supporting advocacy</span>, data and policy changes</h4> ",
      text: "Circular economy is a concept that aims to minimize waste and promote sustainable use of natural resources through smarter product design, longer use, recycling, and regenerate nature.",
      image: "/focusarea3.png",
    },
  ];

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      const mainBox = document.querySelector("#wrap");
      const boxItems = gsap.utils.toArray(".scrollBox");

      gsap.to(boxItems, {
        xPercent: -64.5 * boxItems.length,
        ease: "sine.out",
        scrollTrigger: {
          trigger: mainBox,
          pinnedContainer: mainBox,
          pin: true,
          scrub: 1,
          snap: false,
          end: () => `+=${mainBox?.offsetWidth}, bottom`,
        },
      });
    });

    if (window.innerWidth < 500) {
      ctx.revert();
    }

    return () => ctx.revert();
  }, []);

  return (
    <section className={homeStyle.focus_area2} id="wrap">
      <Container maxWidth={"xl"}>
        <div className={homeStyle.focus_area_title}>
          <Grid container>
            <Grid item md={2.5}>
              <div className={homeStyle.focus_area_title_box}>
                <h3>FOCUS AREAS: Key Components of Green Shift </h3>
                <p>
                  The project will mainly focus on two principles of circular
                  economy: elimination of waste and pollution and circulate
                  products and materials.
                </p>

                <Button />
              </div>
            </Grid>
          </Grid>
        </div>

        <div className={homeStyle.verticalScroll}>
          {focusAreaData.map((val, index) => {
            return (
              <div className={`${homeStyle.scrollBox} scrollBox`} key={index}>
                <div
                  className={homeStyle.focusBox}
                  style={{
                    backgroundImage: `url(${val.image})`,
                  }}
                ></div>
                <div className={homeStyle.focusBox_title}>
                  <div dangerouslySetInnerHTML={{ __html: val.title }} />

                  <p>{val.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default HomeFocusArea;
