import { Container } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import homeStyle from "@/styles/home.module.scss";
import { useRouter } from "next/router";

const Partners = ({ data }) => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  const router = useRouter();
  let lang = router.locale;

  let partnersData = data.partner;

  const groupData = partnersData.reduce((acc, partner) => {
    acc[partner.categoryID] = acc[partner.categoryID] || [];
    acc[partner.categoryID].push(partner);
    return acc;
  }, {});

  return (
    <>
      <Container maxWidth={"lg"}>
        <h2>{lang == "en" ? "Our Partners" : "हाम्रा साझेदारहरू"} </h2>

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
              <h5>
                {lang == "en"
                  ? groupData[categoryID][0].categoryTitle
                  : groupData[categoryID][0].categoryTitle_np}
              </h5>

              {groupData[categoryID].length < 4 ? (
                <div className={homeStyle.partner_logo_wrapper}>
                  {groupData[categoryID].map((partner) => (
                    <a href={partner.link} key={partner.logo} target="_blank">
                      <img
                        src={`${imageUrl}/${partner.logo}`}
                        alt={partner.title}
                      />
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
                        <img
                          src={`${imageUrl}/${partner.logo}`}
                          alt={partner.title}
                        />
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
