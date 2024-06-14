import React, { useState } from "react";

import Head from "next/head";
import { Container } from "@mui/material";
import { useRouter } from "next/router";

import { useIsomorphicLayoutEffect } from "@/hook";

import style from "../style.module.scss";
import Banner from "../../../layout/Banner/Banner";

const NewsDetail = () => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";
  const [dataNews, setDataNews] = useState(null);

  const router = useRouter();
  let lang = router.locale;

  const { name } = router.query;

  useIsomorphicLayoutEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://app.greenshift.creasion.org/api/blogs");
      const newData = await res.json();
      setDataNews(newData.blogs);
    };
    fetchData();
  }, []);

  const NewsSingle =
    dataNews &&
    dataNews.find((el) => el.title.toLowerCase().replace(/\s+/g, "-") === name);

  let selectedNews = null;
  if (NewsSingle) {
    selectedNews = [NewsSingle];
  }

  return (
    <>
      {selectedNews ? (
        <>
          <Head>
            <title>{selectedNews[0].title} | Green Shift Nepal</title>
            <meta
              property="og:image"
              content={`${imageUrl}/${selectedNews[0].image}`}
            />
            <meta property="og:image:width" content="640" />
            <meta property="og:image:height" content="442" />
          </Head>
          <Banner
            title={lang == "en" ? "Blogs & Field Stories" : "ब्लग र कथाहरू"}
          />

          <section className={style.newsDetail}>
            <Container maxWidth={"lg"}>
              <div className={style.newsDetail_title}>
                <h2>
                  {lang == "en"
                    ? selectedNews[0].title
                    : selectedNews[0].title_np}
                </h2>
                <p>
                  <small>{selectedNews[0].date}</small>
                </p>

                <img src={`${imageUrl}/${selectedNews[0].image}`} alt="" />
              </div>

              <div
                className={style.newsDetail_text}
                dangerouslySetInnerHTML={{
                  __html:
                    lang == "en"
                      ? selectedNews[0].text
                      : selectedNews[0].text_np,
                }}
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
