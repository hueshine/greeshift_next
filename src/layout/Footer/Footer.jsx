import { Container, Grid } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import footerStyle from "./footer.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  let marginBottom = { marginBottom: "30px" };

  const router = useRouter();
  let lang = router.locale;

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
            <h6>{lang == "en" ? "Quick Links" : "लिङ्कहरू"} </h6>
            <Link href={"/focus-area"}>
              {lang == "en" ? "Focus Area" : "प्राथमिकताका क्षेत्रहरु"}
            </Link>
            <Link href={"/impacts"}>
              {lang == "en" ? "Impacts" : "असर/प्रभाव"}
            </Link>
            <Link href={"/news-and-updates"}>
              {lang == "en" ? "News & Updates" : "समाचार र अपडेटहरू"}
            </Link>
            <Link href={"/greenshift-campaigns/campaigns"}>
              {lang == "en" ? "GreenShift Campaigns" : "अभियानहरू"}
            </Link>
            <Link href={"/pitch-your-ideas"}>
              {lang == "en" ? "Pitch Your Ideas" : "तपाईको अवधारणा"}
            </Link>
          </Grid>

          <Grid item style={marginBottom} lg={3}>
            <h6>{lang == "en" ? "Contact Us" : "सम्पर्क ठेगाना"}</h6>
            <a href="#">
              {lang == "en"
                ? "Pabitra Pyara Marga, Baluwatar"
                : "पवित्र प्यारा मार्ग, बालुवाटार, काठमाडौं"}
            </a>
            <a href="">
              {lang == "en"
                ? "+977-1 -4520784 /01-4540085"
                : "+९७७-१-४५२०७८४ / ४५४००८५"}
            </a>
            <a href="">greenshift@creasion.org</a>

            <div className={footerStyle.social}>
              <h6>{lang == "en" ? "Connect Via" : "मार्फत जोडिनुहोस्"}</h6>
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
            <h6>{lang == "en" ? "Grievance" : "गुनासो"}</h6>
            <p>
              {lang == "en"
                ? "GreenShift Nepal is committed to upholding the highest standards of integrity and we have a zero-tolerance policy regarding any instances of misconduct."
                : "GreenShift नेपाल अखण्डताको उच्चतम मापदण्ड कायम गर्न प्रतिबद्ध छ र हामीसँग कुनै पनि दुर्व्यवहारका घटनाहरूमा शून्य सहनशीलता नीति छ।"}
            </p>

            <a
              href="https://forms.gle/xiTjvzAjvmTfDWpT8 "
              target="_blank"
              className={footerStyle.logo_btn}
            >
              {lang == "en" ? "Grievance" : "गुनासो"}
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
                  {lang == "en"
                    ? "Disclaimer: This website is produced with the financial support of the European Union. Its content are the sole responsibility of Creasion and its consortium partners and do not necessarily reflect the views of the European Union."
                    : "अस्वीकरण: यो वेबसाइट यूरोपीय संघ को आर्थिक सहयोग संग उत्पादन गरिएको हो। यसको सामग्री क्रिएशन र यसको कन्सोर्टियम साझेदारहरूको एकमात्र जिम्मेवारी हो र युरोपियन युनियनको विचारहरू प्रतिबिम्बित गर्दैन।"}
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
