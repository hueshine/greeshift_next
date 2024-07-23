import Banner from "@/layout/Banner/Banner";
import Head from "next/head";

import Activity from "../../../components/Activity/Activity";
import { useRouter } from "next/router";

import { useIsomorphicLayoutEffect } from "@/hook";
import { useState } from "react";

import PreLoader from "../../../layout/PreLoader/PreLoader";

const Creasion = () => {
  const [activityData, setActivityData] = useState();
  const [newsData, setNewsData] = useState();

  useIsomorphicLayoutEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://www.app.greenshift.creasion.org/api/activities"
      );
      const apiData = await res.json();

      setActivityData(apiData.items);
    };
    fetchData();

    const fetchNewsData = async () => {
      const res = await fetch(
        "https://www.app.greenshift.creasion.org/api/news"
      );
      const apiNewsData = await res.json();

      setNewsData(apiNewsData.news);
    };
    fetchNewsData();
  }, []);
  const router = useRouter();

  const { name } = router.query;
  let lang = router.locale;

  let selectedData = null;

  if (activityData) {
    selectedData = activityData.find(
      (el) => el.title.toLowerCase().replace(/\s+/g, "-") === name
    );
  }

  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  return (
    <>
      {selectedData ? (
        <>
          <Head>
            <title>{selectedData.title} | Green Shift Nepal</title>
            <meta
              property="og:image"
              content={`${imageUrl}/${selectedData.images[0]}`}
            />
            <meta property="og:image:width" content="640" />
            <meta property="og:image:height" content="442" />
          </Head>
          <Banner
            title={lang == "en" ? selectedData.title : selectedData.title_np}
            parent={lang == "en" ? selectedData.ledBy : selectedData.ledBy_np}
          />
          <Activity data={selectedData} newsData={newsData} />
        </>
      ) : (
        <PreLoader />
      )}
    </>
  );
};

export default Creasion;
