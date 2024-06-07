import React, { useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hook";
import { useRouter } from "next/router";

import Banner from "../../layout/Banner/Banner";

const FocusContainer = () => {
  const [data, setData] = useState(null);

  useIsomorphicLayoutEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://app.greenshift.creasion.org/api/area");
      const newData = await res.json();
      setData(newData);
    };
    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <>
          <Banner title={data.banner_text} />

          {data.areas.map((val, index) => (
            <h4 key={index}>{val.title}</h4>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default FocusContainer;
