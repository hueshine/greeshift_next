import Head from "next/head";
import React from "react";

const about = () => {
  return (
    <>
      <Head>
        <title>ABOUT | GREENSHIFT NEPAL</title>
        <meta property="og:image" content="./XDfMiMpv1kt6nn5JPDLG.jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>
      <div>about</div>

      <ul>
        <li>
          <h6>Objective of the Activity </h6>
          <p>
            To engage youth groups as change agents in the community by leading
            awareness campaigns and data-driven advocacy .
          </p>
        </li>

        <li>
          <h6>Expected Outcome </h6>
          <p>Youths are trained and educated on circular economy.</p>
          <p>Increased awareness of communitiy members on circular economy.</p>
        </li>
      </ul>
    </>
  );
};

export default about;
