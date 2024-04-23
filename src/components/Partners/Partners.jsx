import { Container, Grid } from "@mui/material";

import homeStyle from "@/styles/home.module.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// hooks
import { useIsomorphicLayoutEffect } from "@/hook";

const Partners = () => {
  let partnersData = {
    donor: [
      {
        logo: "/eu.png",
        link: "https://european-union.europa.eu/index_en",
      },
    ],
    consortium: [
      {
        title: "",
        logo: "/creasion 1.png",
        link: "https://creasion.org/",
      },
      {
        title: "",
        logo: "/Youth_Innovation_Lab.png",
        link: "https://www.youthinnovationlab.org/",
      },
      {
        title: "",
        logo: "/restless_development.png",
        link: "https://restlessdevelopment.org/country/nepal/",
      },
    ],
    goverment: [
      {
        title: "",
        logo: "/Municipalities/1.png",
        link: "https://creasion.org/",
      },
      {
        title: "",
        logo: "/Municipalities/2.png",
        link: "https://restlessdevelopment.org/country/nepal/",
      },
      {
        title: "",
        logo: "/Municipalities/3.png",
        link: "https://www.youthinnovationlab.org/",
      },

      {
        title: "",
        logo: "/Municipalities/4.png",
        link: "https://www.youthinnovationlab.org/",
      },
      {
        title: "",
        logo: "/Municipalities/5.png",
        link: "https://www.youthinnovationlab.org/",
      },
      {
        title: "",
        logo: "/Municipalities/6.png",
        link: "https://www.youthinnovationlab.org/",
      },
      {
        title: "",
        logo: "/Municipalities/7.png",
        link: "https://www.youthinnovationlab.org/",
      },
    ],
  };

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mainImage = document.querySelector("#box");
    const image = document.querySelector("#image");
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      // gsap.to(image, {
      //   rotate: 50,
      //   scale: 1.4,
      //   scrollTrigger: {
      //     trigger: mainImage,
      //     start: "top 80%",
      //     scrub: true,
      //   },
      // });
    });

    return () => ctx.revert();
  });

  return (
    <>
      <section
        className={homeStyle.partners}
        id="box"
        style={{ background: "url(/131511.jpg)" }}
      >
        {/* <div className={homeStyle.partners_bg}>
          <img src="/partners.svg" alt="" id="image" />
        </div> */}
        <Container maxWidth={"xl"}>
          <Grid container>
            <Grid item md={3.5}></Grid>
            <Grid item md={7} className={homeStyle.partner_container}>
              <div className={homeStyle.partner_container_title}>
                <h2>OUR PARTNERS</h2>
                <p>
                  This content is made possible by the support of the European
                  Union in Nepal. The contents are the responsibility of
                  CREASION and do not necessarily reflect the views of the
                  European Union in Nepal
                </p>
              </div>
              <Grid container spacing={2}>
                <Grid item md={3} className={homeStyle.partner_box}>
                  <h4>Donor</h4>

                  <div className={homeStyle.partner_box_logo}>
                    <img src={partnersData.donor[0].logo} alt="" />
                  </div>
                </Grid>

                <Grid item md={9} className={homeStyle.partner_box}>
                  <h4>Consortium Partners</h4>

                  <Grid container spacing={2}>
                    {partnersData.consortium.map((val, index) => {
                      return (
                        <Grid item md={4} key={index}>
                          <div className={homeStyle.partner_box_logo}>
                            <img src={val.logo} alt="" />
                          </div>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>

                <Grid item md={12} className={homeStyle.partner_box}>
                  <h4>Goverment Partners</h4>

                  <Grid container spacing={2}>
                    {partnersData.goverment.map((val, index) => {
                      return (
                        <Grid item md={3} key={index}>
                          <div className={homeStyle.partner_box_logo}>
                            <img src={val.logo} alt="" />
                          </div>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default Partners;
