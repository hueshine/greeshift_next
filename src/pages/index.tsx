import Head from "next/head";

import { Container, Grid } from "@mui/material";

// Sections
import Hero from "@/components/Hero";
import ImpactSlide from "@/components/ImpactSlide";
import Partners from "../components/Partners/Partners";
import HomeFocusArea from "../components/HomeFocusArea";
import MapComponent from "../components/MapComponent/MapComponent";

import Button from "@/components/Button/Button";

import BannerCurve from "@/components/BannerCurve";
import Curve from "@/components/Curve";

import homeStyle from "@/styles/home.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Link from "next/link";
import { useIsomorphicLayoutEffect } from "@/hook";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import newsJSON from "./news-and-updates/data.json";

let newsData = newsJSON.news;

export default function Home() {
  return (
    <>
      <Head>
        <title>GREENSHIFT NEPAL</title>
        <meta
          name="description"
          content="CIRCULARITY OF PLASTIC WASTE FOR NET-ZERO CARBON NEPAL"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="./focusarea1.png" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <Hero />
      <section className={homeStyle.introAbout}>
        <div className={homeStyle.introAbout_svg}>
          <img src="./introsvg.svg" alt="" />
        </div>

        <Container id="introContainer" maxWidth={"md"}>
          <div className={homeStyle.introAbout_text}>
            <h2>
              Circularity of Plastic Waste for <span>Net-Zero Carbon</span>{" "}
              Nepal
            </h2>

            <p>
              GreenShift Nepal project is funded by the European Union to
              promote a just transition to circular economy. GreenShift Nepal is
              a four-year project which will be implemented in 9 municipalities
              – 3 in each of Bagmati, Madhesh, and Lumbini provinces.
            </p>

            <p>
              The project implementation is led by{" "}
              <a href="" target="_blank">
                CREASION
              </a>{" "}
              through the consortium partners{" "}
              <a href="" target="_blank">
                Restless Development
              </a>
              , and
              <a href="" target="_blank">
                {" "}
                Youth Innovation Lab.
              </a>
            </p>
          </div>
        </Container>

        <Container className={homeStyle.impact_slider} maxWidth={"lg"}>
          <ImpactSlide />
        </Container>
      </section>

      <section className={homeStyle.focus_area}>
        <h2 style={{ textAlign: "center" }}>
          <span>Focus Areas</span>
        </h2>

        <Container maxWidth="lg" style={{ textAlign: "center" }}>
          <p>
            GreenShift Nepal will work with waste enterprises, SMEs, CSOs of
            waste workers, youths, school children, and three tiers of
            government in the promotion of circular economy of plastics.
          </p>
        </Container>

        <div className={homeStyle.focusBox}>
          <HomeFocusArea />
        </div>
      </section>

      <MapComponent />

      <section className={homeStyle.home_news}>
        <Container maxWidth="lg">
          <div className={homeStyle.home_news_flex}>
            <div className={homeStyle.home_news_title}>
              <h2>News & Updates</h2>
              <p>
                GreenShift Nepal will work with waste enterprises, SMEs, CSOs of
                waste workers, youths, school children, and three tiers of
                government in the promotion of circular economy of plastics.
              </p>

              <Button text={"More News & Updates"} link={"/"} />
            </div>

            <div className={homeStyle.home_news_slide}>
              <Swiper
                spaceBetween={30}
                speed={1500}
                autoplay={{
                  delay: 5500,
                  disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay]}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                }}
              >
                {newsData.map((val, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className={homeStyle.news_wrap}>
                        <div className={homeStyle.news_wrap_text}>
                          <h6>{val.title}</h6>

                          <span>{val.date}</span>

                          <div
                            className={homeStyle.news_wrap_text_description}
                            dangerouslySetInnerHTML={{ __html: val.text }}
                          />

                          <Link href={"/"}>Read More</Link>
                        </div>
                        <div className={homeStyle.news_wrap_image}>
                          <img src={val.image} alt="" />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </Container>
      </section>
      <section className={homeStyle.partners}>
        <Partners />
      </section>
    </>
  );
}
