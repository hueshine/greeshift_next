import React, { useState, useRef } from "react";

import componentStyle from "../../styles/component.module.scss";

import { useIsomorphicLayoutEffect } from "@/hook";

import AddIcon from "@mui/icons-material/Add";

import { Container, Grid } from "@mui/material";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import MunicipalityData from "./data/data.json";

import {
  plasticOptionsStyle,
  genderOptionsStyle,
  schoolOptionsStyle,
  youthOptionsStyle,
} from "./styles";

const MunicipalityList = () => {
  let [selectedIndex, setSelectedIndex] = useState(-1);
  const [chartData, setChartData] = useState({
    plastics_generated: 100,
    plastics_collected: 20,
    male_reached: 50,
    female_reached: 20,
    school_target: 12,
    school_reached: 3,
    youth_target: 100,
    youth_reached: 0,
  });

  const genderOptions = {
    ...genderOptionsStyle,

    series: [
      {
        name: "Vulnerable Communities Reached ",
        colorByPoint: true,
        data: [
          {
            name: "Male",
            y: chartData.male_reached,
            color: "#008DDA",
          },
          {
            name: "Female",
            y: chartData.female_reached,
            color: "#FF71CD",
          },
        ],
      },
    ],
  };

  const plasticOptions = {
    ...plasticOptionsStyle,

    series: [
      {
        minPointSize: 10,
        innerSize: "20%",
        zMin: 0,
        borderRadius: 5,
        name: "Total Plastics",
        data: [
          {
            name: "Plastics Generated",
            y: chartData.plastics_generated,
            z: 0,
            color: "#A8CD9F",
          },
          {
            name: "Plastics Collected:",
            y: chartData.plastics_collected,
            z: 0,
            color: "#007F73",
          },
        ],
        dataLabels: {
          enabled: false,
        },
      },
    ],
  };

  const schoolOptions = {
    ...schoolOptionsStyle,
    series: [
      {
        minPointSize: 10,
        innerSize: "20%",
        zMin: 0,
        borderRadius: 5,
        name: "Schools",
        data: [
          {
            name: "Projected Target",
            y: chartData.school_target,
            z: 0,
            color: "#ffb57c59",
          },
          {
            name: "Schools Reached",
            y: chartData.school_reached,
            z: 0,
            color: "#ffa35c",
          },
        ],
        dataLabels: {
          enabled: false,
        },
      },
    ],
  };

  const youthOptions = {
    ...youthOptionsStyle,
    series: [
      {
        minPointSize: 10,
        innerSize: "20%",
        zMin: 0,
        borderRadius: 5,
        name: "Youths",
        data: [
          {
            name: "Projected Target",
            y: chartData.youth_target,
            z: 0,
            color: "#AD88C6",
          },
          {
            name: "Youths Reached",
            y: chartData.youth_reached,
            z: 0,
            color: "#6420AA",
          },
        ],
        dataLabels: {
          enabled: false,
        },
      },
    ],
  };

  const ImapctCard = ({ impactData }) => {
    let selectedMunicipality = impactData;

    return (
      <div className={componentStyle.impact_box}>
        <div className={componentStyle.chart_data}>
          <div className={componentStyle.chart_box}>
            <HighchartsReact
              highcharts={Highcharts}
              options={plasticOptions}
              containerProps={{
                style: { height: "230px", width: "150px" },
              }}
            />
            <div className={componentStyle.chart_item_wrap}>
              <div className={componentStyle.chart_data_item}>
                <span>Plastic Generated</span>
                <h4>
                  {selectedMunicipality.stats.plastics_generated}{" "}
                  <small>TPM</small>
                </h4>
              </div>

              <div className={componentStyle.chart_data_item}>
                <span>Plastic Collected</span>
                <h4>
                  {selectedMunicipality.stats.plastics_collected}{" "}
                  <small>TPM</small>
                </h4>
              </div>
            </div>
          </div>

          <div className={componentStyle.chart_box}>
            <HighchartsReact
              highcharts={Highcharts}
              options={genderOptions}
              containerProps={{
                style: { height: "230px", width: "150px" },
              }}
            />

            <div className={componentStyle.chart_item_wrap}>
              <div className={componentStyle.chart_data_item}>
                <span>Male Reached</span>
                <h4>
                  {selectedMunicipality.stats.male_reached} <small>Males</small>
                </h4>
              </div>

              <div className={componentStyle.chart_data_item}>
                <span>Female Reached</span>
                <h4>
                  {selectedMunicipality.stats.female_reached}{" "}
                  <small>Females</small>
                </h4>
              </div>
            </div>
          </div>

          <div className={componentStyle.chart_box}>
            <HighchartsReact
              highcharts={Highcharts}
              options={schoolOptions}
              containerProps={{
                style: { height: "230px", width: "150px" },
              }}
            />
            <div className={componentStyle.chart_item_wrap}>
              <div className={componentStyle.chart_data_item}>
                <span>School Reached</span>
                <h4>
                  {selectedMunicipality.stats.school_reached}
                  <small> Schools</small>
                </h4>
              </div>
            </div>
          </div>

          <div className={componentStyle.chart_box}>
            <HighchartsReact
              highcharts={Highcharts}
              options={youthOptions}
              containerProps={{
                style: { height: "230px", width: "150px" },
              }}
            />
            <div className={componentStyle.chart_item_wrap}>
              <div className={componentStyle.chart_data_item}>
                <span>Youth Reached</span>
                <h4>
                  {selectedMunicipality.stats.youth_reached}
                  <small> Youths</small>
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className={componentStyle.chart_issue}>
          <div className={componentStyle.chart_issue_card}>
            <h6>Major Issues</h6>
            <p>{selectedMunicipality.stats.major_issue}</p>
          </div>

          <div className={componentStyle.chart_issue_card}>
            <h6>River leakage</h6>
            <p>{selectedMunicipality.stats.river_leakage}</p>
          </div>
        </div>
      </div>
    );
  };

  // const ImapctCard = ({ impactData }) => {
  //   let selectedMunicipality = impactData;

  //   return (
  //     <div className={componentStyle.impact_box}>
  //       <div className={componentStyle.chart_issue}>
  //         <div className={componentStyle.chart_issue_card}>
  //           <h6>Major Issues</h6>
  //           <p>{selectedMunicipality.stats.major_issue}</p>
  //         </div>

  //         <div className={componentStyle.chart_issue_card}>
  //           <h6>River leakage</h6>
  //           <p>{selectedMunicipality.stats.river_leakage}</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className={componentStyle.municipality_responsive}>
      {MunicipalityData.map((data, index) => {
        return (
          <div className={componentStyle.card} key={index}>
            <div
              className={componentStyle.card_title}
              onClick={() => {
                setSelectedIndex(index);

                setChartData({
                  plastics_generated: data.stats.plastics_generated,
                  plastics_collected: data.stats.plastics_collected,
                  male_reached: data.stats.male_reached,
                  female_reached: data.stats.female_reached,
                  school_target: data.stats.school_target,
                  school_reached: data.stats.school_reached,
                  youth_target: data.stats.youth_target,
                  youth_reached: data.stats.youth_reached,
                });
              }}
            >
              <h5>{data.title}</h5>

              <div className={componentStyle.icon}>
                <AddIcon />
              </div>
            </div>

            {selectedIndex == index ? <ImapctCard impactData={data} /> : ""}
          </div>
        );
      })}
    </div>
  );
};

export default MunicipalityList;
