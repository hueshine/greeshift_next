import Head from "next/head";

import { Card, Container, Grid } from "@mui/material";

// Components
import BannerWave from "../components/BannerCurve";
import Wave from "../components/Curve";

// Sections
import Partners from "../components/Partners/Partners";
import HomeFocusArea from "../components/HomeFocusArea";
import MapComponent from "../components/MapComponent/MapComponent";

import useSnoothScroll from "@/hook/use-smooth-scroll";

import homeStyle from "@/styles/home.module.scss";
import Link from "next/link";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

let newsData = [
  {
    title: "National Launch of Project Greenshift Nepal",
    image: "./1a3b9e8c-88a0-449a-8c74-0f58aef99fe6.png",
    date: "Feb 21, 2024",
    link: "",
  },
  {
    title:
      "GreenShift: Official MoU signing with Nepalgunj Sub-Metropolitan City",
    image: "./DQ99bEWiVjW8RQ8c8oVx.jpg",
    date: "Feb 13, 2024",
    link: "",
  },
  {
    title: "GreenShift: Official MoU signing with Bardibas Municipality",
    image: "./XDfMiMpv1kt6nn5JPDLG.jpg",
    date: "Feb 05, 2024",
    link: "",
  },
  {
    title: "National Launch of Project Greenshift Nepal",
    image: "./B1wq4pir1AnvaoWzfXo2.jpg",
    date: "Feb 21, 2024",
    link: "",
  },
];

let impactNumbers = [
  {
    num: 3,
    numCaption: "",
    title: "CSOs of WW",
    icon: "",
    text: "",
  },
  {
    num: 11000,
    numCaption: "",
    title: "Young Students Reached",
    icon: "",
    text: "",
  },
  {
    num: 9,
    numCaption: "",
    title: "Waste Smart Fellows",
    icon: "",
    text: "",
  },
  {
    num: 36,
    numCaption: "",
    title: "Climate Smart Schools",
    icon: "",
    text: "",
  },
];

export default function Home() {
  useSnoothScroll();
  return (
    <>
      <Head>
        <title>GREENSHIFT NEPAL</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="./1a3b9e8c-88a0-449a-8c74-0f58aef99fe6.png"
        />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>

      <section className={homeStyle.hero}>
        <video autoPlay loop muted>
          <source src="./intro.mp4" type="video/mp4" />
        </video>
        <Container maxWidth="xl">
          <div className={homeStyle.text}>
            <h1>Circularity of Plastic Waste</h1>

            <p>
              Promoting circular economy of plastics by effectively working
              towards minimizing plastic waste and diverting existing waste into
              product value chain.
            </p>
          </div>
        </Container>
      </section>

      <section className={homeStyle.intro} id="intro">
        <div className={homeStyle.curve}>
          <BannerWave fill="#fff" />
        </div>

        <Container maxWidth="lg">
          <Grid container alignItems={"center"} spacing={10}>
            <Grid item sm={6} id="introText">
              <h2>About Us</h2>
              <p>
                Green Shift: Circularity of Plastic Waste for Net-Zero Carbon
                Nepal (GreenShift Nepal) project is funded by the European Union
                to promote a just transition to circular economy. GreenShift
                Nepal is a four-year project which will be implemented in 9
                municipalities – 3 in each of Bagmati, Madhesh, and Lumbini
                provinces.
              </p>
              <p>
                The project implementation is led by <strong>CREASION</strong>{" "}
                through the consortium partners
                <strong> Restless Development</strong>, and{" "}
                <strong>Youth Innovation Lab</strong>.
              </p>
            </Grid>

            <Grid item sm={6}>
              <video autoPlay loop muted>
                <source src="./SDG goals GS.mp4" type="video/mp4" />
              </video>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={homeStyle.impacts_map}>
        <div className={homeStyle.curve}>
          <Wave fill="#e9d5aa80" />
        </div>
        <Container maxWidth="lg">
          <h2 style={{ textAlign: "center" }}>Where we Work</h2>

          <Container maxWidth="sm" style={{ textAlign: "center" }}>
            <p>
              GreenShift Nepal is a four-year project which will be implemented
              in 9 municipalities – 3 in each of Bagmati, Madhesh, and Lumbini
              provinces.
            </p>
          </Container>
          <MapComponent />
        </Container>
      </section>

      <section className={homeStyle.focus_area}>
        {/* <div className={homeStyle.curve}>
          <Wave fill="#1e607a" />
        </div> */}

        <Container maxWidth="lg">
          <h2 style={{ textAlign: "center" }}>Focus Areas</h2>

          <Container maxWidth="sm" style={{ textAlign: "center" }}>
            <p>
              GreenShift Nepal will work with waste enterprises, SMEs, CSOs of
              waste workers, youths, school children, and three tiers of
              government in the promotion of circular economy of plastics.
            </p>
          </Container>
        </Container>

        <div className={homeStyle.focusBox}>
          <HomeFocusArea />
        </div>
      </section>

      <section className={homeStyle.home_news}>
        <Container maxWidth="lg">
          <h2>News & Updates</h2>
          <Container
            maxWidth="sm"
            style={{ marginLeft: "0", paddingLeft: "0" }}
          >
            <p>
              GreenShift Nepal will work with waste enterprises, SMEs, CSOs of
              waste workers, youths, school children, and three tiers of
              government in the promotion of circular economy of plastics.
            </p>
          </Container>

          <Grid container spacing={4}>
            <Grid item md={6}>
              {newsData.slice(1, 4).map((val, index) => {
                return (
                  <Card
                    variant="outlined"
                    key={index}
                    className={homeStyle.news_card}
                  >
                    <Grid
                      container
                      spacing={4}
                      style={{ alignItems: "center" }}
                    >
                      <Grid item md={4}>
                        <img src={val.image} alt="" />
                      </Grid>

                      <Grid item md={8} className={homeStyle.news_text}>
                        <p>{val.date}</p>
                        <h6>{val.title}</h6>

                        <Link href={""}>
                          Read More <ArrowOutwardIcon />
                        </Link>
                      </Grid>
                    </Grid>
                  </Card>
                );
              })}
            </Grid>

            <Grid item md={6}>
              <Card
                variant="outlined"
                className={`${homeStyle.news_card} ${homeStyle.news_card_big}`}
              >
                <img src={newsData[0].image} alt="" />

                <div className={homeStyle.news_big_text}>
                  <p>{newsData[0].date}</p>
                  <h6>{newsData[0].title}</h6>

                  <Link href={""}>
                    Read More <ArrowOutwardIcon />
                  </Link>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={homeStyle.partners}>
        <div className={homeStyle.curve}>
          <Wave fill="#fff" />
        </div>
        <Partners />
      </section>
    </>
  );
}
