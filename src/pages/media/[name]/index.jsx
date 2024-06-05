import React, { useState } from "react";

import Head from "next/head";
import { Container, Grid } from "@mui/material";
import { useRouter } from "next/router";

import { useIsomorphicLayoutEffect } from "@/hook";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Button from "@/components/Button/Button";

import style from "../style.module.scss";
import Banner from "../../../layout/Banner/Banner";

const NewsDetail = () => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";
  const [dataNews, setDataNews] = useState(null);

  const router = useRouter();

  const { name } = router.query;

  useIsomorphicLayoutEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://app.greenshift.creasion.org/api/media");
      const newData = await res.json();
      setDataNews(newData.events);
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
            <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
            <meta property="og:image:width" content="640" />
            <meta property="og:image:height" content="442" />
          </Head>

          <Banner title={"Media Coverage"} parent={"Knowledge Hub"} />

          <section className={style.about}>
            <Container maxWidth="lg">
              <h2>{selectedNews[0].title}</h2>
            </Container>
          </section>

          <section className={style.media_wrap}>
            <Container maxWidth={"lg"}>
              <Grid container spacing={4}>
                {selectedNews[0].media.map((val, index) => (
                  <Grid key={index} item sm={6}>
                    <div className={style.coverage}>
                      <div className={style.image}>
                        <img
                          src={`https://www.app.greenshift.creasion.org/storage/${val.mediaLogo}`}
                          alt=""
                        />
                      </div>

                      <div className={style.title}>
                        <a href={val.link} target="_blank">
                          <h5>{val.mediaTitle}</h5>
                        </a>

                        <p>
                          <CalendarTodayIcon /> {selectedNews[0].date}
                        </p>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>

              <div className={style.see_more}>
                <Button text={"More Media Coverages"} link={`/media`}></Button>
              </div>
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
