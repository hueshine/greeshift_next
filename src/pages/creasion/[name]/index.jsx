import Banner from "@/layout/Banner/Banner";
import Head from "next/head";
import style from "@/styles/activity.module.scss";
import { Container, Grid } from "@mui/material";

import { useIsomorphicLayoutEffect } from "@/hook";

import { useRouter } from "next/router";

import data from "../data.json";
import { useState } from "react";

const Creasion = () => {
  const router = useRouter();

  const { name } = router.query;

  const selectedData = data.find(
    (el) => el.title.toLowerCase().replace(/\s+/g, "-") === name
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState({
    activity: "",
    title: "",
    text: "",
    image: "",
  });

  useIsomorphicLayoutEffect(() => {
    if (selectedData && selectedData.activities) {
      setSelectedActivity(selectedData.activities[0]);
    }
  }, [selectedData]);

  useIsomorphicLayoutEffect(() => {
    const title = document.querySelector("#title-height");

    const rightEl = document.querySelector("#text-right");

    if (rightEl) {
      rightEl.style.marginTop = `${title.offsetHeight + 25}px`;
    }
  });
  return (
    <>
      {selectedData ? (
        <>
          <Head>
            <title>{selectedData.title} | Green Shift Nepal</title>
            <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
            <meta property="og:image:width" content="640" />
            <meta property="og:image:height" content="442" />
          </Head>
          <Banner title={selectedData.title} parent={"CREASION"} />

          <section className={style.about}>
            <Container maxWidth={"lg"}>
              <Grid container spacing={8}>
                <Grid item md={6}>
                  <h3 id="title-height">{selectedData.descriptionTitle}</h3>

                  <div
                    className={style.text}
                    dangerouslySetInnerHTML={{
                      __html: selectedData.description,
                    }}
                  />
                </Grid>

                <Grid item md={6}>
                  <div id="text-right">
                    <div
                      className={style.text}
                      dangerouslySetInnerHTML={{
                        __html: selectedData.objective,
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Container>
          </section>

          {selectedData.activities ? (
            <section className={style.activity}>
              <Container maxWidth={"lg"}>
                <div className={style.activity_nav}>
                  <ul>
                    {selectedData.activities.map((val, index) => {
                      return (
                        <li
                          key={index}
                          className={activeIndex == index ? style.active : ""}
                          onClick={() => {
                            setSelectedActivity(val);
                            setActiveIndex(index);
                          }}
                        >
                          {val.activity}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className={style.activity_detail}>
                  <Grid container columnSpacing={8}>
                    <Grid item sm={6}>
                      <div className={style.activity_detail_text}>
                        <label>{selectedActivity.activity}</label>
                        <h4>{selectedActivity.title}</h4>
                        <div
                          className={style.text}
                          dangerouslySetInnerHTML={{
                            __html: selectedActivity.text,
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item sm={6}>
                      <img src={selectedActivity.image} alt="" />
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </section>
          ) : (
            ""
          )}
        </>
      ) : (
        " "
      )}
    </>
  );
};

export default Creasion;
