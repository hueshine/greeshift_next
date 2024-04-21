"use client";

import React, { useRef } from "react";
import { Container, Grid } from "@mui/material";
import homeStyle from "../styles/home.module.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

// hooks
import { useIsomorphicLayoutEffect } from "@/hook";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const HomeFocusArea = () => {
  const cardRrefs = useRef([]);
  const focusAreaData = [
    {
      title: "Plastic waste management",
      text: "The project will mainly focus on two principles of circular economy: elimination of waste and pollution and circulate products and materials. GreenShift Nepal will work with youths and school children to generate awareness on plastic waste and support small businesses for the promotion of plastic alternative products. Likewise, it will also work with private waste enterprises in enhancing plastic waste collection and recycling. Additionally, the project will work in incorporating the principles of circular economy into the policies at local, provincial, and federal levels.  ",
      image: "./1a3b9e8c-88a0-449a-8c74-0f58aef99fe6.png",
    },
    {
      title:
        "Innovation around non-plastic packaging, and promotion of green enterprises ",
      text: "1600+ WW from marginalized communities, 11,019 Young people (10,800 youths, 180 youths, nine waste smart fellows, 10 YSB), Nine local governments and 207 government representatives, 3 provincial governments, 1 federal government, 5 youth entrepreneurial groups, 30,000 People (policymakers, civil society members, youth, local community members, and journalists) ",
      image: "./XDfMiMpv1kt6nn5JPDLG.jpg",
    },
    {
      title: "Supporting advocacy, data and policy changes ",
      text: "Circular economy is a concept that aims to minimize waste and promote sustainable use of natural resources through smarter product design, longer use, recycling, and regenerate nature. Circular economy is driven by three major principles which are: eliminate waste and pollution, circulate products and materials (at their highest values), and regenerate nature.",
      image: "./DQ99bEWiVjW8RQ8c8oVx.jpg",
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
      });

      ScrollTrigger.refresh();
    });

    if (window.innerWidth < 500) {
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
            style={{ backgroundColor: index % 2 === 0 ? "#377087" : "#1e607a" }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item md={4}>
                  <img src={val.image} alt="" />
                </Grid>

                <Grid item md={8}>
                  <h4>{val.title}</h4>
                  <p>{val.text}</p>
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
