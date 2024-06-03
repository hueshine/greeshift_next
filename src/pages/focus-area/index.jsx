import { Container, Grid } from "@mui/material";

import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import style from "./style.module.scss";

import Fancybox from "../../components/Fancybox";

const FocusArea = ({ apiData }) => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  return (
    <>
      <Head>
        <title>Focus Areas | Green Shift Nepal</title>
        <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <Banner title={apiData.banner_text} parent={"About"} />

      {apiData.areas.map((val, index) => {
        return (
          <section
            className={style.focuarea_main}
            key={index}
            id={`focusarea${index}`}
          >
            <Container maxWidth="lg" className={style.focus_container}>
              <div className={style.title}>
                <div className={style.title_index}>
                  <h1>0{index + 1}</h1>
                  <span>Focus Area </span>
                </div>
                <h3>{val.title}</h3>
              </div>

              <div
                className={style.text}
                dangerouslySetInnerHTML={{ __html: val.text }}
              />

              <Grid container spacing={5}>
                <Grid item md={6}>
                  <div className={style.output}>
                    <div className={style.output_title}>
                      <img src="/projected_output.svg" alt="" />
                      <h4>Intended Output</h4>
                    </div>

                    <div
                      className={style.output_text}
                      dangerouslySetInnerHTML={{ __html: val.output }}
                    />
                  </div>
                </Grid>

                <Grid item md={6}>
                  <div className={style.output}>
                    <div className={style.output_title}>
                      <img src="/activities.svg" alt="" />
                      <h4>Activities</h4>
                    </div>

                    <div
                      className={style.output_text}
                      dangerouslySetInnerHTML={{ __html: val.activities }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Container>

            <Fancybox
              options={{
                Carousel: {
                  infinite: false,
                },
              }}
            >
              <Swiper
                className={style.image_slide_wrap}
                spaceBetween={15}
                speed={12000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay]}
                freeMode={true}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                }}
              >
                {val.image.map((img, index) => {
                  return (
                    <SwiperSlide key={index} className={style.image_slide}>
                      <a data-fancybox="gallery" href={`${imageUrl}/${img}`}>
                        <img src={`${imageUrl}/${img}`} alt="" />
                      </a>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Fancybox>
          </section>
        );
      })}
    </>
  );
};

export const getStaticProps = async ({}) => {
  // Fetch additional data from the API
  const response = await fetch("https://app.greenshift.creasion.org/api/area");
  const apiData = await response.json();

  return {
    props: {
      apiData,
    },
    revalidate: 30,
  };
};

export default FocusArea;
