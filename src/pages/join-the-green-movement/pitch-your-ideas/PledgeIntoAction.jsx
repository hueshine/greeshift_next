import { useState, useRef, useEffect } from "react";

import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

import axios from "axios";

import { Alert, Grid, Snackbar } from "@mui/material";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import SendIcon from "@mui/icons-material/Send";

import provinceData from "../pledge/province.json";
import districtData from "../pledge/district.json";
import municipalityData from "../pledge/municipality.json";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import style from "../style.module.scss";

const PledgeIntoAction = () => {
  gsap.registerPlugin(ScrollToPlugin);

  const elTop = useRef(null);
  const [open, setOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ status: "", message: "" });
  const [error, setError] = useState("");
  const [pitchUpload, setPitchUpload] = useState("Click to Upload");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    province: "",
    district: "",
    municipality: "",
    email: "",
    phone: "",
    photoVideo: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const ctx = gsap.context(() => {
        gsap.to("#notification", {
          scrollTrigger: {
            trigger: "#notification",
            start: "top top",
            end: "bottom bottom",
            pin: "#notification",
            markers: true,
          },
        });
      });

      return () => ctx.revert();
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    const maxFileSize = 250 * 1024 * 1024; // 200MB

    if (selectedFile) {
      if (
        selectedFile.type.startsWith("image/") ||
        selectedFile.type.startsWith("video/")
      ) {
        if (selectedFile.size <= maxFileSize) {
          setFormData({
            ...formData,
            photoVideo: selectedFile,
          });
          setPitchUpload(selectedFile.name);
          setError("");
        } else {
          setError("File size exceeds 200MB");
        }
      } else {
        setError("Only image or video files are allowed");
      }
    }
  };

  const handleReset = () => {
    setPitchUpload("Click to Upload");
    setFormData({
      name: "",
      age: "",
      gender: "",
      province: "",
      district: "",
      municipality: "",
      email: "",
      phone: "",
      photoVideo: "",
    });

    const ctx = gsap.context(() => {
      gsap.to(window, { duration: 0.5, scrollTo: elTop.current - 200 });
    });

    return () => ctx.revert();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("multi-step-form");

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "image") {
        formDataToSend.append(key, formData[key]);
      }
    });

    formDataToSend.append("image", formData.photoVideo);

    if (!formData.photoVideo) {
      setError("Please upload a photo or video");
    }

    if (form.reportValidity() && formData.photoVideo) {
      let provinceTitle = provinceData.results.filter(
        (item) => item.id === formData.province
      );

      let districtTitle = districtData.results.filter(
        (item) => item.id === formData.district
      );

      formDataToSend.append("province", provinceTitle[0].title);

      formDataToSend.append("district", districtTitle[0].title);
      setLoading(true);
      axios
        .post(
          "https://app.greenshift.creasion.org/api/submit-pitchYouIdeas-form",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        )
        .then((response) => {
          if (response.data.errors) {
            response.data.errors.forEach((error) => {
              setLoading(false);
              setOpen(true);
              setSubmitStatus({
                status: "error",
                message: "Something went wrong. Try Again",
              });
              handleReset();
            });
          } else {
            setOpen(true);
            setLoading(false);
            setSubmitStatus({
              status: "success",
              message:
                "We have received your idea. Our team will review it and get back to you soon",
            });
            handleReset();
          }
        })
        .catch((error) => {
          setOpen(true);
          setLoading(false);
          setSubmitStatus({
            status: "error",
            message: "Something went wrong. Try Again!",
          });
          handleReset();
          console.error("There was an error!", error);
        });
    }
  };

  return (
    <>
      <div>
        <Snackbar
          id="notification"
          className={style.notificaton}
          open={open}
          autoHideDuration={5000}
          onClose={handleCloseSnack}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnack}
            severity={submitStatus.status}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {submitStatus.message}
          </Alert>
        </Snackbar>
      </div>
      <form id="multi-step-form" onSubmit={handleSubmit}>
        <Grid container rowSpacing={2} columnSpacing={2} ref={elTop}>
          <Grid className={style.form_grid} item md={4}>
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

          <Grid className={style.form_grid} item md={4}>
            <div className={style.form_box}>
              <InputLabel htmlFor="age">Age</InputLabel>

              <TextField
                name="age"
                value={formData.age}
                onChange={handleChange}
                fullWidth
                required
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
                required
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

          <Grid className={style.form_grid} item md={4}>
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

          <Grid className={style.form_grid} item md={4}>
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

          <Grid className={style.form_grid} item md={4}>
            <div className={style.form_box}>
              <InputLabel htmlFor="phone">Phone Number</InputLabel>
              <TextField
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>
          </Grid>

          <Grid className={style.form_grid} item md={4}>
            <div className={style.form_box}>
              <InputLabel htmlFor="email">Email Id</InputLabel>
              <TextField
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>
          </Grid>

          <Grid className={style.form_grid} item md={4}></Grid>

          <Grid className={style.form_grid} item md={4}>
            <div className={style.form_box}>
              <InputLabel htmlFor="wasteCollected">
                Upload your Photo / Video
              </InputLabel>

              <Button
                className={style.upload_image}
                component="label"
                variant="contained"
              >
                <FileUploadIcon /> {pitchUpload}
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleImageChange}
                  name="photoVideo"
                  style={{ display: "none" }}
                />
              </Button>

              {error && <Alert severity="error">{error}</Alert>}
            </div>
          </Grid>

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
              required
            />
          </Grid>

          <Grid item md={4}></Grid>
          <Grid className={style.form_grid_terms} item md={4}>
            {loading ? (
              <div className={style.pledge_btn}>
                Uploading: <span>{uploadProgress}%</span>
                <progress value={uploadProgress} max="100"></progress>
              </div>
            ) : (
              <button className={style.pledge_btn} onClick={() => handleSubmit}>
                Become a Green Warrior <SendIcon />
              </button>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default PledgeIntoAction;
