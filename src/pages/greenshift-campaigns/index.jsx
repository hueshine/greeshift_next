import Banner from "../../layout/Banner/Banner";
import Head from "next/head";
import { Container, Grid, Link } from "@mui/material";

import style from "./style.module.scss";

const GreenShiftCampaign = ({ apiData }) => {
  console.log(apiData);
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  return (
    <>
      <Head>
        <title>What is the GreenShift Campaign | Green Shift Nepal</title>
        <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <Banner title={apiData.header.basic_banner_text} />

      <section className={style.about}>
        <Container maxWidth="lg">
          <div
            className={style.news_wrap_text_description}
            dangerouslySetInnerHTML={{
              __html: apiData.header.basic_introduction,
            }}
          />
        </Container>
      </section>

      <section className={style.mission}>
        <Container maxWidth={"lg"}>
          <div
            className={style.news_wrap_text_description}
            dangerouslySetInnerHTML={{
              __html: apiData.header.basic_description,
            }}
          />
        </Container>
      </section>

      <section className={style.campaign_wrap}>
        <Container>
          <div
            className={style.news_wrap_text_description}
            dangerouslySetInnerHTML={{
              __html: apiData.header.basic_post_description,
            }}
          />

          <Grid container columnSpacing={4} justifyContent={"center"}>
            {apiData.campaigns.map((val, index) => {
              let link = val.title.toLowerCase().replace(/\s+/g, "-");

              return (
                <Grid item md={4} key={index}>
                  <div className={style.campaign_card}>
                    <img src={`${imageUrl}/${val.image}`} alt="" />

                    <div className={style.text}>
                      <h4>{val.title}</h4>

                      <div
                        className={style.text_short}
                        dangerouslySetInnerHTML={{ __html: val.text }}
                      />

                      <Link href={`/greenshift-campaigns/${link}`}>
                        Learn More{" "}
                      </Link>
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </section>
    </>
  );
};

export const getStaticProps = async ({}) => {
  // Fetch additional data from the API
  const response = await fetch(
    "https://app.greenshift.creasion.org/api/campaign"
  );
  const apiData = await response.json();

  return {
    props: {
      apiData,
    },
    revalidate: 30,
  };
};

export default GreenShiftCampaign;
