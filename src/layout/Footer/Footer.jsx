import { Container, Grid } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import footerStyle from "./footer.module.scss";

const Footer = () => {
  let marginBottom = { marginBottom: "30px" };

  return (
    <footer className={footerStyle.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item style={marginBottom} lg={6} className={footerStyle.logo}>
            <div className={footerStyle.logo_top}>
              <a href="" className={footerStyle.creasion}>
                <img src="/Creasion_footer_logo.png" alt="" />
              </a>
              <a href="">
                <img src="/logo.png" alt="" />
              </a>
            </div>

            <div className={footerStyle.logo_bottom}>
              <a href="">
                <img src="/restless_development.png" alt="" />
              </a>

              <a href="">
                <img src="/Youth_Innovation_Lab.png" alt="" />
              </a>
            </div>
          </Grid>

          <Grid item style={marginBottom} lg={3}>
            <h6>Quick Links</h6>
            <a href="">About Us</a>
            <a href="">News & Updates</a>
            <a href="">Knowledge Hub</a>
            <a href="">Join The Green Movement</a>

            <a href="" target="_blank" className={footerStyle.logo_btn}>
              Grievance
              <div>
                <ArrowOutwardIcon />
              </div>
            </a>
          </Grid>

          {/* <Grid item style={marginBottom} lg={3}>
            <h6>CONSORTIUM PARTNERS</h6>
            <a href="">Creasion</a>
            <a href="">Youth Innovation Lab</a>
            <a href="">Restless Development</a>

           
          </Grid> */}

          <Grid item style={marginBottom} lg={3}>
            <h6>Contact Us</h6>
            <a href="">Pabitra Pyara Marga, Baluwatar</a>
            <a href="">+977-1 -4520784 /01-4540085</a>
            <a href="">greenshift@creasion.org</a>

            <div className={footerStyle.social}>
              <h6>Connect Via</h6>
              <a target="_blank">
                <FacebookIcon />
              </a>
              <a target="_blank">
                <InstagramIcon />
              </a>
              <a target="_blank">
                <XIcon />
              </a>
            </div>
          </Grid>
        </Grid>
      </Container>

      <div className={footerStyle.copyright}>
        <Container maxWidth={"lg"}>
          <Grid container spacing={4}>
            <Grid item md={3}></Grid>

            <Grid item md={6}>
              <p>
                <small>
                  Disclaimer: This website is produced with the financial
                  support of the European Union. Its content are the sole
                  responsibility of Creasion and its consortium partners and do
                  not necessarily reflect the views of the European Union.
                </small>
              </p>
            </Grid>

            <Grid item md={3}>
              <p>
                <small>© 2024 Green Shift Nepal, CREASION</small>
              </p>
            </Grid>
          </Grid>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
