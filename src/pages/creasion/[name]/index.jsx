import Banner from "@/layout/Banner/Banner";
import Head from "next/head";

import Activity from "../../../components/Activity/Activity";
import { useRouter } from "next/router";

import data from "@/pages/api/activityData.json";

const Creasion = () => {
  const router = useRouter();

  const { name } = router.query;

  const selectedData = data.creasion.find(
    (el) => el.title.toLowerCase().replace(/\s+/g, "-") === name
  );

  return (
    <>
      {selectedData ? (
        <>
          <Head>
            <title>{selectedData.title} | Green Shift Nepal</title>
            <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
            <meta property="og:image:width" content="640" />
            <meta property="og:image:height" content="442" />
          </Head>
          <Banner title={selectedData.title} parent={"CREASION"} />

          <Activity data={selectedData} />
        </>
      ) : (
        "Preloader "
      )}
    </>
  );
};

export default Creasion;
