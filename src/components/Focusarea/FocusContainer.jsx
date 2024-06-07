import React, { useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hook";

import { useRouter } from "next/router";

import { Container, Grid } from "@mui/material";

import Banner from "../../layout/Banner/Banner";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import style from "./style.module.scss";

import Fancybox from "../Fancybox";

const FocusContainer = () => {
  const router = useRouter();

  const [data, setData] = useState(null);

  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  useIsomorphicLayoutEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://app.greenshift.creasion.org/api/area");
      const newData = await res.json();
      setData(newData);
    };
    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <>
          <Banner title={data.banner_text} />

          {data.areas.map((val, index) => (
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
                        <a data-fancybox="gallery" href={`${img}`}>
                          <img src={`${imageUrl}/${img}`} alt="" />
                        </a>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Fancybox>
            </section>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default FocusContainer;
