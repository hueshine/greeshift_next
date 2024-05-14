import { useState } from "react";

import Head from "next/head";
import Banner from "../../../layout/Banner/Banner";

import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

import { Container, Grid } from "@mui/material";

import PhotoIcon from "@mui/icons-material/Photo";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SendIcon from "@mui/icons-material/Send";

import provinceData from "../pledge/province.json";
import districtData from "../pledge/district.json";
import municipalityData from "../pledge/municipality.json";

import style from "../style.module.scss";

const Ideas = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    province: "",
    district: "",
    municipality: "",
    email: "",
    numOfVolunteers: "",
    wasteCollected: "",
    image: "",
    video: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setFormData({
      ...formData,
      image: selectedImage,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("multi-step-form");
    if (form.reportValidity()) {
      // Handle form submission
      console.log(formData);
    }
  };

  return (
    <>
      <Head>
        <title>Pitch your Ideas | Green Shift Nepal</title>
        <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>

      <Banner title={"Pitch Your Ideas"} />

      <Container maxWidth={"lg"}>
        {/* <div className={style.pledge_into_action}>
          <div className={style.icon}>
            <img src="/video.svg" alt="" />
          </div>
          <div className={style.text}>
            <h5>Submit your 60 Second Video! </h5>
            <ul>
              <li>
                <p>
                  To become a Green Warrior, take a 60 second video of you and
                  your friends, family or community, doing a clean-up activity
                  to collect solid wastes in your neighbourhood
                </p>
              </li>
              <li>
                <p>
                  Make sure to get the attendance of all those who are part of
                  the clean-up activity. Find the attendance sheet attached
                  [Link]{" "}
                </p>
              </li>
              <li>
                <p>
                  Make sure to fill in all the details along with the time in
                  the attendance sheet.{" "}
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
                  After the clean-up, weigh your collected waste and click a
                  picture of it{" "}
                </p>
              </li>
              <li>
                <p>
                  Handover your collected waste to your nearest waste
                  collectors/pickers{" "}
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
                  The prizes are determined according to the hours of
                  volunteering and the wastes collected{" "}
                </p>
              </li>
              <li>
                <p>[x] hours of volunteering = GreenShift stickers, T-shirt </p>
              </li>
            </ul>
          </div>
        </div> */}
      </Container>

      <section className={style.pitch_form}>
        <Container maxWidth={"lg"}>
          <div className={style.form_container}>
            <div className={style.form_container_title}>
              {/* <h3>
              Our <span>Action</span>, Our <span>Responsibility</span>,
              <br /> Let’s take a realistic pledge.
            </h3>
            <p>Ready to take the responsibility?</p> */}
            </div>

            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid className={style.form_grid} item md={4}>
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

              <Grid className={style.form_grid} item md={4}>
                <div className={style.form_box}>
                  <InputLabel htmlFor="age">Age</InputLabel>

                  <TextField
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </Grid>

              <Grid className={style.form_grid} item md={4}>
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

              <Grid className={style.form_grid} item md={4}>
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

              <Grid className={style.form_grid} item md={4}>
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

              <Grid className={style.form_grid} item md={4}>
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

              <Grid className={style.form_grid} item md={4}>
                <div className={style.form_box}>
                  <InputLabel htmlFor="numOfVolunteers">
                    Total number of volunteers
                  </InputLabel>
                  <TextField
                    name="numOfVolunteers"
                    value={formData.numOfVolunteers}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </Grid>

              <Grid className={style.form_grid} item md={4}>
                <div className={style.form_box}>
                  <InputLabel htmlFor="wasteCollected">
                    Amount of waste collected
                  </InputLabel>
                  <TextField
                    name="wasteCollected"
                    value={formData.wasteCollected}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </Grid>

              <Grid className={style.form_grid} item md={4}></Grid>

              <Grid className={style.form_grid} item md={6}>
                <div className={style.form_box}>
                  <InputLabel htmlFor="wasteCollected">
                    Verification{" "}
                  </InputLabel>

                  <Button
                    className={style.upload_image}
                    component="label"
                    variant="contained"
                    startIcon={<PhotoIcon />}
                  >
                    Upload image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </Button>

                  <small>
                    For verification, upload a picture of the weighing scale
                    with the weight of your collected waste
                  </small>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                </div>
              </Grid>

              <Grid className={style.form_grid} item md={6}>
                <div className={style.form_box}>
                  <InputLabel htmlFor="wasteCollected">
                    Upload your 60 sec video
                  </InputLabel>

                  <Button
                    className={style.upload_image}
                    component="label"
                    variant="contained"
                    startIcon={<OndemandVideoIcon />}
                  >
                    Upload Video
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </Button>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                </div>
              </Grid>

              <Grid className={style.form_grid_terms} item md={8}>
                <p>*Terms & Conditions </p>
                <ul>
                  <li>
                    CREASION reserves the right to correspond with selected
                    participants for video amendments{" "}
                  </li>
                  <li>
                    By entering the GreenShift campaign, the participant grants
                    CREASION all rights to their work and confirm that it is
                    their work, and not that of someone else, or copied.
                  </li>
                  <li>
                    CREASION reserves the right to make amendments to any
                    submitted videos as deemed necessary.
                  </li>
                </ul>
              </Grid>

              <Grid className={style.form_grid_terms} item md={8}>
                <FormControlLabel
                  control={<Checkbox name="terms" />}
                  label="I accept the terms and conditions of the GreenShift campaign"
                />
              </Grid>

              <Grid item md={4}></Grid>
              <Grid className={style.form_grid_terms} item md={4}>
                <button className={style.pledge_btn}>
                  Become a Green Warrior <SendIcon />
                </button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Ideas;
