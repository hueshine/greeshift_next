import { useState } from "react";

import { Container, Grid } from "@mui/material";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import style from "./style.module.scss";

const data = [
  {
    title: "Plastic Waste Management",
    text: "<p>The main objective of this focus area is to promote the effective management of exisiting plastic waste. The project will work with private waste enterprises to enhance their capacity for plastic waste collection, processing, and recycling. This will further help to prevent plastic waste leakage into the environment and divert them into the product value chain.  </p>",
    output:
      "<ul><li>Strengthened capacities of waste enterprises and workers, including women, in plastic waste management </li></ul>",
    activities:
      "<ul> <li><a href='' target='_blank'>Strengthening six private waste enterprises</a></li> </ul>",
    image: [
      "/focusarea/1/chitwna.jpeg",
      "/focusarea/1/greens.jpg",
      "/focusarea/1/IMG_1641.JPG",
      "/focusarea/1/pile.jpeg",
      "/focusarea/1/Scrap-Bottles.jpg",
      "/focusarea/1/watse workers.jpeg",
      "/focusarea/1/WhatsApp Image 2023-09-10 at 12.53.26 PM.jpeg",
      "/focusarea/1/WhatsApp Image 2023-09-10 at 12.54.07 PM.jpeg",
      "/focusarea/1/WhatsApp Image 2023-09-14 at 3.42.48 PM.jpeg",
      "/focusarea/1/workers.jpeg",
    ],
  },
  {
    title:
      "Innovation around non-plastic packaging, and promotion of green enterprises",
    text: "<p>The goal of this focus area is to create opportunities for business and enterprises to develop and promote plastic alternative products including packaging to promote the transition to circular economy. This will further help in reducing plastic consumption, lowering plastic waste generation. </p>",
    output:
      "<ul><li>Increased capacities of green enterprises on sustainable plastic alternative solutions</li></ul>",
    activities:
      '<ul> <li> <a href="" target="_blank"> Sustainable Packaging Program </a> </li> <li> <a href="" target="_blank"> Green Business Accelerator Program </a> </li> </ul>',
    image: ["/focusarea/2/1.jpg", "/focusarea/2/2.jpg", "/focusarea/2/3.jpg"],
  },
  {
    title: "Supporting advocacy, data and policy changes",
    text: "<p>The goal of this focus area is to engage key stakeholders in developing inclusive and evidence-based policies and support youths and school children in awareness and advocacy.  </p>",
    output:
      "<ul> <li>Strengthened alliance of Waste Workers (WWs) on policy making process</li> <li>Improved capacities of public institutions, civil society and youth in policy formulation on Solid Waste Management (SWM) and recycling at the local, provincial and federal levels</li> <li>Enhanced knowledge and capacities of youth in Circular Economy (CE) and data driven advocacy for CE </li> </ul>",
    activities:
      '<ul> <li> <a href="" target="_blank"> Waste Smart Fellowship </a> </li> <li> <a href="" target="_blank"> Climate Smart Schools </a> </li> <li> <a href="" target="_blank"> Youth Advocacy Grant </a> </li> <li> <a href="" target="_blank"> CSOs of Waste Workers </a> </li> <li> <a href="" target="_blank"> Provincial and Local Level Solid Waste Management Policy Guidelines Development </a> </li> <li> <a href="" target="_blank"> National Solid Waste Management (SWM) Recycling Policy </a> </li> </ul>',
    image: [
      "/focusarea/3/1.jpg",
      "/focusarea/3/2.jpeg",
      "/focusarea/3/3.jpeg",
      "/focusarea/3/4.jpg",
      "/focusarea/3/5.jpeg",
      "/focusarea/3/6.jpeg",
      "/focusarea/3/7.jpeg",
      "/focusarea/3/8.jpeg",
      "/focusarea/3/9.jpeg",
      "/focusarea/3/10.jpeg",
      "/focusarea/3/11.jpeg",
      "/focusarea/3/12.jpeg",
    ],
  },
];

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
            <Container maxWidth="md" className={style.focus_container}>
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
                spaceBetween={30}
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
                    spaceBetween: 20,
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
