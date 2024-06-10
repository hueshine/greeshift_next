import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import style from "./style.module.scss";
import { Container, Grid, Link } from "@mui/material";

const Blogs = ({ apiData }) => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";
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

      <Banner title={apiData.banner_text} parent={"Knowledge Hub"} />

      <div className={style.blog_wrapper}>
        <Container maxWidth={"lg"}>
          <Grid container spacing={4}>
            <Grid item sm={12}>
              <div className={style.blog_latest}>
                <div className={style.image}>
                  <img src={`${imageUrl}/${apiData.blogs[0].image}`} alt="" />
                </div>
                <div className={style.text}>
                  <h4>{apiData.blogs[0].title}</h4>
                  <span>
                    {apiData.blogs[0].author} | {apiData.blogs[0].date}
                  </span>

                  <div
                    className={style.blog_text}
                    dangerouslySetInnerHTML={{ __html: apiData.blogs[0].text }}
                  />

                  <Link
                    href={`/blog-and-field-stories/${apiData.blogs[0].title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </Grid>

            {apiData.blogs.slice(1).map((val, index) => {
              let link = val.title.toLowerCase().replace(/\s+/g, "-");
              return (
                <Grid key={index} item md={4} xs={12}>
                  <div className={style.blog_grid}>
                    <div className={style.image}>
                      <img src={`${imageUrl}/${val.image}`} alt="" />
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

export const getStaticProps = async ({}) => {
  // Fetch additional data from the API
  const response = await fetch("https://app.greenshift.creasion.org/api/blogs");
  const apiData = await response.json();

  return {
    props: {
      apiData,
    },
    revalidate: 30,
  };
};

export default Blogs;
