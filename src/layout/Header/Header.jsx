import { useState } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

import { useRouter } from "next/router";

import { Grid } from "@mui/material";
import headerStyle from "./header.module.scss";
import Link from "next/link";

import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";

import { useIsomorphicLayoutEffect } from "@/hook";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,

  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('/usa-flag.svg')`,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "80%",
      height: "80%",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('/nepal-flag.svg')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "#ADDFE1 !important"
        ? "#ADDFE1 !important"
        : "#ADDFE1 !important",
    borderRadius: 20 / 2,
  },
}));

const Header = () => {
  const router = useRouter();
  let lang = router.locale;

  const handleLocaleChange = (locale) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    let btns = document.querySelectorAll(".btn-page");
    let submenu = document.querySelectorAll(".submenu");
    let header = document.querySelector(".header");

    header.addEventListener("mouseover", () => {
      submenu.forEach((menu) => {
        menu.classList.remove(headerStyle.close);
      });
    });

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        setOpen(false);

        submenu.forEach((menu) => {
          menu.classList.add(headerStyle.close);
        });
      });
    });
  }, [open]);

  useIsomorphicLayoutEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://app.greenshift.creasion.org/api/activities"
      );
      const apiData = await res.json();

      setActivityData(apiData.items);
      setLoading(false);
    };
    fetchData();
  }, []);

  const ButtonList = () => {
    return (
      <div className={`${headerStyle.submenu} submenu`}>
        <div className={headerStyle.wrap}>
          <Link href={"/greenshift-campaigns"}>
            {lang == "en"
              ? "What is the GreenShift Campaign?"
              : "ग्रीनसिफ्ट अभियान के हो ?"}
          </Link>
          <Link className="btn-page" href={"/greenshift-campaigns/campaigns"}>
            {lang == "en" ? "Campaigns" : "अभियानहरू"}
          </Link>
          <Link href={"/join-the-green-movement/pledge"}>
            {lang == "en" ? "(Realistic) Pledge" : "प्लेज (प्रतिज्ञा)"}
          </Link>
          <Link href={"/join-the-green-movement/pitch-your-ideas"}>
            {" "}
            {lang == "en" ? "Pitch Your Ideas" : "तपाईको अवधारणा"}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <header className={`${headerStyle.header} header`}>
      <div className={headerStyle.container}>
        <Grid container alignItems="center">
          <Grid item md={2}>
            <div className={headerStyle.logo}>
              <Link href={"/"} className="btn-page">
                <img src="/logo.png" alt="" />
              </Link>
            </div>
          </Grid>

          <Grid item md={7}>
            <ul
              className={
                open
                  ? `${headerStyle.nav} ${headerStyle.active}`
                  : headerStyle.nav
              }
            >
              <li className={headerStyle.mb_display}>
                <Link className="btn-page" href={"/"}>
                  <img src="/logo.png" alt="" />
                </Link>
              </li>

              <li className="has-dropdown">
                <a href="#">{lang == "en" ? "About" : "हाम्रो बारेमा"}</a>

                <div className={`${headerStyle.submenu} submenu`}>
                  <div className={headerStyle.wrap}>
                    <Link className="btn-page" href={"/focusarea"}>
                      {lang == "en" ? "Focus Areas" : "प्राथमिकताका क्षेत्रहरु"}
                    </Link>
                    <Link className="btn-page" href={"/impacts"}>
                      {lang == "en" ? "Impacts" : "असर/प्रभाव"}
                    </Link>
                    <Link className="btn-page" href={"/team"}>
                      {lang == "en" ? "Team" : "टिम"}
                    </Link>
                  </div>
                </div>
              </li>
              <li className="has-dropdown">
                <a href="#">{lang == "en" ? "CREASION" : "क्रिएसन"}</a>

                <div className={`${headerStyle.submenu} submenu`}>
                  <div className={headerStyle.wrap}>
                    {!loading ? (
                      <>
                        {activityData
                          .filter((item) => item.ledBy === "CREASION")
                          .map((val, index) => {
                            let link = val.title
                              .toLowerCase()
                              .replace(/\s+/g, "-");
                            return (
                              <a
                                className="btn-page"
                                href={`/creasion/${link}`}
                                key={index}
                              >
                                {lang == "en" ? val.title : val.title_np}
                              </a>
                            );
                          })}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </li>
              <li className="has-dropdown">
                <a href="#">
                  {lang == "en"
                    ? "Restless Development"
                    : "रेस्टलेस डेभलपमेन्ट"}
                </a>
                <div className={`${headerStyle.submenu} submenu`}>
                  <div className={headerStyle.wrap}>
                    {!loading ? (
                      <>
                        {activityData
                          .filter(
                            (item) => item.ledBy === "RESTLESS DEVELOPMENT"
                          )
                          .map((val, index) => {
                            let link = val.title
                              .toLowerCase()
                              .replace(/\s+/g, "-");
                            return (
                              <a
                                className="btn-page"
                                href={`/restless-development/${link}`}
                                key={index}
                              >
                                {lang == "en" ? val.title : val.title_np}
                              </a>
                            );
                          })}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </li>
              <li className="has-dropdown">
                <a href="#">
                  {lang == "en" ? "Youth Innovation Lab" : "यूथ इनोभेसन ल्याब"}
                </a>
                <div className={`${headerStyle.submenu} submenu`}>
                  <div className={headerStyle.wrap}>
                    {!loading ? (
                      <>
                        {activityData
                          .filter(
                            (item) => item.ledBy === "YOUTH INNOVATION LAB"
                          )
                          .map((val, index) => {
                            let link = val.title
                              .toLowerCase()
                              .replace(/\s+/g, "-");
                            return (
                              <a
                                className="btn-page"
                                href={`/youth-innovation-lab/${link}`}
                                key={index}
                              >
                                {lang == "en" ? val.title : val.title_np}
                              </a>
                            );
                          })}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </li>

              <li className="has-dropdown">
                <a href="#">
                  {lang == "en" ? "Knowledge Hub" : "ज्ञान केन्द्र"}
                </a>
                <div className={`${headerStyle.submenu} submenu`}>
                  <div className={headerStyle.wrap}>
                    <Link className="btn-page" href={"/blog-and-field-stories"}>
                      {lang == "en" ? "Blogs & Field Stories" : "ब्लग र कथाहरू"}
                    </Link>
                    <Link
                      className="btn-page"
                      href={"/publications-and-reports"}
                    >
                      {lang == "en"
                        ? "Publications & Reports"
                        : "प्रकाशन र रिपोर्टहरू"}
                    </Link>
                    <Link className="btn-page" href={"/news-and-updates"}>
                      {lang == "en" ? "News & Updates" : "समाचार र अपडेटहरू"}
                    </Link>
                    <Link className="btn-page" href={"/media"}>
                      {lang == "en" ? "Media" : "मिडिया"}
                    </Link>
                  </div>
                </div>
              </li>

              <li className={`${headerStyle.mb_display} has-dropdown`}>
                <a href="#" className={headerStyle.btn_highlight}>
                  {lang == "en"
                    ? "Join the Green Movement"
                    : "हरित अभियानमा सहभागि हुनुहोस्"}
                </a>

                <ButtonList />
              </li>
            </ul>
          </Grid>

          <Grid item md={3}>
            <ul
              className={`${headerStyle.nav} ${headerStyle.nav_align_right} has-dropdown`}
            >
              <li style={{ margin: "0" }}>
                <a href="#" className={headerStyle.btn_highlight}>
                  {lang == "en"
                    ? "Join the Green Movement"
                    : "हरित अभियानमा सहभागि हुनुहोस्"}
                </a>

                <ButtonList />
              </li>

              <li style={{ marginLeft: "15px" }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <MaterialUISwitch
                        sx={{ m: 1 }}
                        defaultChecked={lang === "en"}
                        onChange={() =>
                          handleLocaleChange(lang === "en" ? "np" : "en")
                        }
                      />
                    }
                  />
                </FormGroup>
              </li>
            </ul>
          </Grid>
        </Grid>
      </div>

      <div
        className={`${headerStyle.mb_display} ${headerStyle.menuToggle}`}
        onClick={() => setOpen(!open)}
      >
        {open ? <CloseIcon /> : <DragHandleIcon />}
      </div>
    </header>
  );
};

export default Header;
