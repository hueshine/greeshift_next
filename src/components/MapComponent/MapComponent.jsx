import React, { useState, useRef } from "react";
import componentStyle from "./dashboard.module.scss";

import { useIsomorphicLayoutEffect } from "@/hook";

import { Container, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";

import { Marker, Map, Source, Layer } from "react-map-gl";
import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import NepalMap from "./data/MapOfNepal.json";
import MunicipalityMap from "./data/MapOfMunicipalities.json";

import MunicipalityData from "./data/dataNew.json";

import {
  BorderLinearProgress,
  MuniBorderLinearProgress,
  mapStyleLine,
  mapStyleFill,
  viewportCommon,
} from "./styles";

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

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsSolidGauge from "highcharts/modules/solid-gauge";
import HighchartsPictorial from "highcharts/modules/pictorial";

if (typeof Highcharts === "object") {
  HighchartsMore(Highcharts);
  HighchartsSolidGauge(Highcharts);
  HighchartsPictorial(Highcharts);
}

const MapComponent = () => {
  const mapRef = useRef(null);
  const [initialZoomValue, setInitialZoomValue] = useState(null);
  const [dataBoxIndex, setDataBoxIndex] = useState(false);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [allDataIndex, setAllDataIndex] = useState(false);

  mapboxgl.accessToken =
    "pk.eyJ1IjoieW9nZXNoa2Fya2kiLCJhIjoiY2txZXphNHNlMGNybDJ1cXVmeXFiZzB1eSJ9.A7dJUR4ppKJDKWZypF_0lA";

  const viewportXl = {
    ...viewportCommon,
    zoom: initialZoomValue,
  };

  const whereFly = (city) => {
    const map = mapRef.current.getMap();

    if (map) {
      map.flyTo({
        center: city.latLng,
        zoom: city.zoomValue,
      });
    }
  };

  const resetMapBox = () => {
    const map = mapRef.current.getMap();

    if (map) {
      map.flyTo({
        center: [86.5316036, 28.2913667],
        zoom: initialZoomValue,
      });
    }

    setSelectedMunicipality(null);
    setDataBoxIndex(false);
  };

  let SideBarData = () => {
    const budgetSpent = {
      ...budgetSpentStyle,

      yAxis: {
        min: 0,
        max: allDataIndex
          ? MunicipalityData.allData.budget.total
          : selectedMunicipality.budget.total,
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
              (allDataIndex
                ? MunicipalityData.allData.budget.total
                : selectedMunicipality.budget.total) / 4,
            color: "#F7EEDD",
            thickness: 40,
          },
          {
            from:
              (allDataIndex
                ? MunicipalityData.allData.budget.total
                : selectedMunicipality.budget.total) / 4,
            to:
              (allDataIndex
                ? MunicipalityData.allData.budget.total
                : selectedMunicipality.budget.total) / 2,
            color: "#ACE2E1",
            thickness: 40,
          },
          {
            from:
              (allDataIndex
                ? MunicipalityData.allData.budget.total
                : selectedMunicipality.budget.total) / 2,
            to:
              (allDataIndex
                ? MunicipalityData.allData.budget.total
                : selectedMunicipality.budget.total) / 1.33,
            color: "#41C9E2",
            thickness: 40,
          },
          {
            from:
              (allDataIndex
                ? MunicipalityData.allData.budget.total
                : selectedMunicipality.budget.total) / 1.33,
            to: allDataIndex
              ? MunicipalityData.allData.budget.total
              : selectedMunicipality.budget.total,
            color: "#008DDA",
            thickness: 40,
          },
        ],
      },

      series: [
        {
          name: "Budget Spent",
          data: [
            allDataIndex
              ? MunicipalityData.allData.budget.spent
              : selectedMunicipality.budget.spent,
          ],
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

    const peopleInvolved = {
      ...peopleInvolvedStyle,

      series: [
        {
          data: [
            {
              y: allDataIndex
                ? MunicipalityData.allData.peopleInvolved.female
                : selectedMunicipality.peopleInvolved.female,
              colorIndex: 0,
            },
            {
              y: allDataIndex
                ? MunicipalityData.allData.peopleInvolved.male
                : selectedMunicipality.peopleInvolved.male,
              colorIndex: 1,
            },
          ],
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
              y: allDataIndex ? 10 : selectedMunicipality.school.remaining,
              z: 0,
              color: "#ffb57c59",
            },
            {
              name: "Schools Reached",
              y: allDataIndex ? 10 : selectedMunicipality.school.acheived,
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

    const wasteDisposal = {
      ...wasteDisposalStyle,

      series: [
        {
          name: "",
          colorByPoint: true,
          data: allDataIndex ? "" : selectedMunicipality.hotspot.chart,
        },
      ],
    };

    const reductionPlastics = {
      ...reductionPlasticsStyle,

      series: [
        {
          name: "",
          colorByPoint: true,
          data: allDataIndex ? "" : selectedMunicipality.leakage.chart,
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
            ? MunicipalityData.allData.wasteComposition.title
            : selectedMunicipality.wasteComposition.title,

          data: allDataIndex
            ? MunicipalityData.allData.wasteComposition.chart
            : selectedMunicipality.wasteComposition.chart,
        },
      ],
    };

    const vulnerableCommunities = {
      ...vulnerableCommunitiesStyle,

      series: [
        {
          name: allDataIndex
            ? MunicipalityData.allData.vulnerable.title
            : selectedMunicipality.vulnerable.title,
          colorByPoint: true,
          data: allDataIndex
            ? MunicipalityData.allData.vulnerable.chart
            : selectedMunicipality.vulnerable.chart,
        },
      ],
    };

    const allwasteDisposal = {
      ...allwasteDisposalStyle,

      xAxis: MunicipalityData.allData.wasteDisposal.xAxis,

      series: MunicipalityData.allData.wasteDisposal.series,
    };

    const allPlasticLeakage = {
      ...allPlasticLeakageStyle,

      xAxis: MunicipalityData.allData.plasticLeakage.xAxis,
      series: MunicipalityData.allData.plasticLeakage.series,
    };

    const allSchoolActivities = {
      ...allwasteDisposalStyle,

      xAxis: MunicipalityData.allData.schoolActivities.xAxis,
      series: MunicipalityData.allData.schoolActivities.series,
    };

    return (
      <>
        {allDataIndex ? (
          <>
            <div className={componentStyle.data_title}>
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item sm={7}>
                  <h5>{MunicipalityData.allData.title}</h5>
                  <p>Last Updated 8th April, 2024</p>
                </Grid>

                <Grid item sm={5}>
                  <div
                    className={componentStyle.map_data_box_close}
                    onClick={resetMapBox}
                  >
                    <span>Reset Map</span>
                    <CloseIcon />
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className={componentStyle.chart_data}>
              <Grid container columnSpacing={2}>
                <Grid item md={8} sm={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <div className={componentStyle.chart_card}>
                        <div className={componentStyle.numbers}>
                          <h2>
                            {MunicipalityData.allData.cleanup_campaigns.number}
                          </h2>
                          <h6>
                            {MunicipalityData.allData.cleanup_campaigns.title}
                          </h6>
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <div className={componentStyle.chart_card}>
                        <div className={componentStyle.numbers}>
                          <h2>
                            {MunicipalityData.allData.plastic_collected.number}{" "}
                            <small>
                              {MunicipalityData.allData.plastic_collected.unit}
                            </small>
                          </h2>
                          <h6>
                            {MunicipalityData.allData.plastic_collected.title}
                          </h6>
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <div className={componentStyle.chart_card}>
                        <div className={componentStyle.numbers}>
                          <h2>
                            {MunicipalityData.allData.awareness_campaign.number}{" "}
                          </h2>
                          <h6>
                            {MunicipalityData.allData.awareness_campaign.title}
                          </h6>
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <div className={componentStyle.chart_card}>
                        <div className={componentStyle.numbers}>
                          <h2>{MunicipalityData.allData.recovered.number} </h2>
                          <h6>{MunicipalityData.allData.recovered.title}</h6>
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <div className={componentStyle.chart_card}>
                        <Grid container spacing={2} alignItems={"center"}>
                          <Grid item md={6} xs={7}>
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={budgetSpent}
                            />
                          </Grid>

                          <Grid item md={6} xs={5}>
                            <h2>
                              {MunicipalityData.allData.budget.spent_in_text}
                            </h2>
                            <h6>{MunicipalityData.allData.budget.title}</h6>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item md={4} sm={12}>
                  <div className={componentStyle.chart_card}>
                    <div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={peopleInvolved}
                      />

                      <Grid container>
                        <Grid item md={6} xs={6}>
                          <div className={componentStyle.numbers}>
                            <h2>{`${MunicipalityData.allData.peopleInvolved.femaleNum}`}</h2>
                            <h6>Female Reached</h6>
                          </div>
                        </Grid>

                        <Grid item md={6} xs={6}>
                          <div className={componentStyle.numbers}>
                            <h2>{`${MunicipalityData.allData.peopleInvolved.maleNum}`}</h2>
                            <h6>Male Reached</h6>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Grid>

                <Grid item md={6} xs={12}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ display: "block" }}
                  >
                    <div>
                      <div className={componentStyle.chart_title}>
                        <h6>{MunicipalityData.allData.wasteDisposal.title}</h6>
                      </div>

                      <HighchartsReact
                        highcharts={Highcharts}
                        options={allwasteDisposal}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item md={6} xs={12}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ display: "block" }}
                  >
                    <div>
                      <div className={componentStyle.chart_title}>
                        <h6>{MunicipalityData.allData.plasticLeakage.title}</h6>
                      </div>

                      <HighchartsReact
                        highcharts={Highcharts}
                        options={allPlasticLeakage}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item md={5} xs={12}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ display: "block" }}
                  >
                    <div>
                      <div className={componentStyle.chart_title}>
                        <h6>{MunicipalityData.allData.vulnerable.title}</h6>
                      </div>

                      <HighchartsReact
                        highcharts={Highcharts}
                        options={vulnerableCommunities}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item md={5} xs={12}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ display: "block" }}
                  >
                    <div>
                      <div className={componentStyle.chart_title}>
                        <h6>
                          {MunicipalityData.allData.wasteComposition.title}
                        </h6>
                      </div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={wasteComposition}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item md={2} xs={12}>
                  <div className={componentStyle.chart_card}>
                    <div className={componentStyle.numbers}>
                      <h2>{MunicipalityData.allData.emmission.number}</h2>
                      <h6>{MunicipalityData.allData.emmission.title}</h6>
                    </div>
                  </div>
                </Grid>

                <Grid item md={6} xs={12}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ display: "block" }}
                  >
                    <div>
                      <div className={componentStyle.chart_title}>
                        <h6>
                          {MunicipalityData.allData.schoolActivities.title}
                        </h6>
                      </div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={allSchoolActivities}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </>
        ) : (
          <>
            <div className={componentStyle.data_title}>
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item sm={7}>
                  <h5>{selectedMunicipality.title}</h5>
                  <p>Last Updated 8th April, 2024</p>
                </Grid>

                <Grid item sm={5}>
                  <div
                    className={componentStyle.map_data_box_close}
                    onClick={resetMapBox}
                  >
                    <span>Reset Map</span>
                    <CloseIcon />
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className={componentStyle.chart_data}>
              <Grid container columnSpacing={2}>
                <Grid item md={3} xs={12}>
                  <div className={componentStyle.chart_card}>
                    <div className={componentStyle.numbers}>
                      <h2>{selectedMunicipality.cleanup_campaigns.number}</h2>
                      <h6>{selectedMunicipality.cleanup_campaigns.title}</h6>
                    </div>
                  </div>

                  <div className={componentStyle.chart_card}>
                    <div className={componentStyle.numbers}>
                      <h2>
                        {selectedMunicipality.plastic_collected.number}{" "}
                        <small>
                          {selectedMunicipality.plastic_collected.unit}
                        </small>
                      </h2>
                      <h6>{selectedMunicipality.plastic_collected.title}</h6>
                    </div>
                  </div>
                </Grid>

                <Grid item md={5} xs={12}>
                  <div className={componentStyle.chart_card}>
                    <Grid container spacing={2} alignItems={"center"}>
                      <Grid item md={6} xs={7}>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={budgetSpent}
                        />
                      </Grid>

                      <Grid item md={6} xs={5}>
                        <h2>{selectedMunicipality.budget.spent_in_text}</h2>
                        <h6>{selectedMunicipality.budget.title}</h6>
                      </Grid>
                    </Grid>
                  </div>

                  <div className={componentStyle.chart_card}>
                    <Grid container spacing={2} alignItems={"center"}>
                      <Grid item md={6} xs={7}>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={wasteSmartSchool}
                        />
                      </Grid>

                      <Grid item md={6} xs={5}>
                        <h2>{`${selectedMunicipality.school.acheived}%`}</h2>
                        <h6>{selectedMunicipality.school.title}</h6>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <Grid item md={4}>
                  <div className={componentStyle.chart_card}>
                    <div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={peopleInvolved}
                      />

                      <Grid container>
                        <Grid item md={6} xs={6}>
                          <div className={componentStyle.numbers}>
                            <h2>{`${selectedMunicipality.peopleInvolved.femaleNum}`}</h2>
                            <h6>Female Reached</h6>
                          </div>
                        </Grid>

                        <Grid item md={6} xs={6}>
                          <div className={componentStyle.numbers}>
                            <h2>{`${selectedMunicipality.peopleInvolved.maleNum}`}</h2>
                            <h6>Male Reached</h6>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Grid>

                <Grid item md={6} xs={12}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ display: "block" }}
                  >
                    <div>
                      <div className={componentStyle.chart_title}>
                        <h6>{selectedMunicipality.hotspot.title}</h6>
                      </div>

                      <HighchartsReact
                        highcharts={Highcharts}
                        options={wasteDisposal}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item md={6} xs={12}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ display: "block" }}
                  >
                    <div>
                      <div className={componentStyle.chart_title}>
                        <h6>{selectedMunicipality.leakage.title}</h6>
                      </div>

                      <HighchartsReact
                        highcharts={Highcharts}
                        options={reductionPlastics}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item md={6} xs={12}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ display: "block" }}
                  >
                    <div>
                      <div className={componentStyle.chart_title}>
                        <h6>{selectedMunicipality.wasteComposition.title}</h6>
                      </div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={wasteComposition}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item md={6} xs={12}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ display: "block" }}
                  >
                    <div>
                      <div className={componentStyle.chart_title}>
                        <h6>{selectedMunicipality.vulnerable.title}</h6>
                      </div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={vulnerableCommunities}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item md={3} xs={12}>
                  <div className={componentStyle.chart_card}>
                    <div className={componentStyle.numbers}>
                      <h2>{selectedMunicipality.emmission.number}</h2>
                      <h6>{selectedMunicipality.emmission.title}</h6>
                    </div>
                  </div>
                </Grid>

                <Grid item md={3} xs={12}>
                  <div className={componentStyle.chart_card}>
                    <div className={componentStyle.numbers}>
                      <h2>{selectedMunicipality.recovered.number}</h2>
                      <h6>{selectedMunicipality.recovered.title}</h6>
                    </div>
                  </div>
                </Grid>

                <Grid item md={3} xs={12}>
                  <div className={componentStyle.chart_card}>
                    <div className={componentStyle.numbers}>
                      <h2>{selectedMunicipality.awareness_campaign.number}</h2>
                      <h6>{selectedMunicipality.awareness_campaign.title}</h6>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </>
        )}
      </>
    );
  };

  let SideBarInitial = () => {
    return (
      <div className={componentStyle.initial}>
        <div className={componentStyle.initial_head}>
          <h4>
            Envisioning the{" "}
            <span style={{ color: "#40cc28" }}>Green Circuit</span>{" "}
          </h4>

          <p>
            The Seven municipalities viz. Lalitpur Metropolitan City, Bharatpur
            Metropolitan City Bardibas Municipality, Hetauda Sub Metropolitan
          </p>
        </div>

        <div className={componentStyle.initial_wrap}>
          <ul>
            <li
              onClick={(e) => {
                setDataBoxIndex(true);
                setAllDataIndex(true);
              }}
            >
              <div className={componentStyle.initial_list}>
                <h6>All</h6>
                <span>20%</span>
              </div>
              <MuniBorderLinearProgress variant="determinate" value={20} />
            </li>
            {MunicipalityData.siteData.map((val, index) => {
              return (
                <li
                  key={index}
                  onClick={(e) => {
                    setDataBoxIndex(true);
                    setAllDataIndex(false);
                    setSelectedMunicipality(val);
                    whereFly(val);
                  }}
                >
                  <div className={componentStyle.initial_list}>
                    <h6>{val.title}</h6>
                    <span>20%</span>
                  </div>
                  <MuniBorderLinearProgress variant="determinate" value={20} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  const pins = MunicipalityData.siteData.map((city, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={city.longitude}
      latitude={city.latitude}
      onClick={(e) => {
        setDataBoxIndex(true);
        setSelectedMunicipality(city);
        whereFly(city);
      }}
    >
      <div
        className={`${componentStyle.map_pin} marker-pin 
        }`}
      >
        <img src="/map_recycle.svg" alt="" />
      </div>
    </Marker>
  ));

  useIsomorphicLayoutEffect(() => {
    if (window.innerWidth < 2500) {
      setInitialZoomValue(6.6);
    }
    if (window.innerWidth < 1700) {
      setInitialZoomValue(6.25);
    }
    if (window.innerWidth < 1400) {
      setInitialZoomValue(6);
    }

    if (window.innerWidth < 900) {
      setInitialZoomValue(6.7);
    }
  });

  return (
    <section className={componentStyle.map_section}>
      <div className={componentStyle.map_container}>
        {initialZoomValue ? (
          <Map
            initialViewState={viewportXl}
            mapStyle="mapbox://styles/yogeshkarki/clua14f3500ju01pi4lc43s6a"
            mapboxAccessToken={mapboxgl.accessToken}
            attributionControl={false}
            ref={mapRef}
          >
            <Source id="nepalMap" type="geojson" data={NepalMap}>
              <Layer {...mapStyleLine} />
            </Source>

            {pins}

            <Source id="municipalityMap" type="geojson" data={MunicipalityMap}>
              <Layer {...mapStyleFill} />
            </Source>
          </Map>
        ) : (
          ""
        )}
      </div>

      <div className={componentStyle.map_title}>
        <h5>Plastics Collection</h5>
        <BorderLinearProgress variant="determinate" value={70} />
        <div className={componentStyle.target_grid}>
          <div className={componentStyle.target_item}>
            <p>Target Achieved</p>
            <h3>
              215 <small>Tons</small>
            </h3>
          </div>

          <div className={componentStyle.target_item}>
            <p>Target</p>
            <h3>
              5 <small>Kilo Tons</small>
            </h3>
          </div>
        </div>
      </div>

      {/* <div className={componentStyle.map_info}>
        <p>
          <InfoIcon />
          <small>
            <strong>Click</strong> on the highlighted municipalities to view the
            impacts of Project Cap
          </small>
        </p>
      </div> */}

      <Container maxWidth="xl">
        <div
          className={`${componentStyle.map_data_box} ${
            dataBoxIndex ? `${componentStyle.active}` : ""
          }`}
        >
          {dataBoxIndex ? <SideBarData /> : <SideBarInitial />}
        </div>
      </Container>
    </section>
  );
};

export default MapComponent;
