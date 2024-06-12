import { useRef } from "react";

import { Container, Grid } from "@mui/material";
import homeStyle from "../styles/home.module.scss";
// import Button from "@/components/Button/Button";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// hooks
import { useIsomorphicLayoutEffect } from "@/hook";
import { useRouter } from "next/router";

const HomeFocusArea = ({ focusData }) => {
  const router = useRouter;
  let lang = router.locale;
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  let data = focusData.areas;
  const cardRrefs = useRef([]);

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

    if (window.innerWidth < 500) {
      ctx.revert();
    }

    return () => ctx.revert();
  }, []);

  return (
    <div className="wrap">
      {data.map((val, index) => {
        return (
          <div
            className={homeStyle.focusCard}
            key={index}
            ref={(el) => (cardRrefs.current[index] = el)}
            style={{ backgroundColor: index % 2 === 0 ? "#F0EBE3" : "#F6F5F2" }}
          >
            <Container maxWidth={"lg"}>
              <Grid container spacing={1}>
                <Grid item md={4} xs={12}>
                  <div className={homeStyle.focusCard_image}>
                    <img
                      src="/partners.svg"
                      alt=""
                      className={`${homeStyle.lineart} lineart`}
                    />
                    <img src={`${imageUrl}/${val.homepage_image}`} alt="" />
                  </div>
                </Grid>

                <Grid item md={8} xs={12}>
                  <div className={homeStyle.focusCard_text}>
                    <h4>{lang == "en" ? val.title : val.title_np}</h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: lang == "en" ? val.text : val.text_np,
                      }}
                    />
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
