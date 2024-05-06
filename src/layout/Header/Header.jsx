import { useState } from "react";

import { Grid } from "@mui/material";
import headerStyle from "./header.module.scss";
import Link from "next/link";

import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";

import { useIsomorphicLayoutEffect } from "@/hook";

import data from "@/pages/api/activityData.json";

const Header = () => {
  const [open, setOpen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    let btns = document.querySelectorAll(".btn-page");

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        setOpen(false);
      });
    });
  }, [open]);

  return (
    <header className={headerStyle.header}>
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
              <li>
                <a href="#">About</a>

                <div className={headerStyle.submenu}>
                  <div className={headerStyle.wrap}>
                    <Link className="btn-page" href={"/focus-area"}>
                      Focus Area
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
              <li>
                <a href="#">CREASION</a>

                <div className={headerStyle.submenu}>
                  <div className={headerStyle.wrap}>
                    {data.creasion.map((val, index) => {
                      let link = val.title.toLowerCase().replace(/\s+/g, "-");

                      return (
                        <Link
                          className="btn-page"
                          href={`/creasion/${link}`}
                          key={index}
                        >
                          {val.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </li>
              <li>
                <a href="#">Restless Development</a>
                <div className={headerStyle.submenu}>
                  <div className={headerStyle.wrap}>
                    {data.restlessDevelopment.map((val, index) => {
                      let link = val.title.toLowerCase().replace(/\s+/g, "-");

                      return (
                        <Link
                          className="btn-page"
                          href={`/restless-development/${link}`}
                          key={index}
                        >
                          {val.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </li>
              <li>
                <a href="#">Youth Innovation Lab</a>
                <div className={headerStyle.submenu}>
                  <div className={headerStyle.wrap}>
                    {data.yiLab.map((val, index) => {
                      let link = val.title.toLowerCase().replace(/\s+/g, "-");

                      return (
                        <Link
                          className="btn-page"
                          href={`/youth-innovation-lab/${link}`}
                          key={index}
                        >
                          {val.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </li>

              <li>
                <a href="#">Knowledge Hub</a>
                <div className={headerStyle.submenu}>
                  <div className={headerStyle.wrap}>
                    <Link className="btn-page" href={"/"}>
                      Blogs & Field Stories{" "}
                    </Link>
                    <Link className="btn-page" href={"/"}>
                      Publications & Reports{" "}
                    </Link>
                    <Link className="btn-page" href={"/news-and-updates"}>
                      News & Updates{" "}
                    </Link>
                  </div>
                </div>
              </li>

              <li className={headerStyle.mb_display}>
                <a href="#" className={headerStyle.btn_highlight}>
                  Join the Green Movement
                </a>

                <div className={headerStyle.submenu}>
                  <div className={headerStyle.wrap}>
                    <Link href={"/greenshift-campaigns"}>
                      What is the GreenShift Campaign?
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
            <ul className={`${headerStyle.nav} ${headerStyle.nav_align_right}`}>
              <li>
                <a href="#" className={headerStyle.btn_highlight}>
                  Join the Green Movement
                </a>

                <div className={headerStyle.submenu}>
                  <div className={headerStyle.wrap}>
                    <Link href={"/greenshift-campaigns"}>
                      What is the GreenShift Campaign?
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
