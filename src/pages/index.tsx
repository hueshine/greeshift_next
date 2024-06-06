import Head from "next/head";

import { Container, Grid } from "@mui/material";

// Sections
import Hero from "@/components/Hero";
import ImpactSlide from "@/components/ImpactSlide";
import Partners from "../components/Partners/Partners";
import HomeFocusArea from "../components/HomeFocusArea";
import MapComponent from "../components/MapComponent/MapComponent";

import Button from "@/components/Button/Button";

import homeStyle from "@/styles/home.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Link from "next/link";

interface DashboardData {}

interface FocusData {}

interface HomeData {
  og_image: any;
  homepage: any;
  impacts: any;
  banners: any;
}

interface NewsItem {
  title: string;
  date: string;
  text: string;
  image: string;
}

interface NewsData {
  news: NewsItem[];
}

export default function Home({
  apiMapData,
  apiFocusArea,
  apiNewsData,
  apiHomeData,
}: {
  apiMapData: DashboardData;
  apiFocusArea: FocusData;
  apiNewsData: NewsData;
  apiHomeData: HomeData;
}) {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";
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
        <meta
          property="og:image"
          content={`${imageUrl}/${apiHomeData.og_image}`}
        />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>

      <section className={homeStyle.heroAbout}>
        <Hero data={apiHomeData.banners} />
        <section className={homeStyle.introAbout}>
          <div className={homeStyle.introAbout_svg}>
            <img src="./introsvg.svg" alt="" />
          </div>

          <Container id="introContainer" maxWidth={"md"}>
            <div className={homeStyle.introAbout_text}>
              <div
                dangerouslySetInnerHTML={{
                  __html: apiHomeData.homepage.impacts,
                }}
              />
            </div>
          </Container>

          <Container className={homeStyle.impact_slider} maxWidth={"lg"}>
            <ImpactSlide data={apiHomeData.impacts} />
          </Container>
        </section>
      </section>

      <section className={homeStyle.focus_area}>
        <h2 style={{ textAlign: "center" }}>
          <span>{apiHomeData.homepage.area_title}</span>
        </h2>

        <Container maxWidth="lg" style={{ textAlign: "center" }}>
          <p>{apiHomeData.homepage.area_description}</p>
        </Container>

        <div className={homeStyle.focusBox}>
          <HomeFocusArea focusData={apiFocusArea} />
        </div>
      </section>

      <div className={homeStyle.home_map}>
        <MapComponent mapData={apiMapData} />
      </div>

      <section className={homeStyle.home_news}>
        <Container maxWidth="lg">
          <div className={homeStyle.home_news_flex}>
            <div className={homeStyle.home_news_title}>
              <div
                dangerouslySetInnerHTML={{
                  __html: apiHomeData.homepage.news,
                }}
              />

              <Button text={"More News & Updates"} link={"/news-and-updates"} />
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
                {apiNewsData.news.map((val, index) => {
                  let link = val.title.toLowerCase().replace(/\s+/g, "-");
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

                          <Link href={`/news-and-updates/${link}`}>
                            Read More
                          </Link>
                        </div>
                        <div className={homeStyle.news_wrap_image}>
                          <img src={`${imageUrl}/${val.image}`} alt="" />
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
        <Partners data={apiHomeData} />
      </section>
    </>
  );
}

export async function getStaticProps() {
  const resMap = await fetch(
    "https://app.greenshift.creasion.org/api/dashboard"
  );
  const apiMapData = await resMap.json();

  const focusArea = await fetch("https://app.greenshift.creasion.org/api/area");
  const apiFocusArea = await focusArea.json();

  const news = await fetch("https://app.greenshift.creasion.org/api/news");
  const apiNewsData = await news.json();

  const homeData = await fetch(
    "https://app.greenshift.creasion.org/api/homepage"
  );
  const apiHomeData = await homeData.json();

  return {
    props: {
      apiMapData,
      apiFocusArea,
      apiNewsData,
      apiHomeData,
    },
    revalidate: 30,
  };
}
