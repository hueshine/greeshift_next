import style from "../../styles/component.module.scss";
import MapConponent from "../../components/MapComponent/MapComponent";
import Head from "next/head";

const Impacts = ({ apiData, apiHomeData }) => {
  return (
    <>
      <Head>
        <title>Impacts | Green Shift Nepal</title>
        <meta property="og:image" content="./chitwna.jpeg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <section className={style.impact_banner}></section>
      <MapConponent mapData={apiData} mapText={apiHomeData} />
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://app.greenshift.creasion.org/api/dashboard");
  const apiData = await res.json();

  const homeData = await fetch(
    "https://app.greenshift.creasion.org/api/homepage"
  );
  const apiHomeData = await homeData.json();

  return {
    props: {
      apiData,
      apiHomeData,
    },
    revalidate: 30,
  };
}

export default Impacts;
