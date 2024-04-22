import React from "react";
import { Container, Grid } from "@mui/material";
import headerStyle from "./header.module.scss";

const Header = () => {
  return (
    <header className={headerStyle.header}>
      <div className={headerStyle.container}>
        <Grid container alignItems="center">
          <Grid item md={2}>
            <div className={headerStyle.logo}>
              <a href="">
                <img src="./logo.png" alt="" />
              </a>
            </div>
          </Grid>

          <Grid item md={7}>
            <ul className={headerStyle.nav}>
              <li>
                <a href="">About</a>
              </li>
              <li>
                <a href="">CREASION</a>
              </li>
              <li>
                <a href="">Restless Development</a>
              </li>
              <li>
                <a href="">Youth Innovation Lab</a>
              </li>

              <li>
                <a href="">Knowledge Hub</a>
              </li>
            </ul>
          </Grid>

          <Grid item md={3}>
            <ul className={`${headerStyle.nav} ${headerStyle.nav_align_right}`}>
              <li>
                <a href="" className={headerStyle.btn_highlight}>
                  Join the Green Movement
                </a>
              </li>
            </ul>
          </Grid>
        </Grid>
      </div>
    </header>
  );
};

export default Header;
