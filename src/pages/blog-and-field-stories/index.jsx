import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import style from "./style.module.scss";
import { Container, Grid, Link } from "@mui/material";
import { useRouter } from "next/router";

const Blogs = ({ apiData }) => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

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
          <Grid container spacing={4}>
            <Grid item sm={12}>
              <div className={style.blog_latest}>
                <div className={style.image}>
                  <img src={`${imageUrl}/${apiData.blogs[0].image}`} alt="" />
                </div>
                <div className={style.text}>
                  <h4>
                    {lang == "en"
                      ? apiData.blogs[0].title
                      : apiData.blogs[0].title_np}
                  </h4>
                  <span>
                    {lang == "en"
                      ? apiData.blogs[0].author
                      : apiData.blogs[0].author_np}{" "}
                    | {apiData.blogs[0].date}
                  </span>

                  <div
                    className={style.blog_text}
                    dangerouslySetInnerHTML={{
                      __html:
                        lang == "en"
                          ? apiData.blogs[0].text
                          : apiData.blogs[0].text_np,
                    }}
                  />

                  <Link
                    href={`/blog-and-field-stories/${apiData.blogs[0].title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {lang == "en" ? "Read More" : "थप पढ्नुहोस्"}
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
