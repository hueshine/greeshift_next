import Banner from "../../../layout/Banner/Banner";
import Head from "next/head";
import { Container, Grid, Link } from "@mui/material";

import style from "../style.module.scss";
import { useRouter } from "next/router";

const GreenShiftCampaign = ({ apiData }) => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  const router = useRouter();
  let lang = router.locale;

  return (
    <>
      <Head>
        <title>GreenShift Campaigns | Green Shift Nepal</title>
        <meta
          property="og:image"
          content={`${imageUrl}/${apiData.header.basic_og}`}
        />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <Banner title={lang == "en" ? "GreenShift Campaigns" : "अभियानहरू"} />

      <section className={style.campaign_wrap}>
        <Container>
          <Grid container columnSpacing={4}>
            {apiData.campaigns.map((val, index) => {
              let link = val.title.toLowerCase().replace(/\s+/g, "-");

              return (
                <Grid item md={4} key={index}>
                  <div className={style.campaign_card}>
                    <img src={`${imageUrl}/${val.image}`} alt="" />

                    <div className={style.text}>
                      <h4>{lang == "en" ? val.title : val.title_np}</h4>

                      <div
                        className={style.text_short}
                        dangerouslySetInnerHTML={{
                          __html:
                            lang == "en" ? val.description : val.description_np,
                        }}
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
