import { useState } from "react";

import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import style from "./style.module.scss";
import { Container, Grid, Link } from "@mui/material";
import { useRouter } from "next/router";

const Blogs = ({ apiData }) => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  const [filter, setFilter] = useState("all");

  const filteredBlogs =
    filter === "all"
      ? apiData.blogs
      : apiData.blogs.filter((blog) => blog.type === filter);

  const router = useRouter();
  let lang = router.locale;

  return (
    <>
      <Head>
        <title>Blogs and Field Stories | GREENSHIFT NEPAL</title>
        <meta name="description" content={apiData.meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content={`${imageUrl}/${apiData.og_image}`} />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>

      <Banner
        title={lang == "en" ? apiData.banner_text : apiData.banner_text_np}
        parent={lang == "en" ? "Knowledge Hub" : "ज्ञान केन्द्र"}
      />

      <div className={style.blog_wrapper}>
        <Container maxWidth={"lg"}>
          <div className={style.filter_buttons}>
            <button
              className={filter === "all" ? style.active : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "blog" ? style.active : ""}
              onClick={() => setFilter("blog")}
            >
              Blogs
            </button>
            <button
              className={filter === "story" ? style.active : ""}
              onClick={() => setFilter("story")}
            >
              Field Stories
            </button>
          </div>

          <Grid container spacing={4}>
            {filteredBlogs.map((val, index) => {
              let link = val.title.toLowerCase().replace(/\s+/g, "-");

              return (
                <Grid key={index} item md={index === 0 ? 12 : 4} xs={12}>
                  <div
                    className={
                      index === 0 ? style.blog_latest : style.blog_grid
                    }
                  >
                    <div className={style.image}>
                      <img src={`${imageUrl}/${val.image}`} alt="" />
                    </div>
                    <div className={style.text}>
                      <p
                        className={
                          val.type === "blog"
                            ? `${style.blog_type} ${style.blog}`
                            : `${style.blog_type} ${style.story}`
                        }
                      >
                        {val.type === "blog" ? "Blogs" : "Field Stories"}
                      </p>
                      <h4>{lang == "en" ? val.title : val.title_np}</h4>
                      <span>
                        {lang == "en" ? val.author : val.author_np} | {val.date}
                      </span>

                      <div
                        className={style.blog_text}
                        dangerouslySetInnerHTML={{
                          __html: lang == "en" ? val.text : val.text_np,
                        }}
                      />

                      <Link href={`/blog-and-field-stories/${link}`}>
                        {lang == "en" ? "Read More" : "थप पढ्नुहोस्"}
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
