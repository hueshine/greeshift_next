import Head from "next/head";
import { Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";

import data from "../data.json";

import style from "../style.module.scss";
import Banner from "../../../layout/Banner/Banner";

const NewsDetail = () => {
  const router = useRouter();

  const { name } = router.query;

  let campaignData = data;

  const selectedCampaigns = campaignData.find(
    (el) => el.title.toLowerCase().replace(/\s+/g, "-") === name
  );
  return (
    <>
      {selectedCampaigns ? (
        <>
          <Head>
            <title>{selectedCampaigns.title} | Green Shift Nepal</title>
            <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
            <meta property="og:image:width" content="640" />
            <meta property="og:image:height" content="442" />
          </Head>

          <Banner title={selectedCampaigns.title} />

          <div className={style.campaign_detail}>
            <Container maxWidth={"lg"}>
              <div className={style.image}>
                <img src={selectedCampaigns.image} alt="" />
              </div>
            </Container>

            <Container maxWidth="md">
              <div
                className={style.text}
                dangerouslySetInnerHTML={{ __html: selectedCampaigns.text }}
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
