import { useState } from "react";

import Head from "next/head";
import { Container } from "@mui/material";
import { useRouter } from "next/router";

import { useIsomorphicLayoutEffect } from "@/hook";

import style from "../style.module.scss";
import Banner from "../../../layout/Banner/Banner";

const NewsDetail = () => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";

  const [data, setData] = useState(null);

  const router = useRouter();
  let lang = router.locale;

  const { name } = router.query;

  useIsomorphicLayoutEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://app.greenshift.creasion.org/api/campaign"
      );
      const newData = await res.json();
      setData(newData);
    };
    fetchData();
  }, []);

  const campaign =
    data &&
    data.campaigns.find(
      (el) => el.title.toLowerCase().replace(/\s+/g, "-") === name
    );

  let selectedCampaigns = null;
  if (campaign) {
    selectedCampaigns = [campaign];
  }

  return (
    <>
      {selectedCampaigns ? (
        <>
          <Head>
            <title>{selectedCampaigns[0].title} | Green Shift Nepal</title>
            <meta
              property="og:image"
              content={`${imageUrl}/${selectedCampaigns[0].image}`}
            />
            <meta property="og:image:width" content="640" />
            <meta property="og:image:height" content="442" />
          </Head>

          <Banner
            title={
              lang == "en"
                ? selectedCampaigns[0].title
                : selectedCampaigns[0].title_np
            }
          />

          <div className={style.campaign_detail}>
            <Container maxWidth={"lg"}>
              <div className={style.image}>
                <img src={`${imageUrl}/${selectedCampaigns[0].image}`} alt="" />
              </div>
            </Container>

            <Container maxWidth="md">
              <div
                className={style.text}
                dangerouslySetInnerHTML={{
                  __html:
                    lang == "en"
                      ? selectedCampaigns[0].description
                      : selectedCampaigns[0].description_np,
                }}
              />
            </Container>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default NewsDetail;
