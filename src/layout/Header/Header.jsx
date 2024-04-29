import { useState } from "react";

import { Grid } from "@mui/material";
import headerStyle from "./header.module.scss";
import Link from "next/link";

import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";

import { useIsomorphicLayoutEffect } from "@/hook";

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
                    <Link className="btn-page" href={"/"}>
                      Private Waste Enterprises
                    </Link>
                    <Link className="btn-page" href={"/"}>
                      Empowering Waste Workers through CSOs{" "}
                    </Link>
                    <Link className="btn-page" href={"/"}>
                      Provincial SWM Guideline
                    </Link>
                    <Link className="btn-page" href={"/"}>
                      Sustainable Packaging Program{" "}
                    </Link>
                    <Link className="btn-page" href={"/"}>
                      Green Business Accelerator Program{" "}
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <a href="#">Restless Development</a>
                <div className={headerStyle.submenu}>
                  <div className={headerStyle.wrap}>
                    <Link className="btn-page" href={"/"}>
                      Climate Smart Schools
                    </Link>
                    <Link className="btn-page" href={"/"}>
                      Youth Advocacy{" "}
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <a href="#">Youth Innovation Lab</a>
                <div className={headerStyle.submenu}>
                  <div className={headerStyle.wrap}>
                    <Link className="btn-page" href={"/"}>
                      Waste Smart Fellowship
                    </Link>
                    {/* <Link className="btn-page" href={"/"}>Tag me app</Link> */}
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
                    <Link className="btn-page" href={"/"}>
                      What is the Green Movement?{" "}
                    </Link>
                    <Link
                      className="btn-page"
                      href={"/join-the-green-movement/pledge"}
                    >
                      (Realistic) Pledge{" "}
                    </Link>
                    <Link className="btn-page" href={"/"}>
                      GreenShift Campaign{" "}
                    </Link>
                    <Link className="btn-page" href={"/"}>
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
                    <Link href={"/"}>What is the Green Movement? </Link>
                    <Link href={"/join-the-green-movement/pledge"}>
                      (Realistic) Pledge{" "}
                    </Link>
                    <Link href={"/"}>GreenShift Campaign </Link>
                    <Link href={"/"}>Pitch Your Ideas </Link>
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
