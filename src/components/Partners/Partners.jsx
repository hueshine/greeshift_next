import { Container, Grid } from "@mui/material";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import partnerStyle from "@/styles/partners.module.scss";

const Partners = () => {
  let partnersData = [
    {
      categoryID: 1,
      categoryTitle: "Donor",
      title: "",
      logo: "./eu.png",
      link: "https://european-union.europa.eu/index_en",
    },
    {
      categoryID: 2,
      categoryTitle: "Consortium Partners ",
      title: "",
      logo: "./creasion 1.png",
      link: "https://creasion.org/",
    },
    {
      categoryID: 2,
      categoryTitle: "Consortium Partners ",
      title: "",
      logo: "./Youth_Innovation_Lab.png",
      link: "https://www.youthinnovationlab.org/",
    },
    {
      categoryID: 2,
      categoryTitle: "Consortium Partners ",
      title: "",
      logo: "./restless_development.png",
      link: "https://restlessdevelopment.org/country/nepal/",
    },

    {
      categoryID: 3,
      categoryTitle: "Goverment Partners ",
      title: "",
      logo: "./creasion 1.png",
      link: "https://creasion.org/",
    },
    {
      categoryID: 3,
      categoryTitle: "Goverment Partners ",
      title: "",
      logo: "./restless_development.png",
      link: "https://restlessdevelopment.org/country/nepal/",
    },
    {
      categoryID: 3,
      categoryTitle: "Goverment Partners ",
      title: "",
      logo: "./Youth_Innovation_Lab.png",
      link: "https://www.youthinnovationlab.org/",
    },

    {
      categoryID: 3,
      categoryTitle: "Goverment Partners ",
      title: "",
      logo: "./6.png",
      link: "https://www.youthinnovationlab.org/",
    },
  ];

  const groupData = partnersData.reduce((acc, partner) => {
    acc[partner.categoryID] = acc[partner.categoryID] || [];
    acc[partner.categoryID].push(partner);
    return acc;
  }, {});

  return (
    <section className={partnerStyle.partners}>
      <Container maxWidth="lg">
        <Container maxWidth="sm" className={partnerStyle.title}>
          <h2>Our Partners</h2>
          <p>
            This content is made possible by the support of the European Union
            in Nepal. The contents are the responsibility of CREASION and do not
            necessarily reflect the views of the European Union in Nepal
          </p>
        </Container>

        {Object.keys(groupData).map((categoryID) => (
          <div className={partnerStyle.row} key={categoryID}>
            <h5>{groupData[categoryID][0].categoryTitle}</h5>

            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              speed={3500}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
              loop={groupData[categoryID].length > 3 ? true : false}
              modules={[Autoplay]}
              centeredSlides={groupData[categoryID].length < 2 ? true : false}
            >
              {groupData[categoryID].map((partner, index) => (
                <SwiperSlide key={index} style={{ textAlign: "center" }}>
                  <a href={partner.link}>
                    <img src={partner.logo} alt={partner.title} />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </Container>
    </section>
  );
};

export default Partners;
