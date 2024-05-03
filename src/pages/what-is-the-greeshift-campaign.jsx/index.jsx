import Banner from "../../layout/Banner/Banner";
import Head from "next/head";
import { Container, Grid, Link } from "@mui/material";

import style from "./style.module.scss";

const GreenShiftCampaign = () => {
  return (
    <>
      <Head>
        <title>What is the GreenShift Campaign | Green Shift Nepal</title>
        <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <Banner title={"What is the GreenShift Campaign?"} />

      <section className={style.about}>
        <Container maxWidth="lg">
          <h2>
            An Initiative under the GreenShift Nepal project, aims to promote a
            just transition towards{" "}
            <span>Circular Economy among youths and children</span>.
          </h2>

          <p>
            This campaign aims to provide young people with dynamic platforms to
            express their creativity. Through avenues like slogans, art,
            photography, and posters, this campaign empowers young minds to
            showcase their talents while simultaneously deepening their
            understanding of environmental sustainability, plastic pollution,
            and the principles of circular economy.
          </p>

          <p>
            Ultimately, the campaign aims to unite young voices, amplifying the
            call to action. It emphasizes that the time for action is now,
            urging the younger generation to work towards a sustainable world
            for themselves and future generations.
          </p>
        </Container>
      </section>

      <section className={style.mission}>
        <Container maxWidth={"lg"}>
          <h2>
            Our mission is to amplify awareness around{" "}
            <span>the issue of plastic pollution</span>
          </h2>
          <p>
            Its core mission is to amplify awareness around the urgent issue of
            plastic pollution, both globally and within Nepal's diverse regions.
            By highlighting the profound impacts of plastic pollution on
            ecosystems, wildlife, natural resources, and the planet, the
            campaign aims to inspire action and change.{" "}
          </p>

          <p>
            Through the power of art and creativity, this campaign seeks to
            inspire action. Artivism, the dynamic fusion of art and activism,
            harnesses the emotional resonance of art to drive strategic social
            change. The GreenShift campaign endeavours to offer a diverse array
            of creative platforms for young minds to explore possibilities and
            depict the pressing issue of plastic pollution through their unique
            perspectives.
          </p>
        </Container>
      </section>

      <section className={style.campaign_wrap}>
        <Container>
          <h2>
            Do You want to be part of the <span>GreenShift Campaign?</span>{" "}
          </h2>

          <Grid container columnSpacing={4}>
            <Grid item md={4}>
              <div className={style.campaign_card}>
                <img src="/FROMg4Y0DlqW4Q45geDb.jpg" alt="" />

                <div className={style.text}>
                  <h4>#GreenShift Photography Competition </h4>
                  <div>
                    <p>
                      Photography serves as a transformative tool, offering
                      unique perspectives through various lenses and enabling
                      diverse narratives to emerge. It holds the remarkable
                      ability to persuade and shed light on pressing issues,
                      compelling viewers to take action in preserving our
                      environment.{" "}
                    </p>

                    <Link href={"/"}>Learn More </Link>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default GreenShiftCampaign;
