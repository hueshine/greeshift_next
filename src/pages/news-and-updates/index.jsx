import React from "react";
import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import style from "./news.module.scss";
import { Container, Grid } from "@mui/material";

import Link from "next/link";
import { useRouter } from "next/router";

const News = ({ apiData }) => {
  const router = useRouter();
  let lang = router.locale;
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";
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
        title={lang == "en" ? apiData.banner_text : apiData.banner_text_np}
        parent={lang == "en" ? "Knowledge Hub" : "ज्ञान केन्द्र"}
      />

      <section className={style.newsList}>
        <Container maxWidth={"lg"}>
          <Grid container spacing={3}>
            {apiData.news.map((val, index) => {
              let link = val.title.toLowerCase().replace(/\s+/g, "-");

              return (
                <Grid item md={4} key={index}>
                  <div className={style.news_wrap}>
                    <div className={style.news_wrap_image}>
                      <img src={`${imageUrl}/${val.image}`} alt="" />
                    </div>
                    <div className={style.news_wrap_text}>
                      <h6>{lang == "en" ? val.title : val.title_np}</h6>

                      <span>{val.date}</span>

                      <div
                        className={style.news_wrap_text_description}
                        dangerouslySetInnerHTML={{
                          __html: lang == "en" ? val.text : val.text_np,
                        }}
                      />

                      <Link href={`/news-and-updates/${link}`}>
                        {lang == "en" ? "Read More" : "थप पढ्नुहोस्"}
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
  const response = await fetch("https://app.greenshift.creasion.org/api/news");
  const apiData = await response.json();

  return {
    props: {
      apiData,
    },
    revalidate: 30,
  };
};

export default News;
