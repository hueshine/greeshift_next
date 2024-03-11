import React from "react";
import { Container, Grid } from "@mui/material";
import headerStyle from "@/styles/header.module.scss";

const Header = () => {
  return (
    <header className={headerStyle.header}>
      <Container maxWidth="xl">
        <Grid container alignItems="center">
          <Grid item md={5}>
            <div className={headerStyle.logo}>
              <a href="" className={headerStyle.creasion}>
                <img src="./creasion 1.png" alt="" />
              </a>
              <a href="">
                <img src="./logo-reverse.png" alt="" />
              </a>
            </div>
          </Grid>

          <Grid item md={7}>
            <ul className={headerStyle.nav}>
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">About</a>
              </li>
              <li>
                <a href="">News & Updates</a>
              </li>
              <li>
                <a href="">Knowledge Hub</a>
              </li>
              <li>
                <a href="">Join the green movement</a>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </header>
  );
};

export default Header;
