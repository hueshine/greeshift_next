import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import homeStyle from "@/styles/home.module.scss";

import { useIsomorphicLayoutEffect } from "@/hook";

const ImpactSlide = ({ data }) => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  useIsomorphicLayoutEffect(() => {
    let impactBoxes = document.querySelectorAll(".impact_box");
    let maxHeight = 0;
    impactBoxes.forEach((box) => {
      const slideHeight = box.clientHeight;
      if (slideHeight > maxHeight) {
        maxHeight = slideHeight;
      }
    });

    impactBoxes.forEach((box) => {
      box.style.height = `${maxHeight}px`;
    });
  });
  return (
    <Swiper
      spaceBetween={30}
      speed={12000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      slidesPerView={2}
      loop={true}
      modules={[Autoplay]}
      freeMode={true}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },

        1400: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
    >
      {data.map((val, index) => (
        <SwiperSlide
          key={index}
          className={`${homeStyle.impact_box} impact_box`}
        >
          <div>
            <img src={`${imageUrl}/${val.image}`} alt="" />
            <h3>
              {val.title}
              <span></span>
            </h3>
            <p>{val.subtitle}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImpactSlide;
