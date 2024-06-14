import Banner from "../../layout/Banner/Banner";
import Head from "next/head";
import { Container, Grid, Link } from "@mui/material";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import Button from "@/components/Button/Button";

// import data from "./data.json";

import style from "./style.module.scss";
import { useRouter } from "next/router";

const Media = ({ apiData }) => {
  const router = useRouter();
  let lang = router.locale;

  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  return (
    <>
      <Head>
        <title>Media | Green Shift Nepal</title>
        <meta name="description" content={apiData.meta_description} />
        <meta property="og:image" content={`${imageUrl}/${apiData.og_image}`} />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <Banner
        title={lang == "en" ? apiData.banner_text : apiData.banner_text_np}
        parent={lang == "en" ? "Knowledge Hub" : "ज्ञान केन्द्र"}
      />

      <section className={style.about}>
        <Container maxWidth="lg">
          <div
            dangerouslySetInnerHTML={{
              __html: lang == "en" ? apiData.text : apiData.text_np,
            }}
          />
        </Container>
      </section>

      <section className={style.media_wrap}>
        <Container maxWidth={"lg"}>
          <Grid container spacing={4}>
            {apiData.events.map((val, index) => {
              let link = val.title.toLowerCase().replace(/\s+/g, "-");
              return (
                <Grid item sm={6} key={index}>
                  <div className={style.media_list}>
                    <div className={style.title}>
                      <Link href={`/media/${link}`}>
                        <h5>{lang == "en" ? val.title : val.title_np}</h5>
                      </Link>
                    </div>

                    <div className={style.footer}>
                      <Button
                        text={lang == "en" ? "Read More" : "थप पढ्नुहोस्"}
                        link={`/media/${link}`}
                      ></Button>

                      <p>
                        <CalendarTodayIcon />
                        {val.date}
                      </p>
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
  const response = await fetch("https://app.greenshift.creasion.org/api/media");
  const apiData = await response.json();

  return {
    props: {
      apiData,
    },
    revalidate: 30,
  };
};

export default Media;
