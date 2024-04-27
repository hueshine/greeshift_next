import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import homeStyle from "@/styles/home.module.scss";

import { useIsomorphicLayoutEffect } from "@/hook";

const ImpactSlide = () => {
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
      <SwiperSlide className={`${homeStyle.impact_box} impact_box`}>
        <div>
          <img src="/impact_icon/co2emission.svg" alt="" />
          <h3>
            1000<span></span>
          </h3>
          <p>Tons Plastic waste collected</p>
        </div>
      </SwiperSlide>

      <SwiperSlide className={`${homeStyle.impact_box} impact_box`}>
        <div>
          <img src="/impact_icon/community.svg" alt="" />

          <h3>
            20<span></span>
          </h3>
          <p>Youth led campaigns</p>
        </div>
      </SwiperSlide>

      <SwiperSlide className={`${homeStyle.impact_box} impact_box`}>
        <div>
          <img src="/impact_icon/contract.svg" alt="" />

          <h3>
            600<span></span>
          </h3>
          <p>Tag-me app data points collected</p>
        </div>
      </SwiperSlide>

      <SwiperSlide className={`${homeStyle.impact_box} impact_box`}>
        <div>
          <img src="/impact_icon/plastic_waste_collected.svg" alt="" />

          <h3>
            1520<span></span>
          </h3>
          <p>Students reached</p>
        </div>
      </SwiperSlide>

      <SwiperSlide className={`${homeStyle.impact_box} impact_box`}>
        <div>
          <img src="/impact_icon/school.svg" alt="" />

          <h3>
            4686<span></span>
          </h3>
          <p>Tons of CO2 emissions avoided ​</p>
        </div>
      </SwiperSlide>

      <SwiperSlide className={`${homeStyle.impact_box} impact_box`}>
        <div>
          <img src="/impact_icon/youth.svg" alt="" />

          <h3>
            650<span></span>
          </h3>
          <p>Direct and indirect employment generated </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default ImpactSlide;
