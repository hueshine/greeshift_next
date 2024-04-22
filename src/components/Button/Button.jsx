import Link from "next/link";
import EastIcon from "@mui/icons-material/East";
import style from "@/styles/component.module.scss";

const Button = () => {
  return (
    <Link href={"/"} className={style.button}>
      <div className={style.icon}>
        <EastIcon />
      </div>
      <span>Read More</span>
    </Link>
  );
};

export default Button;
