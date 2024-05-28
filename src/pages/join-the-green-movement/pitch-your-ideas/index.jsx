import { useState } from "react";

import Head from "next/head";
import Banner from "../../../layout/Banner/Banner";

import { Link } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Container } from "@mui/material";

import style from "../style.module.scss";
import axios from "axios";

import PledgeIntoAction from "./PledgeIntoAction";
import CleanUp from "./CleanUp";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Ideas = () => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>Pitch your Ideas | Green Shift Nepal</title>
        <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>

      <Banner title={"Pitch Your Ideas"} />

      <section className={style.pitch_form}>
        <div className={style.form_container}>
          <Container maxWidth={"lg"}>
            <div className={style.form_container_title}>
              <h3>
                An open platform for everyone to{" "}
                <span>Engage, Educate and Empower</span> for a just transition
                towards <em>Circular Economy</em>.
              </h3>
              <p>
                Let’s Act together for a Better and Sustainable future, where
                plastic waste is minimized, resources are preserved, and
                societies thrive in harmony with nature.{" "}
              </p>

              <p>If you want to become a Green Warrior:</p>
            </div>
          </Container>

          <div className={style.forms_section}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="basic tabs example"
              className={style.forms_nav}
              sx={{
                "& .Mui-selected": { color: "#33b2b6 !important" },
                "& .MuiTabs-indicator": { backgroundColor: "#33b2b6" },
              }}
            >
              <Tab label="PLEDGE INTO ACTION" {...a11yProps(0)} />
              <Tab label="CLEAN-UP!" {...a11yProps(1)} />
            </Tabs>

            <Container maxWidth="lg">
              <CustomTabPanel value={value} index={0}>
                <div className={style.tab_title}>
                  <h3>
                    Ready to turn your take your <br />{" "}
                    <em>Pledge into Action?</em>{" "}
                  </h3>
                  <p>
                    Have you taken your Pledges? If not take you realistic
                    pledge from{" "}
                    <Link href="/join-the-green-movement/pledge">here</Link>
                  </p>
                </div>

                <PledgeIntoAction />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className={style.tab_title}>
                  <h3>CLEAN-UP !</h3>
                  <p>
                    If you’re someone who is passionate about the environment,
                    advocating, spreading awareness about keeping our
                    environment clean and green, here’s your chance to become a
                    Green Warrior!{" "}
                  </p>
                </div>

                <CleanUp />
              </CustomTabPanel>
            </Container>
          </div>
        </div>
      </section>
    </>
  );
};

export default Ideas;
