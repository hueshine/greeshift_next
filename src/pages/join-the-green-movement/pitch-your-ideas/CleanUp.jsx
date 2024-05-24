import { useState } from "react";

import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

import { Grid } from "@mui/material";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import SendIcon from "@mui/icons-material/Send";

import provinceData from "../pledge/province.json";
import districtData from "../pledge/district.json";
import municipalityData from "../pledge/municipality.json";

import style from "../style.module.scss";

const PledgeIntoAction = () => {
  const [pitchUpload, setPitchUpload] = useState("Click to Upload a Picture");
  const [pitchUploadVideo, setPitchUploadVideo] = useState(
    "Click to Upload a Video"
  );
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

    if (selectedImage) {
      setPitchUpload(selectedImage.name);
    } else {
      setPitchUpload("Click to Upload");
    }
  };

  const handleVideoChange = (event) => {
    const selectedImage = event.target.files[0];
    setFormData({
      ...formData,
      image: selectedImage,
    });

    if (selectedImage) {
      setPitchUploadVideo(selectedImage.name);
    } else {
      setPitchUploadVideo("Click to Upload a Video");
    }
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
              Total number of volunteers:{" "}
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
              Amount of waste collected:{" "}
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

        <Grid className={style.form_grid} item md={4}>
          <div className={style.form_box}>
            <InputLabel htmlFor="wasteCollected">Verification</InputLabel>

            <Button
              className={style.upload_image}
              component="label"
              variant="contained"
            >
              <FileUploadIcon /> {pitchUpload}
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

        <Grid className={style.form_grid} item md={4}>
          <div className={style.form_box}>
            <InputLabel htmlFor="wasteCollected">
              Upload your 60 sec video
            </InputLabel>

            <Button
              className={style.upload_image}
              component="label"
              variant="contained"
            >
              <FileUploadIcon /> {pitchUploadVideo}
              <input
                type="file"
                accept="image/*"
                onChange={handleVideoChange}
                style={{ display: "none" }}
              />
            </Button>

            <input
              type="file"
              accept="image/*"
              onChange={handleVideoChange}
              hidden
            />
          </div>
        </Grid>

        {/* <Grid className={style.form_grid} item md={6}>
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
                  </Grid> */}

        <Grid className={style.form_grid_terms} item md={12}>
          <p>*Terms & Conditions </p>
          <ul>
            <li>
              CREASION reserves the right to correspond with selected
              participants for video amendments{" "}
            </li>
            <li>
              By entering the GreenShift campaign, the participant grants
              CREASION all rights to their work and confirm that it is their
              work, and not that of someone else, or copied.
            </li>
            <li>
              CREASION reserves the right to make amendments to any submitted
              videos as deemed necessary.
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
    </>
  );
};

export default PledgeIntoAction;
