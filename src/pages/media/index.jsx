import Banner from "../../layout/Banner/Banner";
import Head from "next/head";
import { Container, Grid, Link } from "@mui/material";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import Button from "@/components/Button/Button";

// import data from "./data.json";

import style from "./style.module.scss";

const Media = ({ apiData }) => {
  return (
    <>
      <Head>
        <title>Media | Green Shift Nepal</title>
        <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <Banner title={apiData.banner_text} parent={"Knowledge Hub"} />

      <section className={style.about}>
        <Container maxWidth="lg">
          <div
            dangerouslySetInnerHTML={{
              __html: apiData.text,
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
                        <h5>{val.title}</h5>
                      </Link>
                    </div>

                    <div className={style.footer}>
                      <Button
                        text={"Read More"}
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
