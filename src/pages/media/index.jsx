import Banner from "../../layout/Banner/Banner";
import Head from "next/head";
import { Container, Grid, Link } from "@mui/material";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import Button from "@/components/Button/Button";

import data from "./data.json";

import style from "./style.module.scss";

const Media = () => {
  return (
    <>
      <Head>
        <title>Media | Green Shift Nepal</title>
        <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <Banner title={data.banner_text} parent={"Knowledge Hub"} />

      <section className={style.about}>
        <Container maxWidth="lg">
          <div
            dangerouslySetInnerHTML={{
              __html: data.text,
            }}
          />
        </Container>
      </section>

      <section className={style.media_wrap}>
        <Container maxWidth={"lg"}>
          <Grid container spacing={4}>
            {data.events.map((val, index) => {
              return (
                <Grid item sm={6} key={index}>
                  <div className={style.media_list}>
                    <div className={style.title}>
                      <Link href={"/"}>
                        <h5>{val.title}</h5>
                      </Link>
                    </div>

                    <div className={style.footer}>
                      <Button text={"Read More"} link={"/"}></Button>

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

export default Media;
