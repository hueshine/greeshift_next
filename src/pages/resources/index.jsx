import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import style from "./style.module.scss";
import { Container, Grid } from "@mui/material";
import { useRouter } from "next/router";

const Resources = ({ apiData }) => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  console.log(apiData);

  const router = useRouter();
  let lang = router.locale;

  return (
    <>
      <Head>
        <title>Resources | GREENSHIFT NEPAL</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="./focusarea1.png" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>

      <Banner
        parent={lang == "en" ? "Knowledge Hub" : "ज्ञान केन्द्र"}
        title={
          lang == "en"
            ? apiData.banner.basic_bannerTitle
            : apiData.banner.basic_bannerTitleNp
        }
      />

      <section className={style.section_wrap}>
        {apiData.downloadArr.map((val, index) => {
          return (
            <section className={style.report_wrap} key={index}>
              <Container maxWidth="lg">
                <h4 className={style.section_title}>
                  {lang == "en" ? val.title : val.titleNp}
                </h4>
                <Grid container spacing={4}>
                  {val.downloads.map((val, index) => {
                    let linkString = JSON.parse(val.link);
                    let link = linkString[0].download_link;

                    return (
                      <Grid item sm={12} md={3} key={index}>
                        <div className={style.report_card}>
                          <a href={`${imageUrl}/${link}`} target="_blank">
                            <img src={`${imageUrl}/${val.image}`} alt="" />

                            <h5>{lang == "en" ? val.title : val.titleNp}</h5>
                          </a>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </Container>
            </section>
          );
        })}

        <section className={style.report_wrap}>
          <Container maxWidth="lg">
            <h4 className={style.section_title}>
              {lang == "en" ? "Videos" : "Videos"}
            </h4>

            <Grid container spacing={4}>
              {apiData.videos.map((val, index) => {
                return (
                  <Grid item md={6} key={index}>
                    <div className={style.video_wrap}>
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${val.url}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>

                      <h5>{lang == "en" ? val.title : val.titleNp}</h5>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </section>
      </section>
    </>
  );
};

export const getStaticProps = async ({}) => {
  // Fetch additional data from the API
  const response = await fetch(
    "https://app.greenshift.creasion.org/api/downloads"
  );
  const apiData = await response.json();

  return {
    props: {
      apiData,
    },
    revalidate: 30,
  };
};

export default Resources;
