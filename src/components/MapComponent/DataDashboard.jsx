import { useState, useRef } from "react";

import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsSolidGauge from "highcharts/modules/solid-gauge";
import HighchartsPictorial from "highcharts/modules/pictorial";

import data from "./data/dashboard.json";

import { Container, Grid } from "@mui/material";
import styles from "./dashboard.module.scss";
if (typeof Highcharts === "object") {
  HighchartsMore(Highcharts);
  HighchartsSolidGauge(Highcharts);
  HighchartsPictorial(Highcharts);
}

import { useIsomorphicLayoutEffect } from "@/hook";

import {
  budgetSpentStyle,
  wasteSmartSchoolStyle,
  peopleInvolvedStyle,
  wasteDisposalStyle,
  reductionPlasticsStyle,
  wasteCompositionStyle,
  vulnerableCommunitiesStyle,
  allwasteDisposalStyle,
  allPlasticLeakageStyle,
} from "./dataStyle";

const DataDashboard = () => {
  const municipalityRefs = useRef([]);
  const chartContainerRef = useRef();
  const allDataLi = useRef();
  const [activeData, setActiveData] = useState(data.siteData[0]);
  const [allDataIndex, setAllDataIndex] = useState(true);

  const allData = data.allData;

  const budgetSpent = {
    ...budgetSpentStyle,

    yAxis: {
      min: 0,
      max: allDataIndex ? allData.budget.total : activeData.budget.total,
      tickPixelInterval: 100,
      tickPosition: "inside",
      tickColor: "#FFFFFF",
      tickLength: 0,
      tickWidth: 0,
      minorTickInterval: null,
      labels: {
        distance: 20,
        style: {
          fontSize: "10px",
        },
      },
      lineWidth: 0,
      plotBands: [
        {
          from: 0,
          to:
            (allDataIndex ? allData.budget.total : activeData.budget.total) / 4,
          color: "#F7EEDD",
          thickness: 40,
        },
        {
          from:
            (allDataIndex ? allData.budget.total : activeData.budget.total) / 4,
          to:
            (allDataIndex ? allData.budget.total : activeData.budget.total) / 2,
          color: "#ACE2E1",
          thickness: 40,
        },
        {
          from:
            (allDataIndex ? allData.budget.total : activeData.budget.total) / 2,
          to:
            (allDataIndex ? allData.budget.total : activeData.budget.total) /
            1.33,
          color: "#41C9E2",
          thickness: 40,
        },
        {
          from:
            (allDataIndex ? allData.budget.total : activeData.budget.total) /
            1.33,
          to: allDataIndex ? allData.budget.total : activeData.budget.total,
          color: "#008DDA",
          thickness: 40,
        },
      ],
    },

    series: [
      {
        name: "Budget Spent",
        data: [allDataIndex ? allData.budget.spent : activeData.budget.spent],
        tooltip: {
          valueSuffix: "NPR",
        },
        dataLabels: {
          format: "{y} NPR",
          borderWidth: 0,
          color: "#333333",
          style: {
            fontSize: "16px",
          },
        },
        dial: {
          radius: "50%",
          backgroundColor: "#008DDA",
          baseWidth: 4,
          baseLength: "0%",
          rearLength: "0%",
        },
        pivot: {
          backgroundColor: "#008DDA",
          radius: 8,
        },
      },
    ],
  };

  const wasteSmartSchool = {
    ...wasteSmartSchoolStyle,
    series: [
      {
        minPointSize: 10,
        innerSize: "30%",
        zMin: 0,
        borderRadius: 5,
        name: "Schools",
        data: [
          {
            name: "Target Remaininng",
            y: activeData.school.remaining,
            z: 0,
            color: "#ffb57c59",
          },
          {
            name: "Schools Reached",
            y: activeData.school.acheived,
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

  const peopleInvolved = {
    ...peopleInvolvedStyle,

    series: [
      {
        data: [
          {
            y: allDataIndex
              ? allData.peopleInvolved.female
              : activeData.peopleInvolved.female,
            colorIndex: 0,
          },
          {
            y: allDataIndex
              ? allData.peopleInvolved.male
              : activeData.peopleInvolved.male,
            colorIndex: 1,
          },
        ],
      },
    ],
  };

  const wasteDisposal = {
    ...wasteDisposalStyle,

    series: [
      {
        name: "",
        colorByPoint: true,
        data: activeData.hotspot.chart,
      },
    ],
  };

  const reductionPlastics = {
    ...reductionPlasticsStyle,

    series: [
      {
        name: "",
        colorByPoint: true,
        data: activeData.leakage.chart,
      },
    ],
  };

  const wasteComposition = {
    ...wasteCompositionStyle,

    series: [
      {
        minPointSize: 10,
        innerSize: "30%",
        zMin: 0,
        borderRadius: 2,
        name: allDataIndex
          ? allData.wasteComposition.title
          : activeData.wasteComposition.title,

        data: allDataIndex
          ? allData.wasteComposition.chart
          : activeData.wasteComposition.chart,
      },
    ],
  };

  const vulnerableCommunities = {
    ...vulnerableCommunitiesStyle,

    series: [
      {
        name: "Trained Vulnerable Communities",
        colorByPoint: true,
        data: allDataIndex
          ? allData.vulnerable.chart
          : activeData.vulnerable.chart,
      },
    ],
  };

  const allwasteDisposal = {
    ...allwasteDisposalStyle,

    xAxis: allData.wasteDisposal.xAxis,

    series: allData.wasteDisposal.series,
  };

  const allPlasticLeakage = {
    ...allPlasticLeakageStyle,

    xAxis: allData.plasticLeakage.xAxis,
    series: allData.plasticLeakage.series,
  };

  const allSchoolActivities = {
    ...allPlasticLeakageStyle,

    xAxis: allData.schoolActivities.xAxis,
    series: allData.schoolActivities.series,
  };

  useIsomorphicLayoutEffect(() => {
    allDataLi.current.addEventListener("click", () => {
      setAllDataIndex(true);
    });

    municipalityRefs.current.forEach((ref, index) => {
      ref.addEventListener("click", () => {
        setAllDataIndex(false);

        console.log(allDataIndex);
        setActiveData(data.siteData[index]);
        removeActiveClass();
        ref.classList.add(styles.active);

        chartContainerRef.current.scrollIntoView({
          block: "start",
          inline: "nearest",
        });
        window.scrollBy(0, -90);
      });
    });

    function removeActiveClass() {
      municipalityRefs.current.forEach((ref) => {
        ref.classList.remove(styles.active);
      });
    }
  });

  return (
    <>
      <section className={styles.dashboard3}>
        <section className={styles.navigaton}>
          <Container maxWidth="xl">
            <ul>
              <li ref={allDataLi} className={allDataIndex ? styles.active : ""}>
                All
              </li>
              {data.siteData.map((el, index) => {
                return (
                  <li
                    key={index}
                    ref={(el) => (municipalityRefs.current[index] = el)}
                    className={
                      allDataIndex ? " " : index == 0 ? styles.active : ""
                    }
                  >
                    {el.municipality}
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>

        <section ref={chartContainerRef}>
          <Container maxWidth="xl">
            <p>
              <small>Last Updated 8th April, 2024</small>{" "}
            </p>
            {allDataIndex ? (
              <Grid container spacing={2}>
                <Grid item md={8} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item md={4} xs={6}>
                      <div className={styles.chart_card}>
                        <div className={styles.numbers}>
                          <h2>{allData.cleanup_campaigns.number}</h2>
                          <h6>{allData.cleanup_campaigns.title}</h6>
                        </div>
                      </div>
                    </Grid>

                    <Grid item md={4} xs={6}>
                      <div className={styles.chart_card}>
                        <div className={styles.numbers}>
                          <h2>
                            {allData.plastic_collected.number}{" "}
                            <small>{allData.plastic_collected.unit}</small>
                          </h2>
                          <h6>{allData.plastic_collected.title}</h6>
                        </div>
                      </div>
                    </Grid>

                    <Grid item md={4} xs={6}>
                      <div className={styles.chart_card}>
                        <div className={styles.numbers}>
                          <h2>
                            {allData.awareness_campaign.number}{" "}
                            <small>{allData.awareness_campaign.unit}</small>
                          </h2>
                          <h6>{allData.awareness_campaign.title}</h6>
                        </div>
                      </div>
                    </Grid>

                    <Grid item md={2.5} xs={6}>
                      <div className={styles.chart_card}>
                        <div className={styles.numbers}>
                          <h2>
                            {allData.recovered.number}{" "}
                            <small>{allData.recovered.unit}</small>
                          </h2>
                          <h6>{allData.recovered.title}</h6>
                        </div>
                      </div>
                    </Grid>

                    <Grid item md={2.5} xs={6}>
                      <div className={styles.chart_card}>
                        <div className={styles.numbers}>
                          <h2>
                            {allData.emmission.number}{" "}
                            <small>{allData.emmission.unit}</small>
                          </h2>
                          <h6>{allData.emmission.title}</h6>
                        </div>
                      </div>
                    </Grid>

                    <Grid item md={7} xs={12}>
                      <div className={styles.chart_card}>
                        <Grid container spacing={2} alignItems={"center"}>
                          <Grid item md={6} xs={7}>
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={budgetSpent}
                            />
                          </Grid>

                          <Grid item md={6} xs={5}>
                            <h2>{allData.budget.spent_in_text}</h2>
                            <h6>{allData.budget.title}</h6>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item md={4} xs={12}>
                  <div className={styles.chart_card}>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={peopleInvolved}
                    />

                    <Grid container>
                      <Grid item md={6} xs={6}>
                        <div className={styles.numbers}>
                          <h2>{`${allData.peopleInvolved.femaleNum}`}</h2>
                          <h6>Female Reached</h6>
                        </div>
                      </Grid>

                      <Grid item md={6} xs={6}>
                        <div className={styles.numbers}>
                          <h2>{`${allData.peopleInvolved.maleNum}`}</h2>
                          <h6>Male Reached</h6>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <Grid item md={6} xs={12}>
                  <div className={styles.chart_card}>
                    <div className={styles.chart_title}>
                      <h6>{allData.wasteDisposal.title}</h6>

                      <HighchartsReact
                        highcharts={Highcharts}
                        options={allwasteDisposal}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item md={6} xs={12}>
                  <div className={styles.chart_card}>
                    <div className={styles.chart_title}>
                      <h6>{allData.plasticLeakage.title}</h6>

                      <HighchartsReact
                        highcharts={Highcharts}
                        options={allPlasticLeakage}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item md={3} xs={12}>
                  <div className={styles.chart_card}>
                    <div className={styles.chart_title}>
                      <h6>{allData.vulnerable.title}</h6>
                    </div>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={vulnerableCommunities}
                    />
                  </div>
                </Grid>

                <Grid item md={4} xs={12}>
                  <div className={styles.chart_card}>
                    <div className={styles.chart_title}>
                      <h6>{allData.wasteComposition.title}</h6>
                    </div>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={wasteComposition}
                    />
                  </div>
                </Grid>

                <Grid item md={5} xs={12}>
                  <div className={styles.chart_card}>
                    <div className={styles.chart_title}>
                      <h6>{allData.schoolActivities.title}</h6>

                      <HighchartsReact
                        highcharts={Highcharts}
                        options={allSchoolActivities}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item md={5} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item md={6} xs={6}>
                      <div className={styles.chart_card}>
                        <div className={styles.numbers}>
                          <h2>{activeData.cleanup_campaigns.number}</h2>
                          <h6>{activeData.cleanup_campaigns.title}</h6>
                        </div>
                      </div>
                    </Grid>

                    <Grid item md={6} xs={6}>
                      <div className={styles.chart_card}>
                        <div className={styles.numbers}>
                          <h2>
                            {activeData.plastic_collected.number}{" "}
                            <small>{activeData.plastic_collected.unit}</small>
                          </h2>
                          <h6>{activeData.plastic_collected.title}</h6>
                        </div>
                      </div>
                    </Grid>

                    <Grid item md={12}>
                      <div className={styles.chart_card}>
                        <Grid container spacing={2} alignItems={"center"}>
                          <Grid item md={6} xs={7}>
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={budgetSpent}
                            />
                          </Grid>

                          <Grid item md={6} xs={5}>
                            <h2>{activeData.budget.spent_in_text}</h2>
                            <h6>{activeData.budget.title}</h6>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item md={7} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                      <div className={styles.chart_card}>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={wasteSmartSchool}
                        />

                        <div className={styles.numbers}>
                          <h2>{`${activeData.school.acheived}%`}</h2>
                          <h6>{activeData.school.title}</h6>
                        </div>
                      </div>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <div className={styles.chart_card}>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={peopleInvolved}
                        />

                        <Grid container>
                          <Grid item md={6} xs={6}>
                            <div className={styles.numbers}>
                              <h2>{`${activeData.peopleInvolved.femaleNum}`}</h2>
                              <h6>Female Reached</h6>
                            </div>
                          </Grid>

                          <Grid item md={6} xs={6}>
                            <div className={styles.numbers}>
                              <h2>{`${activeData.peopleInvolved.maleNum}`}</h2>
                              <h6>Male Reached</h6>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item md={6} xs={12}>
                  <div className={styles.chart_card}>
                    <div className={styles.chart_title}>
                      <h6>{activeData.hotspot.title}</h6>
                    </div>

                    <HighchartsReact
                      highcharts={Highcharts}
                      options={wasteDisposal}
                    />
                  </div>
                </Grid>

                <Grid item md={6} xs={12}>
                  <div className={styles.chart_card}>
                    <div className={styles.chart_title}>
                      <h6>{activeData.leakage.title}</h6>
                    </div>

                    <HighchartsReact
                      highcharts={Highcharts}
                      options={reductionPlastics}
                    />
                  </div>
                </Grid>

                <Grid item md={7} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                      <div className={styles.chart_card}>
                        <div className={styles.chart_title}>
                          <h6>{activeData.wasteComposition.title}</h6>
                        </div>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={wasteComposition}
                        />
                      </div>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <div className={styles.chart_card}>
                        <div className={styles.chart_title}>
                          <h6>{activeData.vulnerable.title}</h6>
                        </div>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={vulnerableCommunities}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item md={5} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item md={6} xs={6}>
                      <div className={styles.chart_card}>
                        <div className={styles.numbers}>
                          <h2>{activeData.emmission.number}</h2>
                          <h6>{activeData.emmission.title}</h6>
                        </div>
                      </div>
                    </Grid>

                    <Grid item md={6} xs={6}>
                      <div className={styles.chart_card}>
                        <div className={styles.numbers}>
                          <h2>{activeData.recovered.number}</h2>
                          <h6>{activeData.recovered.title}</h6>
                        </div>
                      </div>
                    </Grid>

                    <Grid item md={6} xs={6}>
                      <div className={styles.chart_card}>
                        <div className={styles.numbers}>
                          <h2>{activeData.awareness_campaign.number}</h2>
                          <h6>{activeData.awareness_campaign.title}</h6>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Container>
        </section>
      </section>
    </>
  );
};

export default DataDashboard;
