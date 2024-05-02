import Banner from "@/layout/Banner/Banner";
import Head from "next/head";
import style from "@/styles/activity.module.scss";
import { Container, Grid } from "@mui/material";

import { useIsomorphicLayoutEffect } from "@/hook";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useRouter } from "next/router";

import data from "@/pages/api/activityData.json";
import { useState } from "react";

const Creasion = () => {
  const router = useRouter();

  const { name } = router.query;

  const selectedData = data.restlessDevelopment.find(
    (el) => el.title.toLowerCase().replace(/\s+/g, "-") === name
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState({
    activity: "",
    title: "",
    text: "",
    image: "",
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const [modalImage, setModalImage] = useState();

  useIsomorphicLayoutEffect(() => {
    if (selectedData && selectedData.activities) {
      setSelectedActivity(selectedData.activities[0]);
    }
  }, [selectedData]);

  useIsomorphicLayoutEffect(() => {
    const title = document.querySelector("#title-height");

    const rightEl = document.querySelector("#text-right");

    if (rightEl) {
      rightEl.style.marginTop = `${title.offsetHeight + 25}px`;
    }
  });
  return (
    <>
      {selectedData ? (
        <>
          <Head>
            <title>{selectedData.title} | Green Shift Nepal</title>
            <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
            <meta property="og:image:width" content="640" />
            <meta property="og:image:height" content="442" />
          </Head>
          <Banner title={selectedData.title} parent={selectedData.ledBy} />

          <section className={style.about}>
            <Container maxWidth={"lg"}>
              <Grid container spacing={8}>
                <Grid item md={6}>
                  <div
                    id="title-height"
                    dangerouslySetInnerHTML={{
                      __html: selectedData.descriptionTitle,
                    }}
                  />

                  <div
                    className={style.text}
                    dangerouslySetInnerHTML={{
                      __html: selectedData.description,
                    }}
                  />
                </Grid>

                <Grid item md={6}>
                  <div id="text-right">
                    <div
                      className={style.text}
                      dangerouslySetInnerHTML={{
                        __html: selectedData.objective,
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Container>
          </section>

          {selectedData.activities ? (
            <section className={style.activity}>
              <Container maxWidth={"lg"}>
                <div className={style.activity_nav}>
                  <ul>
                    {selectedData.activities.map((val, index) => {
                      return (
                        <li
                          key={index}
                          className={activeIndex == index ? style.active : ""}
                          onClick={() => {
                            setSelectedActivity(val);
                            setActiveIndex(index);
                          }}
                        >
                          {val.activity}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className={style.activity_detail}>
                  <Grid container columnSpacing={8}>
                    <Grid item sm={6}>
                      <div className={style.activity_detail_text}>
                        <label>{selectedActivity.activity}</label>
                        <h4>{selectedActivity.title}</h4>
                        <div
                          className={style.text}
                          dangerouslySetInnerHTML={{
                            __html: selectedActivity.text,
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item sm={6}>
                      <img src={selectedActivity.image} alt="" />
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </section>
          ) : (
            ""
          )}

          <section className={style.image_slider}>
            <Container maxWidth={"lg"}>
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
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                }}
              >
                <SwiperSlide
                  className={style.image_slide}
                  onClick={() => {
                    setOpen(true);
                    setModalImage(img);
                  }}
                >
                  <img src="/B1wq4pir1AnvaoWzfXo2.jpg" alt="" />
                </SwiperSlide>

                <SwiperSlide
                  className={style.image_slide}
                  onClick={() => {
                    setOpen(true);
                    setModalImage(img);
                  }}
                >
                  <img src="/chitwna.jpeg" alt="" />
                </SwiperSlide>

                <SwiperSlide
                  className={style.image_slide}
                  onClick={() => {
                    setOpen(true);
                    setModalImage(img);
                  }}
                >
                  <img src="/DQ99bEWiVjW8RQ8c8oVx.jpg" alt="" />
                </SwiperSlide>

                <SwiperSlide
                  className={style.image_slide}
                  onClick={() => {
                    setOpen(true);
                    setModalImage(img);
                  }}
                >
                  <img src="/focusarea3.png" alt="" />
                </SwiperSlide>

                <SwiperSlide
                  className={style.image_slide}
                  onClick={() => {
                    setOpen(true);
                    setModalImage(img);
                  }}
                >
                  <img src="/focusarea1.png" alt="" />
                </SwiperSlide>
              </Swiper>
            </Container>
          </section>
        </>
      ) : (
        "Preloader "
      )}
    </>
  );
};

export default Creasion;
