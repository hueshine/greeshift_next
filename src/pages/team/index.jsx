import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import style from "./style.module.scss";
import { Container, Drawer } from "@mui/material";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

import data from "./data.json";

const Team = () => {
  const [activeData, setActiveData] = useState(data.PIT);
  const [activeIndex, setActiveIndex] = useState(0);
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
              <img src={activeProfile.image} alt="" />
            </div>

            <div className={style.detail}>
              <h4>{activeProfile.name}</h4>
              <p>{activeProfile.designation}</p>
              <p>
                <small>{activeProfile.consortium}</small>
              </p>
            </div>
          </div>

          <div className={style.text}>
            <div
              className={style.news_wrap_text_description}
              dangerouslySetInnerHTML={{ __html: activeProfile.text }}
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
        <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <Banner title={"Team"} parent={"About"} />

      <Drawer
        className={style.drawer}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>

      <section className={style.team_text}>
        <Container maxWidth={"lg"}>
          <h2>
            A shared passion for the <em>Green Shift</em>
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa aut
            quae voluptatum ipsa eum eaque mollitia corrupti aliquid odit.
            Consectetur id eius accusantium. Magnam illum, libero fugit atque
            hic nulla esse sunt accusamus eaque mollitia alias adipisci minus
            veritatis id tempore, totam voluptates aperiam quae, officia
            consectetur harum dolor suscipit doloremque! Eius!
          </p>
        </Container>
      </section>

      <section className={style.tean_container}>
        <Container maxWidth={"lg"}>
          <div className={style.team_section}>
            <div className={style.section_nav}>
              <ul>
                {data.category.map((val, index) => {
                  return (
                    <li
                      key={index}
                      className={activeIndex == index ? style.active : ""}
                      onClick={() => {
                        setActiveData(data[val]);
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
                      <img src={val.image} alt="" />
                    </div>
                    <h5>{val.name}</h5>
                    <p>{val.designation}</p>
                    <p>
                      <small>{val.consortium}</small>
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

export default Team;
