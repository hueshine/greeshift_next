import { Container, Grid } from "@mui/material";
import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

import footerStyle from "@/styles/footer.module.scss";

const Footer = () => {
  return (
    <footer className={footerStyle.footer}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item lg={3} className={footerStyle.logo}>
            <img src="./logo.png" alt="" />
          </Grid>

          <Grid item lg={3}>
            <h6>Contact Us</h6>
            <a href="">Pabitra Pyara Mar, Baluwatar, Kathmandu</a>
            <a href="">+977-1234566</a>
            <a href="">greenshiftnepal@gmail.com</a>

            <div className={footerStyle.social}>
              <a href="">
                <FacebookIcon />
              </a>
              <a href="">
                <InstagramIcon />
              </a>
              <a href="">
                <XIcon />
              </a>
            </div>
          </Grid>

          <Grid item lg={3}>
            <h6>Quick Links</h6>
            <a href="">About Us</a>
            <a href="">News & Updates</a>
            <a href="">Knowledge Hub</a>
            <a href="">Join The Green Movement</a>
          </Grid>

          <Grid item lg={3}>
            <div className={footerStyle.newsletter}>
              <h6>Let's Connect !</h6>

              <div className={footerStyle.newsletter_input}>
                <input type="text" placeholder="Your email address" />

                <button>
                  <ArrowRightAltIcon />
                </button>
              </div>

              <p>
                <strong>
                  We continually seek fresh individuals to become part of our
                  community.
                </strong>
              </p>
            </div>
          </Grid>
        </Grid>

        <div className={footerStyle.copyright}>
          <p>
            <small>© 2024 Green Shift Nepal.</small>
          </p>
          <p>
            <small>
              Powered by
              <a href="" target="_blank">
                Hue Shine
              </a>
            </small>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
