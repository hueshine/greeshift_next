import { useRef } from "react";

import Head from "next/head";
import Banner from "../../../layout/Banner/Banner";
import axios from "axios";

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
} from "@mui/material";

import { Container, Grid } from "@mui/material";

import provinceData from "./province.json";
import districtData from "./district.json";
import municipalityData from "./municipality.json";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import style from "../style.module.scss";
import Link from "next/link";

const steps = ["Personal Information", "Contact Information", "Pledge to"];

const Pledge = ({ apiData }) => {
  gsap.registerPlugin(ScrollToPlugin);

  const elTop = useRef(null);

  const [btnLoad, setBtnLoad] = useState("Take The Pledge");
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
    pledges: [],
  });

  const plasticWaste = [
    "Carry my own water bottle",
    "Carry my own reusable shopping bags to minimize single-use plastics",
    "Avoid using plastic utensils such as plates, spoons, forks, cups, straws in social gathering",
    "Use digital banners to minimize the use of plastic flex prints in events",
    "Shop from businesses that use plastic alternative packaging",
    "Donate or sell books, notebooks, or any other paper documents",
    "Avoid unncessary printing of any official and personal documents",
    "Avoid printing receipts from ATM machines",
  ];

  const sustainableLifeStyle = [
    "Use Bi-cycle for short distance commuting",
    "Consume locally sourced food",
    "Use thrifted products and refurbished gadgets",
    "Turn off any electrical devices when not in use",
    "Promote green and local businesses for daily use products",
    "Segregate organic and inorganic waste at my home",
    "Convert my household organic waste into compost for garden",
  ];

  const singlePledges = ["Reduce paper waste", "Minimize waste"];

  const handleNext = () => {
    const form = document.getElementById("multi-step-form");

    if (form.reportValidity()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const ctx = gsap.context(() => {
      gsap.to(window, { duration: 0.5, scrollTo: elTop.current });
    });

    return () => ctx.revert();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      pledges: {
        ...formData.pledges,
        [event.target.name]: event.target.checked,
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let provinceTitle = provinceData.results.filter(
      (item) => item.id === formData.province
    );

    let districtTitle = districtData.results.filter(
      (item) => item.id === formData.district
    );

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "image") {
        formDataToSend.append(key, formData[key]);
      }
    });

    formDataToSend.append("pledges", JSON.stringify(formData.pledges));

    formDataToSend.append("province", provinceTitle[0].title);

    formDataToSend.append("district", districtTitle[0].title);

    const form = document.getElementById("multi-step-form");
    if (form.reportValidity()) {
      setBtnLoad("Loading ...");
      axios
        .post(
          "https://app.greenshift.creasion.org/api/submit-pledge-form",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.data.errors) {
            response.data.errors.forEach((error) => {
              console.log(error);
            });
          } else {
            handleNext();
          }
        });
    }
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <>
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
                      required
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
                      required
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
                      <MenuItem value={"Dalit"}>Dalit</MenuItem>
                      <MenuItem value={"Janajati"}>Janajati (Others)</MenuItem>
                      <MenuItem value={"Madhesi"}>Madhesi</MenuItem>
                      <MenuItem value={"Muslim"}>Muslim</MenuItem>
                      <MenuItem value={"Tharu"}>Tharu</MenuItem>
                      <MenuItem value={"Brahmin/Chhetri"}>
                        Brahmin/Chhetri
                      </MenuItem>

                      <MenuItem value={"Others"}>Others</MenuItem>
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
                      required
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
                      required
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
                      required
                    >
                      {municipalityData.results
                        .filter((val) => val.district == formData.district)
                        .map((val, index) => (
                          <MenuItem key={index} value={val.title}>
                            {val.title}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>
                </Grid>
              </Grid>
            </div>
          </>
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
                    required
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
                    required
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
                  {plasticWaste.map((pledge, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            name={pledge}
                            checked={formData.pledges[`pledge${index + 1}`]}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={pledge}
                      />
                    );
                  })}
                </div>
              </Grid>

              <Grid className={style.form_grid} item md={12}>
                <p>Practice Sustainable Lifestyle </p>
                <div
                  className={`${style.pledge_form} ${style.pledge_form_multiple}`}
                >
                  {sustainableLifeStyle.map((pledge, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            name={pledge}
                            checked={formData.pledges[`pledge${index + 1}`]}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={pledge}
                      />
                    );
                  })}
                </div>
              </Grid>

              {singlePledges.map((pledge, index) => {
                return (
                  <Grid item md={6} key={index} className={style.form_grid}>
                    <div className={style.pledge_form}>
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            name={pledge}
                            checked={formData.pledges[`pledge${index + 1}`]}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={pledge}
                      />
                    </div>
                  </Grid>
                );
              })}
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

      <Banner title={apiData.banner_text} />

      <div className={style.pledge_box} id="pledgeBox" ref={elTop}>
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
                    <div className={style.title_flex}>
                      <div className={style.text}>
                        <h2>
                          You are now a part of the
                          <em> Green Movement!</em>
                        </h2>
                      </div>

                      <div className={style.counter}>
                        <h1>
                          {apiData.count}
                          <small>+</small>
                        </h1>
                        <span> People pledges to the cause</span>
                      </div>
                    </div>
                    <div
                      className={style.news_wrap_text_description}
                      dangerouslySetInnerHTML={{ __html: apiData.description }}
                    />
                  </div>

                  <a
                    href="https://greenshift.creasion.org/join-the-green-movement/pledge"
                    className={style.pledge_btn}
                  >
                    PLEDGE AGAIN
                  </a>
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

                      <Button
                        className={style.pledge_btn}
                        onClick={
                          activeStep === steps.length - 1
                            ? handleSubmit
                            : handleNext
                        }
                      >
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

export const getStaticProps = async ({}) => {
  // Fetch additional data from the API
  const response = await fetch(
    "https://app.greenshift.creasion.org/api/pledge-page"
  );
  const apiData = await response.json();

  return {
    props: {
      apiData,
    },
    revalidate: 30,
  };
};
export default Pledge;
