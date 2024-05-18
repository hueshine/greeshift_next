import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import style from "./style.module.scss";
import { Container, Grid, Link } from "@mui/material";

import data from "./data.json";

const Blogs = () => {
  return (
    <>
      <Head>
        <title>Blogs and Field Stories | GREENSHIFT NEPAL</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="./1a3b9e8c-88a0-449a-8c74-0f58aef99fe6.png"
        />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>

      <Banner title={"Blogs & Field Stories"} parent={"Knowledge Hub"} />

      <div className={style.blog_wrapper}>
        <Container maxWidth={"lg"}>
          <Grid container spacing={4}>
            <Grid item md={12}>
              <div className={style.blog_latest}>
                <div className={style.image}>
                  <img src={data[0].image} alt="" />
                </div>
                <div className={style.text}>
                  <h4>{data[0].title}</h4>
                  <span>
                    {data[0].author} | {data[0].date}
                  </span>

                  <div
                    className={style.blog_text}
                    dangerouslySetInnerHTML={{ __html: data[0].text }}
                  />

                  <Link
                    href={`/blog-and-field-stories/${data[0].title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </Grid>

            {data.slice(1).map((val, index) => {
              let link = val.title.toLowerCase().replace(/\s+/g, "-");
              return (
                <Grid key={index} item md={4}>
                  <div className={style.blog_grid}>
                    <div className={style.image}>
                      <img src={val.image} alt="" />
                    </div>
                    <div className={style.text}>
                      <h4>{val.title}</h4>
                      <span>
                        {val.author} | {val.date}
                      </span>

                      <div
                        className={style.blog_text}
                        dangerouslySetInnerHTML={{ __html: val.text }}
                      />

                      <Link href={`/blog-and-field-stories/${link}`}>
                        Read More
                      </Link>
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Blogs;