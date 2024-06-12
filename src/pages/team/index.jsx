import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import style from "./style.module.scss";
import { Container, Drawer } from "@mui/material";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";

const Team = ({ apiData }) => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  const router = useRouter();
  let lang = router.locale;

  const [activeData, setActiveData] = useState(apiData.PIT);
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeProfile, setActiveProfile] = useState();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen, val) => () => {
    setOpen(newOpen);
    setActiveProfile(val);
  };

  const DrawerList = (
    <div>
      {activeProfile ? (
        <div className={style.profile_detail}>
          <div className={style.close_btn} onClick={toggleDrawer(false)}>
            <CloseIcon />
          </div>
          <div className={style.head}>
            <div className={style.image}>
              <img src={`${imageUrl}/${activeProfile.image}`} alt="" />
            </div>

            <div className={style.detail}>
              <h4>
                {lang == "en" ? activeProfile.name : activeProfile.name_np}
              </h4>
              <p>
                {lang == "en"
                  ? activeProfile.designation
                  : activeProfile.designation_np}
              </p>
              <p>
                <small>
                  {lang == "en"
                    ? activeProfile.consortium
                    : activeProfile.consortium_np}
                </small>
              </p>
            </div>
          </div>

          <div className={style.text}>
            <div
              className={style.news_wrap_text_description}
              dangerouslySetInnerHTML={{
                __html:
                  lang == "en" ? activeProfile.text : activeProfile.text_np,
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <>
      <Head>
        <title>Team | Green Shift Nepal</title>
        {/* <meta property="og:image" content={`${imageUrl}/${apiData.banner}`} /> */}
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <Banner
        title={lang == "en" ? apiData.banner_text : apiData.banner_text_np}
        parent={"About"}
      />

      <Drawer
        className={style.drawer}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>

      <section className={style.team_text}>
        <Container maxWidth={"lg"}>
          <div
            dangerouslySetInnerHTML={{
              __html: lang == "en" ? apiData.intro : apiData.intro_np,
            }}
          />
        </Container>
      </section>

      <section className={style.tean_container}>
        <Container maxWidth={"lg"}>
          <div className={style.team_section}>
            <div className={style.section_nav}>
              <ul>
                {apiData.category.map((val, index) => {
                  return (
                    <li
                      key={index}
                      className={activeIndex == index ? style.active : ""}
                      onClick={() => {
                        setActiveData(apiData[val]);
                        setActiveIndex(index);
                      }}
                    >
                      {val}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={style.wrap}>
              {activeData.map((val, index) => {
                return (
                  <div
                    key={index}
                    className={style.team_card}
                    onClick={toggleDrawer(true, val)}
                  >
                    <div className={style.profile_image}>
                      <img src={`${imageUrl}/${val.image}`} alt="" />
                    </div>
                    <h5>{lang == "en" ? val.name : val.name_np}</h5>
                    <p>{lang == "en" ? val.designation : val.designation_np}</p>
                    <p>
                      <small>
                        {lang == "en" ? val.consortium : val.consortium_np}
                      </small>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export const getStaticProps = async ({}) => {
  // Fetch additional data from the API
  const response = await fetch("https://app.greenshift.creasion.org/api/team");
  const apiData = await response.json();

  return {
    props: {
      apiData,
    },
    revalidate: 30,
  };
};

export default Team;
