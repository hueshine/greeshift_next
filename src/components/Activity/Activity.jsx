import { useState } from "react";

import { useIsomorphicLayoutEffect } from "@/hook";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Fancybox from "../Fancybox";
import gsap from "gsap";

import { Container, Grid } from "@mui/material";

import style from "@/styles/activity.module.scss";
import { useRouter } from "next/router";

import Link from "next/link";

const Activity = ({ data, newsData }) => {
  const router = useRouter();

  let lang = router.locale;

  let selectedData = data;

  let selectedNews = newsData.filter(
    (el) => el.activity === selectedData.title
  );

  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".image", {
        opacity: 0,
        y: 40,
      });
    });

    return () => ctx.revert();
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [emptyActivity, setEmptyActivity] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState({
    activity: "",
    title: "",
    text: "",
    image: "",
  });

  useIsomorphicLayoutEffect(() => {
    if (selectedData.activity.length > 0) {
      setSelectedActivity(selectedData.activity[0]);
    } else {
      setEmptyActivity(true);
    }
  }, [selectedData]);

  return (
    <>
      <section className={style.about}>
        <Container maxWidth={"lg"}>
          <Grid container columnSpacing={8}>
            <Grid item md={9}>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    lang == "en"
                      ? selectedData.descriptionTitle
                      : selectedData.descriptionTitle_np,
                }}
              />
            </Grid>

            <Grid item md={6}>
              <div
                className={style.text}
                dangerouslySetInnerHTML={{
                  __html:
                    lang == "en"
                      ? selectedData.description
                      : selectedData.description_np,
                }}
              />
            </Grid>

            <Grid item md={6}>
              <div id="text-right">
                <div
                  className={style.text}
                  dangerouslySetInnerHTML={{
                    __html:
                      lang == "en"
                        ? selectedData.objective
                        : selectedData.objective_np,
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {emptyActivity ? (
        ""
      ) : (
        <section className={style.activity}>
          <div className={style.activity_nav}>
            <ul>
              {selectedData.activity.map((val, index) => {
                return (
                  <li
                    key={index}
                    className={activeIndex == index ? style.active : ""}
                    onClick={() => {
                      setSelectedActivity(val);
                      setActiveIndex(index);
                    }}
                  >
                    {lang == "en" ? val.activity : val.activity_np}
                  </li>
                );
              })}
            </ul>
          </div>
          <Container maxWidth={"lg"}>
            <div className={style.activity_detail}>
              <Grid container columnSpacing={8} alignItems={"center"}>
                <Grid item sm={7}>
                  <div className={style.activity_detail_text}>
                    <h3>
                      {lang == "en"
                        ? selectedActivity.title
                        : selectedActivity.title_np}
                    </h3>
                    <div
                      className={style.text}
                      dangerouslySetInnerHTML={{
                        __html:
                          lang == "en"
                            ? selectedActivity.text
                            : selectedActivity.text_np,
                      }}
                    />
                  </div>
                </Grid>
                <Grid item sm={5}>
                  <img
                    src={`${imageUrl}/${selectedActivity.image}`}
                    className="image"
                    alt=""
                  />
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>
      )}

      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <section className={style.image_slider}>
          <Swiper
            className={style.image_slide_wrap}
            spaceBetween={15}
            speed={12000}
            autoplay={{
              delay: 0,
              disableOnInteraction: true,
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
                slidesPerView: 3.5,
                spaceBetween: 10,
              },
            }}
          >
            {selectedData.images.map((img, index) => {
              return (
                <SwiperSlide className={style.image_slide} key={index}>
                  <a data-fancybox="gallery" href={`${imageUrl}/${img}`}>
                    <img src={`${imageUrl}/${img}`} alt="" />
                    <p>
                      {lang == "en"
                        ? selectedData.subtitle[index]
                        : selectedData.subtitle_np[index]}
                    </p>
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
      </Fancybox>

      <section className={style.sdg_wrap}>
        <Container maxWidth={"lg"}>
          <h3>{lang == "en" ? "SDG Contributions" : "एसडीजीका योगदानहरु"} </h3>
          <div className={style.sdg_flex}>
            {selectedData.sdg.map((val, index) => {
              return <img src={`/sdg/${val}.png`} alt="" key={index} />;
            })}
          </div>
        </Container>
      </section>

      <section className={style.news_activity}>
        <Container maxWidth={"lg"}>
          <h3>{lang == "en" ? "News & Updates" : "समाचार र अपडेटहरू"} </h3>

          <Swiper
            className={style.image_slide_wrap}
            spaceBetween={30}
            autoplay={{
              delay: 6500,
            }}
            loop={false}
            modules={[Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {selectedNews.map((val, index) => {
              let link = val.title.toLowerCase().replace(/\s+/g, "-");
              return (
                <SwiperSlide key={index}>
                  <div className={style.news_wrap}>
                    <div className={style.news_wrap_image}>
                      <img src={`${imageUrl}/${val.image}`} alt="" />
                    </div>
                    <div className={style.news_wrap_text}>
                      <h6>{lang == "en" ? val.title : val.title_np}</h6>

                      <span>{val.date}</span>

                      <Link href={`/news-and-updates/${link}`}>
                        {lang == "en" ? "Read More" : "थप पढ्नुहोस्"}
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Container>
      </section>
    </>
  );
};

export default Activity;
