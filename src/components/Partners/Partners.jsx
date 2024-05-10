import { Container } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import homeStyle from "@/styles/home.module.scss";

const Partners = () => {
  let partnersData = [
    {
      categoryID: 1,
      categoryTitle: "FINANCIAL SUPPORT",
      title: "",
      logo: "./eu.png",
      link: "https://european-union.europa.eu/index_en",
    },
    {
      categoryID: 2,
      categoryTitle: "CONSORTIUM Partners ",
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
      logo: "/Municipalities/1.png",
      link: "",
    },
    {
      categoryID: 3,
      categoryTitle: "Goverment Partners ",
      title: "",
      logo: "/Municipalities/2.png",
      link: "",
    },
    {
      categoryID: 3,
      categoryTitle: "Goverment Partners ",
      title: "",
      logo: "/Municipalities/3.png",
      link: "",
    },

    {
      categoryID: 3,
      categoryTitle: "Goverment Partners ",
      title: "",
      logo: "/Municipalities/4.png",
      link: "",
    },

    {
      categoryID: 3,
      categoryTitle: "Goverment Partners ",
      title: "",
      logo: "/Municipalities/5.png",
      link: "",
    },

    {
      categoryID: 3,
      categoryTitle: "Goverment Partners ",
      title: "",
      logo: "/Municipalities/6.png",
      link: "",
    },

    {
      categoryID: 3,
      categoryTitle: "Goverment Partners ",
      title: "",
      logo: "/Municipalities/7.png",
      link: "",
    },
    {
      categoryID: 3,
      categoryTitle: "Goverment Partners ",
      title: "",
      logo: "/Municipalities/8.png",
      link: "",
    },
    {
      categoryID: 3,
      categoryTitle: "Goverment Partners ",
      title: "",
      logo: "/Municipalities/9.png",
      link: "",
    },
  ];

  const groupData = partnersData.reduce((acc, partner) => {
    acc[partner.categoryID] = acc[partner.categoryID] || [];
    acc[partner.categoryID].push(partner);
    return acc;
  }, {});

  return (
    <>
      <Container maxWidth={"lg"}>
        <h2>Our Partners</h2>

        {Object.keys(groupData).map((categoryID) => {
          const shouldAutoplay =
            groupData[categoryID].length <= 3
              ? false
              : {
                  delay: 4500,
                  disableOnInteraction: false,
                };
          return (
            <div className={homeStyle.partnerRow} key={categoryID}>
              <h5>{groupData[categoryID][0].categoryTitle}</h5>

              {groupData[categoryID].length < 4 ? (
                <div className={homeStyle.partner_logo_wrapper}>
                  {groupData[categoryID].map((partner) => (
                    <a href={partner.link} key={partner.logo} target="_blank">
                      <img src={partner.logo} alt={partner.title} />
                    </a>
                  ))}
                </div>
              ) : (
                <Swiper
                  slidesPerView={2}
                  speed={3500}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  modules={[Autoplay]}
                  centeredSlides={false}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 0,
                      loop: false,
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {groupData[categoryID].map((partner) => (
                    <SwiperSlide
                      key={partner.logo}
                      style={{ textAlign: "center" }}
                    >
                      <a href={partner.link} target="_blank">
                        <img src={partner.logo} alt={partner.title} />
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default Partners;
