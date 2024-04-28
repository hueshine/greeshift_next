import Head from "next/head";
import { Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";

import newsData from "../data.json";

import style from "../news.module.scss";
import Banner from "../../../layout/Banner/Banner";

const NewsDetail = () => {
  const router = useRouter();

  const { name } = router.query;

  let news = newsData.news;

  const selectedNews = news.find(
    (el) => el.title.toLowerCase().replace(/\s+/g, "-") === name
  );
  return (
    <>
      {selectedNews ? (
        <>
          <Head>
            <title>{selectedNews.title} | Green Shift Nepal</title>
            <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
            <meta property="og:image:width" content="640" />
            <meta property="og:image:height" content="442" />
          </Head>

          <Banner />
          <section className={style.newsDetail}>
            <Container maxWidth={"lg"}>
              <div className={style.newsDetail_title}>
                <h2>{selectedNews.title}</h2>
                <p>
                  <small>{selectedNews.date}</small>
                </p>

                <img src={selectedNews.image} alt="" />
              </div>

              <div
                className={style.newsDetail_text}
                dangerouslySetInnerHTML={{ __html: selectedNews.text }}
              />
            </Container>
          </section>
        </>
      ) : (
        ""
      )}

      <section className={style.recent_news}>
        <Container maxWidth={"lg"}>
          <h2>Recent News & Updates</h2>

          <Grid container spacing={3}>
            {news.slice(0, 3).map((val, index) => {
              let link = val.title.toLowerCase().replace(/\s+/g, "-");

              return (
                <Grid item md={4} key={index}>
                  <div className={style.news_wrap}>
                    <div className={style.news_wrap_text}>
                      <h6>{val.title}</h6>

                      <span>{val.date}</span>

                      <div
                        className={style.news_wrap_text_description}
                        dangerouslySetInnerHTML={{ __html: val.text }}
                      />

                      <Link href={`/news-and-updates/${link}`}>Read More</Link>
                    </div>
                    <div className={style.news_wrap_image}>
                      <img src={val.image} alt="" />
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

export default NewsDetail;
