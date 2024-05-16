import { useState } from "react";

import { Container, Grid } from "@mui/material";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import style from "./style.module.scss";
import data from "./data.json";

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

const index = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const [modalImage, setModalImage] = useState();

  return (
    <>
      <Head>
        <title>Focus Area | Green Shift Nepal</title>
        <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <Banner title={"Focus Area"} />

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <img src={modalImage} alt="" />
        </Box>
      </Modal>

      {data.map((val, index) => {
        return (
          <section
            className={style.focuarea_main}
            key={index}
            id={`focusarea${index}`}
          >
            <Container maxWidth="lg" className={style.focus_container}>
              <div className={style.title}>
                <span>Focus Area 0{index + 1}</span>
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
                {val.image.map((img, index) => {
                  return (
                    <SwiperSlide
                      key={index}
                      className={style.image_slide}
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
            </Container>
          </section>
        );
      })}
    </>
  );
};

export default index;
