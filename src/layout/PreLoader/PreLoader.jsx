import style from "./style.module.scss";

import CircularProgress from "@mui/material/CircularProgress";

const PreLoader = () => {
  return (
    <div className={style.preloader}>
      <CircularProgress />
    </div>
  );
};

export default PreLoader;
