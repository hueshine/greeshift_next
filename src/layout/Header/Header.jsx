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
            What is the GreenShift Campaign?
          </Link>
          <Link className="btn-page" href={"/greenshift-campaigns/campaigns"}>
            Campaigns
          </Link>
          <Link href={"/join-the-green-movement/pledge"}>
            (Realistic) Pledge{" "}
          </Link>
          <Link href={"/join-the-green-movement/pitch-your-ideas"}>
            Pitch Your Ideas{" "}
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
                <a href="#">About</a>

                <div className={`${headerStyle.submenu} submenu`}>
                  <div className={headerStyle.wrap}>
                    <Link className="btn-page" href={"/focusarea"}>
                      Focus Areas
                    </Link>
                    <Link className="btn-page" href={"/impacts"}>
                      Impacts
                    </Link>
                    <Link className="btn-page" href={"/team"}>
                      Team
                    </Link>
                  </div>
                </div>
              </li>
              <li className="has-dropdown">
                <a href="#">CREASION</a>

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
                                {val.title}
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
                <a href="#">Restless Development</a>
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
                                {val.title}
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
                <a href="#">Youth Innovation Lab</a>
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
                                {val.title}
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
                <a href="#">Knowledge Hub</a>
                <div className={`${headerStyle.submenu} submenu`}>
                  <div className={headerStyle.wrap}>
                    <Link className="btn-page" href={"/blog-and-field-stories"}>
                      Blogs & Field Stories{" "}
                    </Link>
                    <Link
                      className="btn-page"
                      href={"/publications-and-reports"}
                    >
                      Publications & Reports{" "}
                    </Link>
                    <Link className="btn-page" href={"/news-and-updates"}>
                      News & Updates{" "}
                    </Link>
                    <Link className="btn-page" href={"/media"}>
                      Media
                    </Link>
                  </div>
                </div>
              </li>

              <li className={`${headerStyle.mb_display} has-dropdown`}>
                <a href="#" className={headerStyle.btn_highlight}>
                  Join the Green Movement
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
                  Join the Green Movement
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

                {/* <button
                  className={lang == "en" ? headerStyle.active : ""}
                  onClick={() => handleLocaleChange("en")}
                >
                  EN
                </button> */}

                {/* <button
                  className={lang == "np" ? headerStyle.active : ""}
                  onClick={() => handleLocaleChange("np")}
                >
                  NP
                </button> */}
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
