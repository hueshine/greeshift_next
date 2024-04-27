import { Container, Grid } from "@mui/material";
import headerStyle from "./header.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <header className={headerStyle.header}>
      <div className={headerStyle.container}>
        <Grid container alignItems="center">
          <Grid item md={2}>
            <div className={headerStyle.logo}>
              <Link href={"/"}>
                <img src="/logo.png" alt="" />
              </Link>
            </div>
          </Grid>

          <Grid item md={7}>
            <ul className={headerStyle.nav}>
              <li>
                <a href="#">About</a>

                <div className={headerStyle.submenu}>
                  <div className={headerStyle.wrap}>
                    <Link href={"/focus-area"}>Focus Area</Link>
                    <Link href={"/"}>Impacts</Link>
                    <Link href={"/"}>Team</Link>
                  </div>
                </div>
              </li>
              <li>
                <a href="#">CREASION</a>

                <div className={headerStyle.submenu}>
                  <div className={headerStyle.wrap}>
                    <Link href={"/"}>
                      Strengthening of existing private waste enterprises
                    </Link>
                    <Link href={"/"}>Empowering WWs through CSOs </Link>
                    <Link href={"/"}>
                      Provincial SWM policy guideline preparation and handover{" "}
                    </Link>
                    <Link href={"/"}>Sustainable packaging program </Link>
                    <Link href={"/"}>Green business accelerator program </Link>
                  </div>
                </div>
              </li>
              <li>
                <a href="#">Restless Development</a>
                <div className={headerStyle.submenu}>
                  <div className={headerStyle.wrap}>
                    <Link href={"/"}>
                      Establishment of Climate Smart Schools at 36 schools
                    </Link>
                    <Link href={"/"}>Youth Advocacy </Link>
                  </div>
                </div>
              </li>
              <li>
                <a href="#">Youth Innovation Lab</a>
                <div className={headerStyle.submenu}>
                  <div className={headerStyle.wrap}>
                    <Link href={"/"}>Waste Smart Fellowship</Link>
                    {/* <Link href={"/"}>Tag me app</Link> */}
                  </div>
                </div>
              </li>

              <li>
                <a href="#">Knowledge Hub</a>
                <div className={headerStyle.submenu}>
                  <div className={headerStyle.wrap}>
                    <Link href={"/"}>Blogs & Field Stories </Link>
                    <Link href={"/"}>Publications & Reports </Link>
                    <Link href={"/news-and-updates"}>News & Updates </Link>
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
                    <Link href={"/"}>(Realistic) Pledge </Link>
                    <Link href={"/"}>GreenShift Campaign </Link>
                    <Link href={"/"}>Pitch Your Ideas </Link>
                  </div>
                </div>
              </li>
            </ul>
          </Grid>
        </Grid>
      </div>
    </header>
  );
};

export default Header;
