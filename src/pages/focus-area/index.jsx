import React from "react";

import { Container, Grid } from "@mui/material";

import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import style from "./style.module.scss";

import Fancybox from "../../components/Fancybox";

const Focus = () => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";
  return (
    <>
      <Head>
        <title>Focus Areas | Green Shift Nepal</title>
        <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <Banner title={"Focus Area"} parent={"About"} />
    </>
  );
};

export default Focus;
