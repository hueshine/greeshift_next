import Head from "next/head";
import { useRouter } from "next/router";

import { Container, Grid } from "@mui/material";

// Sections
import Hero from "@/components/Hero";
import ImpactSlide from "@/components/ImpactSlide";
import Partners from "../components/Partners/Partners";
import HomeFocusArea from "../components/HomeFocusArea";
import MapComponent from "../components/MapComponent/MapComponent";
import HomePopOver from "../components/HomePopOver";

import Button from "@/components/Button/Button";

import homeStyle from "@/styles/home.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Link from "next/link";
import { url } from "inspector";

interface DashboardData {}

interface FocusData {}

interface HomeData {
  og_image: any;
  popups: any;
  homepage: any;
  impacts: any;
  banners: any;
  sliders: any;
}

interface NewsItem {
  title: string;
  title_np: string;
  date: string;
  text: string;
  text_np: string;
  image: string;
}

interface NewsData {
  news: NewsItem[];
}

interface HeroSlider {
  title: string;
  title_np: string;
  image: string;
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
  const router = useRouter();
  let lang = router.locale;
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

      {apiHomeData.popups.length > 0 && (
        <HomePopOver data={apiHomeData.popups} />
      )}

      <section className={homeStyle.heroAbout}>
        <Swiper
          spaceBetween={30}
          speed={1500}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
          className={homeStyle.hero_slider}
        >
          <SwiperSlide>
            <Hero data={apiHomeData.banners} text={apiHomeData.homepage} />
          </SwiperSlide>

          {apiHomeData.sliders.map((val: HeroSlider, index: number) => {
            return (
              <SwiperSlide key={index}>
                <div className={homeStyle.hero_image}>
                  <div>
                    <img src={`${imageUrl}/${val.image}`} alt="" />

                    <h1>{lang == "en" ? val.title : val.title_np}</h1>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <section className={homeStyle.introAbout}>
          <div className={homeStyle.introAbout_svg}>
            <img src="./introsvg.svg" alt="" />
          </div>

          <Container id="introContainer" maxWidth={"md"}>
            <div className={homeStyle.introAbout_text}>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    lang == "en"
                      ? apiHomeData.homepage.impacts
                      : apiHomeData.homepage.impacts_np,
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
          <span>
            {lang == "en"
              ? apiHomeData.homepage.area_title
              : apiHomeData.homepage.area_title_np}
          </span>
        </h2>

        <Container maxWidth="lg" style={{ textAlign: "center" }}>
          <p>
            {lang == "en"
              ? apiHomeData.homepage.area_description
              : apiHomeData.homepage.area_description_np}
          </p>
        </Container>

        <div className={homeStyle.focusBox}>
          <HomeFocusArea focusData={apiFocusArea} />
        </div>
      </section>

      <div className={homeStyle.home_map}>
        <MapComponent mapData={apiMapData} mapText={apiHomeData} />
      </div>

      <section className={homeStyle.home_news}>
        <Container maxWidth="lg">
          <div className={homeStyle.home_news_flex}>
            <div className={homeStyle.home_news_title}>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    lang == "en"
                      ? apiHomeData.homepage.news
                      : apiHomeData.homepage.news_np,
                }}
              />

              <Button
                text={
                  lang == "en" ? "More News & Updates" : "अझ धेरै हेर्नुहोस्"
                }
                link={"/news-and-updates"}
              />
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
                          <h6>{lang == "en" ? val.title : val.title_np}</h6>

                          <span>{val.date}</span>

                          <div
                            className={homeStyle.news_wrap_text_description}
                            dangerouslySetInnerHTML={{
                              __html: lang == "en" ? val.text : val.text_np,
                            }}
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
