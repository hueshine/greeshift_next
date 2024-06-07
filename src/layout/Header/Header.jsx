import { useState } from "react";

import { Grid } from "@mui/material";
import headerStyle from "./header.module.scss";
import Link from "next/link";

import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";

import { useIsomorphicLayoutEffect } from "@/hook";

const Header = () => {
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

                <div className={`${headerStyle.submenu} submenu`}>
                  <div className={headerStyle.wrap}>
                    <Link className="btn-page" href={"/greenshift-campaigns"}>
                      What is the GreenShift Campaign?
                    </Link>

                    <Link
                      className="btn-page"
                      href={"/greenshift-campaigns/campaigns"}
                    >
                      Campaigns
                    </Link>

                    <Link
                      className="btn-page"
                      href={"/join-the-green-movement/pledge"}
                    >
                      (Realistic) Pledge{" "}
                    </Link>

                    <Link
                      className="btn-page"
                      href={"/join-the-green-movement/pitch-your-ideas"}
                    >
                      Pitch Your Ideas{" "}
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </Grid>

          <Grid item md={3}>
            <ul
              className={`${headerStyle.nav} ${headerStyle.nav_align_right} has-dropdown`}
            >
              <li>
                <a href="#" className={headerStyle.btn_highlight}>
                  Join the Green Movement
                </a>

                <div className={`${headerStyle.submenu} submenu`}>
                  <div className={headerStyle.wrap}>
                    <Link href={"/greenshift-campaigns"}>
                      What is the GreenShift Campaign?
                    </Link>
                    <Link
                      className="btn-page"
                      href={"/greenshift-campaigns/campaigns"}
                    >
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
