import Link from "next/link";
import EastIcon from "@mui/icons-material/East";
import style from "@/styles/component.module.scss";

const Button = ({ text, link }) => {
  return (
    <Link href={link ? link : "#"} className={style.button}>
      <div className={style.icon}>
        <EastIcon />
        <EastIcon />
      </div>
      <span>{text}</span>
    </Link>
  );
};

export default Button;
