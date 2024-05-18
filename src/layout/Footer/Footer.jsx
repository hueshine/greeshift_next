import { Container, Grid } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import footerStyle from "./footer.module.scss";
import Link from "next/link";

const Footer = () => {
  let marginBottom = { marginBottom: "30px" };

  return (
    <footer className={footerStyle.footer}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item style={marginBottom} lg={4} className={footerStyle.logo}>
            <div className={footerStyle.logo_top}>
              <a
                href="http://creasion.org/"
                target="_blank"
                className={footerStyle.creasion}
              >
                <img src="/Creasion_footer_logo.png" alt="" />
              </a>
              <a href="#">
                <img src="/logo-reverse.png" alt="" />
              </a>
            </div>

            <div className={footerStyle.logo_bottom}>
              <a
                href="https://restlessdevelopment.org/country/nepal/"
                target="_blank"
              >
                <img src="/rd.png" alt="" />
              </a>

              <a href="https://youthinnovationlab.org/" target="_blank">
                <img src="/Youth_Innovation_Lab.png" alt="" />
              </a>
            </div>
          </Grid>

          <Grid item style={marginBottom} lg={2.5}>
            <h6>Quick Links</h6>
            <Link href={"/focus-area"}>Focus Area</Link>
            <Link href={"/impacts"}>Impacts</Link>
            <Link href={"/news-and-updates"}>News & Updates</Link>
            <Link href={"/greenshift-campaigns"}>GreenShift Campaigns</Link>
            <Link href={"/pitch-your-ideas"}>Pitch Your Ideas</Link>
          </Grid>

          <Grid item style={marginBottom} lg={3}>
            <h6>Contact Us</h6>
            <a href="">Pabitra Pyara Marga, Baluwatar</a>
            <a href="">+977-1 -4520784 /01-4540085</a>
            <a href="">greenshift@creasion.org</a>

            <div className={footerStyle.social}>
              <h6>Connect Via</h6>
              <a href="https://www.facebook.com/creasionorgg/" target="_blank">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/creasionorg/" target="_blank">
                <InstagramIcon />
              </a>
              <a href="https://twitter.com/creasionorg" target="_blank">
                <XIcon />
              </a>
            </div>
          </Grid>

          <Grid item style={marginBottom} lg={2.5}>
            <h6>Grievance</h6>
            <p>
              GreenShift Nepal is committed to upholding the highest standards
              of integrity and we have a zero-tolerance policy regarding any
              instances of misconduct.{" "}
            </p>

            <a
              href="https://forms.gle/xiTjvzAjvmTfDWpT8 "
              target="_blank"
              className={footerStyle.logo_btn}
            >
              Grievance
              <div>
                <ArrowOutwardIcon />
              </div>
            </a>
          </Grid>
        </Grid>
      </Container>

      <div className={footerStyle.copyright}>
        <Container maxWidth={"xl"}>
          <Grid container spacing={2}>
            <Grid item lg={4}></Grid>

            <Grid item lg={4.5}>
              <p>
                <small>
                  Disclaimer: This website is produced with the financial
                  support of the European Union. Its content are the sole
                  responsibility of Creasion and its consortium partners and do
                  not necessarily reflect the views of the European Union.
                </small>
              </p>
            </Grid>

            <Grid item lg={1}></Grid>

            <Grid item md={2.5} xs={12}>
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
