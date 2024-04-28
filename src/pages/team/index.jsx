import Banner from "../../layout/Banner/Banner";
import Head from "next/head";

import style from "./style.module.scss";
import { Container } from "@mui/material";
import { useState } from "react";

const data = {
  category: ["PIT", "PLT", "Fellows"],
  PIT: [
    {
      name: "Yunish Ghimire",
      designation: "Project Lead",
      consortium: "CREASION ",
      image: "/team/yunish.jpeg",
      text: "",
    },
    {
      name: "Mahendra Uprety",
      designation: "Project Associate",
      consortium: "CREASION",
      image: "/team/mahendra.jpeg",
      text: "",
    },
    {
      name: "Sabin Dotel",
      designation: "Waste Smart Fellowship Coordinator",
      consortium: "Youth Innovation Lab ",
      image: "/team/Youth_Innovation_Lab.png",
      text: "",
    },
    {
      name: "Sangita Maharjan",
      designation: "Program Coordinator",
      consortium: "Restless Development ",
      image: "/team/sangita.jpeg",
      text: "",
    },
    {
      name: "",
      designation: "Environment Officer",
      consortium: "CREASION ",
      image: "/team/creasion.png",
      text: "",
    },
    {
      name: "",
      designation: "MERL Officer",
      consortium: "CREASION ",
      image: "/team/creasion.png",
      text: "",
    },
    {
      name: "Neeti Pradhan",
      designation: "GESI Consultant",
      consortium: "CREASION",
      image: "/team/neeti.jpeg",
      text: "",
    },
    {
      name: "Milan Rayamajhi",
      designation: "Communications Officer",
      consortium: "CREASION ",
      image: "/team/milan.jpeg",
      text: "",
    },
    {
      name: "Pratibha Mishra",
      designation: "Finance Officer",
      consortium: "CREASION ",
      image: "/team/pratibha.jpeg",
      text: "",
    },
    {
      name: "",
      designation: "Finance Officer",
      consortium: "Restless Development ",
      image: "/team/restless_development.png",
      text: "",
    },
    {
      name: "Sudha Baidhya",
      designation: "Finance & Admin Manager",
      consortium: "Youth Innovation Lab ",
      image: "/team/sudha.png",
      text: "",
    },
    {
      name: "",
      designation: "Partnership & Communications Officer",
      consortium: "Restless Development",
      image: "/team/restless_development.png",

      text: "",
    },
  ],
  PLT: [
    {
      name: "Aanand Mishra",
      designation: "Founder & President",
      consortium: "CREASION",
      image: "/team/aanand.jpeg",
      text: "",
    },
    {
      name: "Pradip Khatiwada",
      designation: "Executive Director",
      consortium: "Youth Innovation Lab",
      image: "/team/Pradip.png",
      text: "",
    },
    {
      name: "Nalini Paul",
      designation: "Regional Director",
      consortium: "Restless Development ",
      image: "/team/nalini.jpeg",
      text: "",
    },
    {
      name: "Yunish Ghimire",
      designation: "Project Lead",
      consortium: "CREASION",
      image: "/team/yunish.jpeg",
      text: "",
    },
  ],
  Fellows: [
    {
      name: "Samyog Dhakal ",
      designation: "",
      consortium: "",
      image: "",
      text: "",
    },
    {
      name: "Om Shanti Thapa",
      designation: "",
      consortium: "",
      image: "",
      text: "",
    },
    {
      name: "Awanish Adhikari",
      designation: "",
      consortium: "",
      image: "",
      text: "",
    },
  ],
};

const Team = () => {
  const [activeData, setActiveData] = useState(data.PIT);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Head>
        <title>Team | Green Shift Nepal</title>
        <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <Banner title={"Team"} />

      <section className={style.team_text}>
        <Container maxWidth={"lg"}>
          <h2>A shared passion for the Green Shift</h2>
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
                  <div key={index} className={style.team_card}>
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
