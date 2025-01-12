import Banner from "../../../layout/Banner/Banner";
import Head from "next/head";
import { Container, Grid, Link } from "@mui/material";

import style from "../style.module.scss";
import { useRouter } from "next/router";

import EastIcon from "@mui/icons-material/East";
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
          {apiData.campaigns.map((val, index) => {
            let link = val.title.toLowerCase().replace(/\s+/g, "-");

            return (
              <div className={style.campaign_card} key={index}>
                <Grid container className={style.campaign_row}>
                  <Grid item md="6">
                    <div className={style.campaign_card_image}>
                      <Link href={`/greenshift-campaigns/${link}`}>
                        <img src={`${imageUrl}/${val.image}`} alt="" />
                      </Link>
                    </div>
                  </Grid>

                  <Grid item md="6">
                    <div className={style.text}>
                      <h4>
                        <Link href={`/greenshift-campaigns/${link}`}>
                          {lang == "en" ? val.title : val.title_np}
                        </Link>
                      </h4>
                      <div
                        className={style.text_short}
                        dangerouslySetInnerHTML={{
                          __html:
                            lang == "en" ? val.description : val.description_np,
                        }}
                      />

                      <Link
                        href={`/greenshift-campaigns/${link}`}
                        className={style.readmore}
                      >
                        Learn More <EastIcon />
                      </Link>
                    </div>
                  </Grid>
                </Grid>
              </div>
            );
          })}
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
