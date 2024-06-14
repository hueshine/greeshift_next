import Head from "next/head";
import FocusContainer from "../../components/Focusarea/FocusContainer";
import { useRouter } from "next/router";

const GreenShiftCampaign = () => {
  return (
    <>
      <Head>
        <title>Focus Areas | Green Shift Nepal</title>
        <meta property="og:image" content="./chitwna.jpeg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>

      <FocusContainer />
    </>
  );
};

export default GreenShiftCampaign;
