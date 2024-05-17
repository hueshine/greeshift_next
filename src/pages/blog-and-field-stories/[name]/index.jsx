import Head from "next/head";
import { Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";

import data from "../data.json";

import style from "../style.module.scss";
import Banner from "../../../layout/Banner/Banner";

const NewsDetail = () => {
  const router = useRouter();

  const { name } = router.query;

  let news = data;

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
    </>
  );
};

export default NewsDetail;
