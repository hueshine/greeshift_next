import Head from "next/head";
import Banner from "../../../layout/Banner/Banner";

import { useState } from "react";

import {
  Box,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Checkbox,
  TextareaAutosize,
} from "@mui/material";

import { useIsomorphicLayoutEffect } from "@/hook";

import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import gsap from "gsap";

import { Container, Grid } from "@mui/material";

import provinceData from "./province.json";
import districtData from "./district.json";
import municipalityData from "./municipality.json";

import style from "../style.module.scss";

const steps = ["Personal Information", "Contact Information", "Pledge to"];

const Pledge = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    ethnicity: "",
    gender: "",
    province: "",
    district: "",
    municipality: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleNext = () => {
    const form = document.getElementById("multi-step-form");
    const box = document.getElementById("pledgeBox");

    // gsap.to(box, {
    //   duration: 0.5,
    //   scrollTo: { y: "#pledgeBox", offsetY: 50 },
    // });

    if (form.reportValidity()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("multi-step-form");
    if (form.reportValidity()) {
      // Handle form submission
      console.log(formData);
    }
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <div className={style.form_container}>
            <div className={style.form_container_title}>
              <h3>
                Our <span>Action</span>, Our <span>Responsibility</span>,
                <br /> Let’s take a realistic pledge.
              </h3>
              <p>Ready to take the responsibility?</p>
            </div>

            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid className={style.form_grid} item md={6}>
                <div className={style.form_box}>
                  <InputLabel htmlFor="name">Full Name</InputLabel>

                  <TextField
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </Grid>

              <Grid className={style.form_grid} item md={6}>
                <div className={style.form_box}>
                  <InputLabel htmlFor="gender">Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"others"}>Others</MenuItem>
                  </Select>
                </div>
              </Grid>

              <Grid className={style.form_grid} item md={6}>
                <div className={style.form_box}>
                  <InputLabel htmlFor="ethnicity">Ethnicity</InputLabel>

                  <Select
                    name="ethnicity"
                    value={formData.ethnicity}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value={"dalit"}>Dalit</MenuItem>
                    <MenuItem value={"janajati"}>Janajati (Others)</MenuItem>
                    <MenuItem value={"madhesi"}>Madhesi</MenuItem>
                    <MenuItem value={"muslim"}>Muslim</MenuItem>
                    <MenuItem value={"tharu"}>Tharu</MenuItem>
                    <MenuItem value={"none"}>None of the above</MenuItem>
                  </Select>
                </div>
              </Grid>

              <Grid className={style.form_grid} item md={6}>
                <div className={style.form_box}>
                  <InputLabel htmlFor="province">Province</InputLabel>

                  <Select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    fullWidth
                  >
                    {provinceData.results.map((val, index) => {
                      return (
                        <MenuItem key={index} value={val.id}>
                          {val.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
              </Grid>

              <Grid className={style.form_grid} item md={6}>
                <div className={style.form_box}>
                  <InputLabel htmlFor="district">District</InputLabel>

                  <Select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    fullWidth
                  >
                    {districtData.results
                      .filter((val) => val.province == formData.province)
                      .map((val, index) => (
                        <MenuItem key={index} value={val.id}>
                          {val.title}
                        </MenuItem>
                      ))}
                  </Select>
                </div>
              </Grid>

              <Grid className={style.form_grid} item md={6}>
                <div className={style.form_box}>
                  <InputLabel htmlFor="municipality">Municipality</InputLabel>

                  <Select
                    name="municipality"
                    value={formData.municipality}
                    onChange={handleChange}
                    fullWidth
                  >
                    {municipalityData.results
                      .filter((val) => val.district == formData.district)
                      .map((val, index) => (
                        <MenuItem key={index} value={val.code}>
                          {val.title}
                        </MenuItem>
                      ))}
                  </Select>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      case 1:
        return (
          <div className={style.form_container}>
            <div className={style.form_container_title}>
              <h4>Contact Information</h4>
              <p>How can we contact you</p>
            </div>

            <Grid container rowSpacing={2} columnSpacing={4}>
              <Grid className={style.form_grid} item md={6}>
                <div className={style.form_box}>
                  <InputLabel htmlFor="email">Email</InputLabel>

                  <TextField
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </Grid>

              <Grid className={style.form_grid} item md={6}>
                <div className={style.form_box}>
                  <InputLabel htmlFor="phone">Contact Number</InputLabel>
                  <TextField
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        );
      case 2:
        return (
          <div className={style.form_container}>
            <div className={style.form_container_title}>
              <h4>I pledge to:</h4>
            </div>

            <Grid container rowSpacing={2} columnSpacing={4}>
              <Grid className={style.form_grid} item md={12}>
                <p>Reduce Plastic Waste</p>
                <div
                  className={`${style.pledge_form} ${style.pledge_form_multiple}`}
                >
                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Carry my own water bottle"
                  />

                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Carry my own reusable shopping bags to minimize single-use plastics "
                  />

                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Avoid using plastic utensils such as plates, spoons, forks, cups, straws in social gathering"
                  />

                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Use digital banners to minimize the use of plastic flex prints in events "
                  />
                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Shop from businesses that use plastic alternative packaging "
                  />

                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Donate or sell books, notebooks, or any other paper documents "
                  />
                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Avoid unncessary printing of any official and personal documents "
                  />

                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Avoid printing receipts from ATM machines "
                  />
                </div>
              </Grid>

              <Grid className={style.form_grid} item md={12}>
                <p>Practice Sustainable Lifestyle </p>
                <div
                  className={`${style.pledge_form} ${style.pledge_form_multiple}`}
                >
                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Use Bi-cycle for short distance commuting"
                  />

                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Consume locally sourced food"
                  />

                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Use thrifted products and refurbished gadgets"
                  />

                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Turn off any electrical devices when not in use"
                  />
                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Promote green and local businesses for daily use products"
                  />

                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Segregate organic and inorganic waste at my home"
                  />
                  <FormControlLabel
                    control={<Checkbox name="pledge1" />}
                    label="Convert my household organic waste into compost for garden"
                  />
                </div>
              </Grid>

              <Grid className={style.form_grid} item md={6}>
                <div className={style.pledge_form}>
                  <FormControlLabel
                    control={<Checkbox name="pledge5" />}
                    label="Reduce paper waste"
                  />
                </div>
              </Grid>

              <Grid className={style.form_grid} item md={6}>
                <div className={style.pledge_form}>
                  <FormControlLabel
                    control={<Checkbox name="pledge6" />}
                    label="Minimize waste"
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        );

      default:
        return "Unknown stepIndex";
    }
  };

  return (
    <>
      <Head>
        <title>Pledge | Green Shift Nepal</title>
        <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>

      <Banner title={"Pledge"} />

      <div className={style.pledge_box} id="pledgeBox">
        <Container maxWidth={"lg"}>
          <Grid container spacing={10}>
            <Grid item md={3.5}>
              <Stepper
                className={style.pledge_box_nav_wrap}
                activeStep={activeStep}
                sx={{
                  ".MuiStepConnector-root": {
                    top: 0,
                  },
                  ".MuiStepConnector-root span": {
                    borderColor: "transparent",
                  },
                  ".MuiStepConnector-root span::before": {
                    display: "flex",
                    justifyContent: "center",
                    content: '""',
                  },
                  ".MuiSvgIcon-root": {
                    borderRadius: "50%",
                    border: "1px solid #33b2b6",
                  },
                  ".MuiSvgIcon-root:not(.Mui-completed)": {
                    color: "white",
                  },
                  ".MuiStepIcon-root.Mui-completed": {
                    color: "#fff",
                    background: "#33b2b6",
                  },
                  ".MuiStepIcon-root.Mui-completed path": {
                    transform: "scale(0.6) translate(8px, 8px)",
                  },
                  ".MuiStepIcon-text": {
                    fill: "#33b2b6",
                    fontWeight: 500,
                    fontSize: "9px",
                  },
                  ".MuiSvgIcon-root.Mui-active": {
                    color: "#33b2b6",
                    padding: "3px",
                    fontSize: "16px",
                    borderRadius: "50%",
                    border: "1px solid #33b2b6",
                    marginY: "-3px",
                  },
                  ".Mui-active .MuiStepIcon-text": {
                    fill: "white",
                    fontSize: "11px",
                  },
                }}
              >
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};

                  return (
                    <Step key={index} {...stepProps}>
                      <div className={style.pledge_box_nav}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </div>
                    </Step>
                  );
                })}
              </Stepper>
            </Grid>

            <Grid item md={8.5}>
              {activeStep === steps.length ? (
                <Container maxWidth={"md"}>
                  <div className={style.thanks_container}>
                    <h2>
                      <span>Congratulations!</span>
                    </h2>
                    <h4>
                      You are now a part of the <span>Green Movement!</span>
                    </h4>
                    <p>
                      To take your pledge into action, here are a few ways you
                      can become a Green Warrior!
                    </p>

                    <div className={style.pledge_into_action}>
                      <div className={style.icon}>
                        <img src="/video.svg" alt="" />
                      </div>
                      <div className={style.text}>
                        <h5>Submit your 60 Second Video! </h5>
                        <ul>
                          <li>
                            <p>
                              To become a Green Warrior, take a 60 second video
                              of you and your friends, family or community,
                              doing a clean-up activity to collect solid wastes
                              in your neighbourhood
                            </p>
                          </li>
                          <li>
                            <p>
                              Make sure to get the attendance of all those who
                              are part of the clean-up activity. Find the
                              attendance sheet attached [Link]{" "}
                            </p>
                          </li>
                          <li>
                            <p>
                              Make sure to fill in all the details along with
                              the time in the attendance sheet.{" "}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className={style.pledge_into_action}>
                      <div className={style.icon}>
                        <img src="/scale.svg" alt="" />
                      </div>
                      <div className={style.text}>
                        <h5>Weigh Your Waste! </h5>
                        <ul>
                          <li>
                            <p>
                              After the clean-up, weigh your collected waste and
                              click a picture of it{" "}
                            </p>
                          </li>
                          <li>
                            <p>
                              Handover your collected waste to your nearest
                              waste collectors/pickers{" "}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className={style.pledge_into_action}>
                      <div className={style.icon}>
                        <img src="/gift_box.svg" alt="" />
                      </div>
                      <div className={style.text}>
                        <h5>Get your Prize! </h5>
                        <ul>
                          <li>
                            <p>
                              The prizes are determined according to the hours
                              of volunteering and the wastes collected{" "}
                            </p>
                          </li>
                          <li>
                            <p>
                              [x] hours of volunteering = GreenShift stickers,
                              T-shirt{" "}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Container>
              ) : (
                <>
                  <form id="multi-step-form" onSubmit={handleSubmit}>
                    {getStepContent(activeStep)}
                    <Box
                      className={style.footer}
                      sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                    >
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />

                      <Button className={style.pledge_btn} onClick={handleNext}>
                        {activeStep === steps.length - 1
                          ? "Take the pledge"
                          : "Next"}
                      </Button>
                    </Box>
                  </form>
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Pledge;
