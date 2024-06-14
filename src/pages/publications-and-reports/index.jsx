import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import style from "./style.module.scss";
import { Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
const Reports = ({ apiData }) => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  const router = useRouter();
  let lang = router.locale;

  return (
    <>
      <Head>
        <title>{apiData.page_title} | GREENSHIFT NEPAL</title>
        <meta name="description" content={apiData.meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content={`${imageUrl}/${apiData.og_image}`} />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>

      <Banner
        parent={lang == "en" ? "Knowledge Hub" : "ज्ञान केन्द्र"}
        title={lang == "en" ? apiData.banner_text : apiData.banner_text_np}
      />

      <section className={style.report_wrap}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {apiData.publications.map((val, index) => {
              let linkString = JSON.parse(val.file);
              let link = linkString[0].download_link;

              return (
                <Grid item md={3} key={index}>
                  <div className={style.report_card}>
                    <a href={`${imageUrl}/${link}`} target="_blank">
                      <img src={`${imageUrl}/${val.image}`} alt="" />

                      <h5>{lang == "en" ? val.title : val.title_np}</h5>
                    </a>
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
    "https://app.greenshift.creasion.org/api/publication"
  );
  const apiData = await response.json();

  return {
    props: {
      apiData,
    },
    revalidate: 30,
  };
};

export default Reports;
