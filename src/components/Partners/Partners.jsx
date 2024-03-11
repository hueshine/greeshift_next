import { Container, Grid } from "@mui/material";
import React from "react";

import partnerStyle from "@/styles/partners.module.scss";

const Partners = () => {
  let partnersData = [
    {
      categoryID: 1,
      categoryTitle: "Donor",
      title: "",
      logo: "./eu.png",
      link: "",
    },
    {
      categoryID: 2,
      categoryTitle: "Other Partners",
      title: "",
      logo: "./creasion 1.png",
      link: "",
    },
    {
      categoryID: 2,
      categoryTitle: "Other Partners",
      title: "",
      logo: "./Youth_Innovation_Lab.png",
      link: "",
    },
    {
      categoryID: 2,
      categoryTitle: "Other Partners",
      title: "",
      logo: "./restless_development.png",
      link: "",
    },
  ];

  let donorData = partnersData.filter((item) => item.categoryID == 1);
  let otherPartners = partnersData.filter((item) => item.categoryID == 2);
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

        <div className={partnerStyle.row}>
          <h5>Donor</h5>
          <Grid container spacing={8} style={{ justifyContent: "center" }}>
            {donorData.map((val, index) => {
              return (
                <Grid
                  item
                  sm={12}
                  md={4}
                  key={index}
                  style={{ textAlign: "center" }}
                >
                  <img src={val.logo} alt="" />
                </Grid>
              );
            })}
          </Grid>
        </div>

        <div className={partnerStyle.row}>
          <h5>Other Partners</h5>
          <Grid container spacing={8}>
            {otherPartners.map((val, index) => {
              return (
                <Grid
                  item
                  sm={12}
                  md={4}
                  key={index}
                  style={{ textAlign: "center" }}
                >
                  <img src={val.logo} alt="" />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Container>
    </section>
  );
};

export default Partners;
