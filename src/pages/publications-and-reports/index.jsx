import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import style from "./style.module.scss";
import { Container, Grid } from "@mui/material";
const Reports = ({ apiData }) => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  // console.log(apiData.publications[0].file.download_link);
  return (
    <>
      <Head>
        <title>{apiData.page_title} | GREENSHIFT NEPAL</title>
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

      <Banner parent={"Knowledge Hub"} title={apiData.banner_text} />

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

                      <h5>{val.title}</h5>
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
