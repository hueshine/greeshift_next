import style from "../../styles/component.module.scss";
import MapConponent from "../../components/MapComponent/MapComponent";
import Head from "next/head";

const Impacts = () => {
  return (
    <>
      <Head>
        <title>Impacts | Green Shift Nepal</title>
        <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <section className={style.impact_banner}></section>
      <MapConponent />
    </>
  );
};

export default Impacts;
