import { useRouter } from "next/router";
import Banner from "../../../layout/Banner/Banner";
import Head from "next/head";
import { Container } from "@mui/material";
import style from "./style.module.scss";
import { useState } from "react";

import DownloadIcon from "@mui/icons-material/Download";

const Career = ({ apiData }) => {
  const router = useRouter();
  let lang = router.locale;

  // const careerTypes = apiData.vacancy.map((v) => v.career_type);
  // const uniqueCareerTypes = Array.from(
  //   new Set(careerTypes.map(JSON.stringify))
  // ).map(JSON.parse);

  const [activeIndex, setActiveIndex] = useState(0);

  const [activeCarrer, setActiveCarrer] = useState(apiData.category[0].title);

  const [job, setJob] = useState(-1);

  return (
    <>
      <Head>
        <title>Career | Green Shift Nepal</title>
        <meta property="og:image" content="./focusarea1.png" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>

      <Banner title={lang == "en" ? "Career" : "क्यारियर"} />

      <section className={style.carrer}>
        <Container maxWidth={"lg"}>
          <div className={style.section_nav}>
            <ul>
              {apiData.category.map((val, index) => {
                return (
                  <li
                    key={index}
                    className={activeIndex == index ? style.active : ""}
                    onClick={() => {
                      setActiveCarrer(val.title);
                      setActiveIndex(index);
                      setJob(-1);
                    }}
                  >
                    {lang == "en" ? val.title : val.title_np}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={style.nav_text}>
            <p>
              {apiData.category
                .filter((cat) => cat.title === activeCarrer)
                .map((cat) => (lang === "en" ? cat.text : cat.text_np))}
            </p>
          </div>

          <section className={style.list}>
            {apiData.vacancy
              .filter((job) => job.careerType_id === activeCarrer)
              .map((val, index) => {
                let fileStr = val.file;

                const fileArr = JSON.parse(fileStr);

                return (
                  <div className={style.list_card} key={index}>
                    <div className={style.job_card}>
                      <div className={style.job_title}>
                        <h4>{val.title}</h4>
                        <p>
                          Posted:{" "}
                          {new Date(val.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        {index == job ? (
                          <div className={style.job_file}>
                            {fileArr[0] && fileArr[0].download_link && (
                              <a
                                href={`https://www.app.greenshift.creasion.org/storage/${fileArr[0].download_link}`}
                                target="_blank"
                              >
                                <DownloadIcon /> Download PDF
                              </a>
                            )}
                          </div>
                        ) : (
                          <div className={style.job_file}>
                            {fileArr[0] && fileArr[0].download_link && (
                              <a
                                href={`https://www.app.greenshift.creasion.org/storage/${fileArr[0].download_link}`}
                                target="_blank"
                              >
                                <DownloadIcon /> Download PDF
                              </a>
                            )}

                            <button onClick={() => setJob(index)}>
                              Read More
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {index == job ? (
                      <div className={style.detail}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: lang == "en" ? val.details : val.details_np,
                          }}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
          </section>
        </Container>
      </section>
    </>
  );
};

export const getStaticProps = async ({}) => {
  // Fetch additional data from the API
  const response = await fetch(
    "https://app.greenshift.creasion.org/api/vacancy"
  );
  const apiData = await response.json();

  return {
    props: {
      apiData,
    },
    revalidate: 30,
  };
};

export default Career;
