import React from "react";
import { Container, Grid } from "@mui/material";
import headerStyle from "@/styles/header.module.scss";

const Header = () => {
  return (
    <header className={headerStyle.header}>
      <Container maxWidth="xl">
        <Grid container alignItems="center">
          <Grid item md={3}>
            <div className={headerStyle.logo}>
              <img src="./logo-reverse.png" alt="" />
            </div>
          </Grid>

          <Grid item md={9}>
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
