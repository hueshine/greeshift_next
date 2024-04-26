import { Container, Grid } from "@mui/material";

import homeStyle from "@/styles/home.module.scss";

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

  return (
    <>
      <Container maxWidth={"lg"}>
        <Grid container spacing={4}>
          <Grid item md={4}>
            <div className={homeStyle.partner_container_title}>
              <h2>OUR PARTNERS</h2>
              <p>
                This content is made possible by the support of the European
                Union in Nepal. The contents are the responsibility of CREASION
                and do not necessarily reflect the views of the European Union
                in Nepal
              </p>
            </div>
          </Grid>
          <Grid item md={8} className={homeStyle.partner_container}>
            <Grid container spacing={2}>
              <Grid item md={4.5} className={homeStyle.partner_box}>
                <h4>
                  <span>FINANCIAL SUPPORT</span>
                </h4>

                <div className={homeStyle.partner_box_logo}>
                  <img src={partnersData.donor[0].logo} alt="" />
                </div>
              </Grid>

              <Grid item md={7.5} className={homeStyle.partner_box}>
                <h4>
                  <span>Consortium Partners</span>
                </h4>

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
                <h4>
                  <span>Goverment Partners</span>
                </h4>

                <Grid container rowSpacing={1} columnSpacing={4}>
                  {partnersData.goverment.map((val, index) => {
                    return (
                      <Grid item md={4} key={index}>
                        <div
                          className={`${homeStyle.partner_box_logo} ${homeStyle.goverment}`}
                        >
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
    </>
  );
};

export default Partners;
