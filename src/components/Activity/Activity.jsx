import { useState } from "react";

import { useIsomorphicLayoutEffect } from "@/hook";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import gsap from "gsap";

import { Container, Grid, Modal, Box } from "@mui/material";

import style from "@/styles/activity.module.scss";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "80%",
  bgcolor: "transparent",
  boxShadow: 24,
  border: "0px solid transparent",
};

const Activity = ({ data }) => {
  let selectedData = data;

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

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <img src={modalImage} alt="" />
        </Box>
      </Modal>
      <section className={style.about}>
        <Container maxWidth={"lg"}>
          <Grid container columnSpacing={8}>
            <Grid item md={9}>
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedData.descriptionTitle,
                }}
              />
            </Grid>

            <Grid item md={6}>
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
          <Container maxWidth={"lg"}>
            <div className={style.activity_detail}>
              <Grid container columnSpacing={8} alignItems={"center"}>
                <Grid item sm={7}>
                  <div className={style.activity_detail_text}>
                    {/* <label>{selectedActivity.activity}</label> */}
                    <h3>{selectedActivity.title}</h3>
                    <div
                      className={style.text}
                      dangerouslySetInnerHTML={{
                        __html: selectedActivity.text,
                      }}
                    />
                  </div>
                </Grid>
                <Grid item sm={5}>
                  <img src={selectedActivity.image} className="image" alt="" />
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>
      ) : (
        ""
      )}

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
              <SwiperSlide
                className={style.image_slide}
                key={index}
                onClick={() => {
                  setOpen(true);
                  setModalImage(img);
                }}
              >
                <img src={img} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      <section className={style.sdg_wrap}>
        <Container maxWidth={"lg"}>
          <h3>SDG Contribution</h3>
          <div className={style.sdg_flex}>
            {selectedData.sdg.map((val, index) => {
              return <img src={`/sdg/${val}.png`} alt="" key={index} />;
            })}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Activity;
