import { useState } from "react";

import Head from "next/head";
import { Container } from "@mui/material";
import { useRouter } from "next/router";

import { useIsomorphicLayoutEffect } from "@/hook";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Fancybox from "@/components/Fancybox";

import style from "../style.module.scss";
import Banner from "../../../layout/Banner/Banner";

const NewsDetail = () => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  const [data, setData] = useState(null);

  const router = useRouter();
  let lang = router.locale;

  const { name } = router.query;

  useIsomorphicLayoutEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://app.greenshift.creasion.org/api/campaign"
      );
      const newData = await res.json();
      setData(newData);
    };
    fetchData();
  }, []);

  const campaign =
    data &&
    data.campaigns.find(
      (el) => el.title.toLowerCase().replace(/\s+/g, "-") === name
    );

  let selectedCampaigns = null;
  if (campaign) {
    selectedCampaigns = [campaign];
  }

  return (
    <>
      {selectedCampaigns ? (
        <>
          <Head>
            <title>{selectedCampaigns[0].title} | Green Shift Nepal</title>
            <meta
              property="og:image"
              content={`${imageUrl}/${selectedCampaigns[0].image}`}
            />
            <meta property="og:image:width" content="640" />
            <meta property="og:image:height" content="442" />
          </Head>
          <Banner
            title={
              lang == "en"
                ? selectedCampaigns[0].title
                : selectedCampaigns[0].title_np
            }
          />
          <div className={style.campaign_detail}>
            <Container maxWidth={"lg"}>
              <div className={style.image}>
                <img src={`${imageUrl}/${selectedCampaigns[0].image}`} alt="" />
              </div>
            </Container>

            <Container maxWidth="md">
              <div
                className={style.text}
                dangerouslySetInnerHTML={{
                  __html:
                    lang == "en"
                      ? selectedCampaigns[0].description
                      : selectedCampaigns[0].description_np,
                }}
              />
            </Container>
          </div>

          {selectedCampaigns[0].album && (
            <Fancybox
              options={{
                Carousel: {
                  infinite: false,
                },
              }}
            >
              <div className={style.gallery_photo}>
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
                  {selectedCampaigns[0].album.map((img, index) => {
                    return (
                      <SwiperSlide className={style.image_slide} key={index}>
                        <a data-fancybox="gallery" href={`${imageUrl}/${img}`}>
                          <img src={`${imageUrl}/${img}`} alt="" />

                          <p>
                            {lang == "en"
                              ? selectedCampaigns[0].subtitle[index]
                              : selectedCampaigns[0].subtitle_np[index]}
                          </p>
                        </a>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </Fancybox>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default NewsDetail;
