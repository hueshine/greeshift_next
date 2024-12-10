import Banner from "../../layout/Banner/Banner";
import Head from "next/head";
import { Container, Grid, Link } from "@mui/material";

import Button from "@/components/Button/Button";
import style from "./style.module.scss";
import { useRouter } from "next/router";

const GreenShiftCampaign = ({ apiData }) => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  const router = useRouter();
  let lang = router.locale;

  console.log(apiData);

  return (
    <>
      <Head>
        <title>What is the GreenShift Campaign | Green Shift Nepal</title>
        <meta
          property="og:image"
          content={`${imageUrl}/${apiData.header.basic_og}`}
        />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <Banner
        title={
          lang == "en"
            ? apiData.header.basic_banner_text
            : apiData.header.basic_banner_text_np
        }
      />

      <section className={style.about}>
        <Container maxWidth="lg">
          <div
            className={style.news_wrap_text_description}
            dangerouslySetInnerHTML={{
              __html:
                lang == "en"
                  ? apiData.header.basic_introduction
                  : apiData.header.basic_introduction_np,
            }}
          />
        </Container>
      </section>

      {/* <section className={style.mission_image}>
        <img src={`${imageUrl}/${apiData.header.basic_og}`} alt="" />
      </section> */}

      <section className={style.mission}>
        <Container maxWidth={"lg"}>
          <div
            className={style.news_wrap_text_description}
            dangerouslySetInnerHTML={{
              __html:
                lang == "en"
                  ? apiData.header.basic_description
                  : apiData.header.basic_description_np,
            }}
          />

          <div className={style.camp_row}>
            <Grid container spacing={4}>
              {apiData.campaigns.slice(0, 3).map((val, index) => {
                let link = val.title.toLowerCase().replace(/\s+/g, "-");

                return (
                  <Grid item md="4" key={index}>
                    <div className={style.campaign_card}>
                      <div className={style.campaign_card_image}>
                        <Link href={`/greenshift-campaigns/${link}`}>
                          <img src={`${imageUrl}/${val.image}`} alt="" />
                        </Link>
                      </div>

                      <div className={style.text}>
                        <h4>
                          <Link href={`/greenshift-campaigns/${link}`}>
                            {lang == "en" ? val.title : val.title_np}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>

          <div className={style.see_more}>
            <Button
              text={lang == "en" ? "See All GreenShift Campaigns" : "अभियानहरू"}
              link={`/greenshift-campaigns/campaigns`}
            ></Button>
          </div>
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
