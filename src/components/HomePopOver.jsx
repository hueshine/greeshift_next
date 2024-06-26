import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { useRouter } from "next/router";

import styles from "@/styles/component.module.scss";
import CloseIcon from "@mui/icons-material/Close";

const HomePopOver = ({ data }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    height: "90vh",
    border: 0,
  };

  const router = useRouter();
  let lang = router.locale;

  const [openStates, setOpenStates] = useState(data.map(() => true));
  const [timeouts, setTimeouts] = useState([]);

  useEffect(() => {
    const newTimeouts = data.map((_, index) =>
      setTimeout(() => {
        setOpenStates((prev) => {
          const newOpenStates = [...prev];
          newOpenStates[index] = false;
          return newOpenStates;
        });
      }, 8500)
    );

    setTimeouts(newTimeouts);

    return () => {
      newTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [data]);

  const handleClose = (index) => {
    setOpenStates((prev) => {
      const newOpenStates = [...prev];
      newOpenStates[index] = false;
      return newOpenStates;
    });
  };

  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  return (
    <div>
      {data.map((val, index) => {
        return (
          <Modal
            key={index}
            open={openStates[index]}
            onClose={() => handleClose(index)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={styles.pop_modal}
          >
            <Box className={styles.box} sx={style}>
              <div className={styles.close} onClick={() => handleClose(index)}>
                <CloseIcon />{" "}
              </div>
              <a href={val.link} target="_blank">
                <h4>{lang == "en" ? val.title : val.title_np}</h4>
                <img src={`${imageUrl}/${val.image}`} alt="" />
              </a>
            </Box>
          </Modal>
        );
      })}
    </div>
  );
};

export default HomePopOver;
