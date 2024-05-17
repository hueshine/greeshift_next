import Banner from "@/layout/Banner/Banner";
import Head from "next/head";

import Activity from "../../../components/Activity/Activity";
import { useRouter } from "next/router";

import { useIsomorphicLayoutEffect } from "@/hook";
import { useState } from "react";

import PreLoader from "../../../layout/PreLoader/PreLoader";

const Creasion = () => {
  const [activityData, setActivityData] = useState();

  useIsomorphicLayoutEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://www.app.greenshift.creasion.org/api/activities"
      );
      const apiData = await res.json();

      setActivityData(apiData.items);
    };
    fetchData();
  }, []);
  const router = useRouter();

  const { name } = router.query;

  let selectedData = null;

  if (activityData) {
    selectedData = activityData.find(
      (el) => el.title.toLowerCase().replace(/\s+/g, "-") === name
    );
  }

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
          <Banner title={selectedData.title} parent={selectedData.ledBy} />

          <Activity data={selectedData} />
        </>
      ) : (
        <PreLoader />
      )}
    </>
  );
};

export default Creasion;
