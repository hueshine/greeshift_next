import React, { useState, useRef } from "react";
import componentStyle from "./dashboard.module.scss";

import { useIsomorphicLayoutEffect } from "@/hook";

import {
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";

import { Marker, Map, Source, Layer } from "react-map-gl";
import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import NepalMap from "./data/MapOfNepal.json";
import MunicipalityMap from "./data/MapOfMunicipalities.json";

import MunicipalityData from "./data/dataNew.json";

import { mapStyleLine, mapStyleFill, viewportCommon } from "./styles";

import {
  grantDistributedStyle,
  genderStyle,
  ethinicityStyle,
  pieChartDataStyle,
  wasteWorkerStyle,
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
  const [MunicipalityFilter, setMunicipalityFilter] = useState(
    MunicipalityData.siteData
  );

  const [year, setYear] = useState("");

  const handleChange = (event) => {
    setYear(event.target.value);

    if (event.target.value == 0) {
      setMunicipalityFilter(MunicipalityData.siteData);
    } else {
      let filterData = MunicipalityData.siteData.filter(
        (muni) => muni.year == event.target.value
      );

      setMunicipalityFilter(filterData);
    }
  };

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
    const grantDistributed = {
      ...grantDistributedStyle,

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: Date.UTC(
            allDataIndex
              ? MunicipalityData.allData.grantDistributed.pointStartYear
              : selectedMunicipality.dashboard.grantDistributed.pointStartYear,
            allDataIndex
              ? MunicipalityData.allData.grantDistributed.pointStartMonth
              : selectedMunicipality.dashboard.grantDistributed.pointStartMonth
          ),
          pointIntervalUnit: "month",
          marker: {
            symbol: "circle",
          },
        },
      },

      ...(allDataIndex
        ? MunicipalityData.allData.grantDistributed.chart
        : selectedMunicipality.dashboard.grantDistributed.chart),
    };

    const gender = {
      ...genderStyle,
      series: [
        {
          data: [
            {
              y: allDataIndex
                ? MunicipalityData.allData.gender.femalePercentage
                : selectedMunicipality.dashboard.gender.femalePercentage,
            },
            {
              y: allDataIndex
                ? MunicipalityData.allData.gender.malePercentage
                : selectedMunicipality.dashboard.gender.malePercentage,
            },
          ],
        },
      ],
    };

    const ethinicity = {
      ...ethinicityStyle,

      series: allDataIndex
        ? MunicipalityData.allData.ethinicity
        : selectedMunicipality.dashboard.ethinicity,
    };

    const youthReached = {
      ...pieChartDataStyle,
      series: [
        {
          minPointSize: 10,
          innerSize: "30%",
          zMin: 0,
          borderRadius: 5,
          name: "Youth Reached",
          data: [
            {
              name: "Target Remaininng",
              y: allDataIndex
                ? MunicipalityData.allData.youthReached.target
                : selectedMunicipality.dashboard.youthReached.target,
              z: 0,
              color: "#5abdc159",
            },
            {
              name: "Target Meet",
              y: allDataIndex
                ? MunicipalityData.allData.youthReached.reached
                : selectedMunicipality.dashboard.youthReached.reached,
              z: 0,
              color: "#5abdc1",
            },
          ],
          dataLabels: {
            enabled: false,
          },
        },
      ],
    };

    const studentReached = {
      ...pieChartDataStyle,
      series: [
        {
          minPointSize: 10,
          innerSize: "30%",
          zMin: 0,
          borderRadius: 5,
          name: "Student Reached",
          data: [
            {
              name: "Target Remaininng",
              y: allDataIndex
                ? MunicipalityData.allData.studentReached.target
                : selectedMunicipality.dashboard.studentReached.target,
              z: 0,
              color: "#DD574659",
            },
            {
              name: "Target Meet",
              y: allDataIndex
                ? MunicipalityData.allData.studentReached.reached
                : selectedMunicipality.dashboard.studentReached.reached,
              z: 0,
              color: "#DD5746",
            },
          ],
          dataLabels: {
            enabled: false,
          },
        },
      ],
    };

    const wasteWorkers = {
      ...wasteWorkerStyle,

      series: allDataIndex
        ? MunicipalityData.allData.wasteWorker.chart
        : selectedMunicipality.dashboard.wasteWorker.chart,
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
                <Grid item xs={12} md={8}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ display: "block" }}
                  >
                    <div>
                      <div className={componentStyle.chart_title}>
                        <h6>
                          {MunicipalityData.allData.grantDistributed.title}
                        </h6>
                      </div>

                      <HighchartsReact
                        highcharts={Highcharts}
                        options={grantDistributed}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={4}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ height: "307px" }}
                  >
                    <div className={componentStyle.numbers}>
                      <img
                        src={MunicipalityData.allData.plasticCollected.icon}
                        alt=""
                      />
                      <h2>{MunicipalityData.allData.plasticCollected.count}</h2>
                      <p>{MunicipalityData.allData.plasticCollected.unit}</p>
                      <h6>{MunicipalityData.allData.plasticCollected.title}</h6>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={8}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ display: "block" }}
                  >
                    <div>
                      <div className={componentStyle.chart_title}>
                        <h6>Total Number of People Reached</h6>
                      </div>

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={gender}
                          />

                          <Grid container>
                            <Grid item xs={6} md={6}>
                              <div className={componentStyle.genderText}>
                                <h2>
                                  {MunicipalityData.allData.gender.femaleNum}
                                </h2>
                                <p>Female</p>
                              </div>
                            </Grid>

                            <Grid item xs={6} md={6}>
                              <div className={componentStyle.genderText}>
                                <h2>
                                  {MunicipalityData.allData.gender.maleNum}
                                </h2>
                                <p>Male</p>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <label>Ethinicity</label>
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={ethinicity}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={4}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ display: "block" }}
                  >
                    <div className={componentStyle.chart_title}>
                      <h6>{MunicipalityData.allData.youthReached.title}</h6>
                    </div>

                    <div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={youthReached}
                      />

                      <div
                        className={componentStyle.chart_title}
                        style={{ textAlign: "center" }}
                      >
                        <h2>{MunicipalityData.allData.youthReached.reached}</h2>
                        <h6>
                          {MunicipalityData.allData.youthReached.countTitle}
                        </h6>
                      </div>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={4}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ height: "130px" }}
                  >
                    <div className={componentStyle.numbers}>
                      <h2>{MunicipalityData.allData.campaigns.count}</h2>
                      <h6>{MunicipalityData.allData.campaigns.title}</h6>
                    </div>
                  </div>

                  <div
                    className={componentStyle.chart_card}
                    style={{ height: "130px" }}
                  >
                    <div className={componentStyle.numbers}>
                      <h2>{MunicipalityData.allData.tagMePoints.count}</h2>
                      <h6>{MunicipalityData.allData.tagMePoints.title}</h6>
                    </div>
                  </div>

                  <div
                    className={componentStyle.chart_card}
                    style={{ height: "130px" }}
                  >
                    <div className={componentStyle.numbers}>
                      <h2>
                        {MunicipalityData.allData.govermentOfficial.count}
                      </h2>
                      <h6>
                        {MunicipalityData.allData.govermentOfficial.title}
                      </h6>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={4}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ display: "block" }}
                  >
                    <div className={componentStyle.chart_title}>
                      <h6>{MunicipalityData.allData.studentReached.title}</h6>
                    </div>

                    <div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={studentReached}
                      />

                      <div
                        className={componentStyle.chart_title}
                        style={{ textAlign: "center" }}
                      >
                        <h2>
                          {MunicipalityData.allData.studentReached.reached}
                        </h2>
                        <h6>
                          {MunicipalityData.allData.studentReached.countTitle}
                        </h6>
                      </div>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={4}>
                  <div
                    className={componentStyle.chart_card}
                    style={{ display: "block" }}
                  >
                    <div className={componentStyle.chart_title}>
                      <h6>{MunicipalityData.allData.wasteWorker.title}</h6>
                    </div>

                    <div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={wasteWorkers}
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
              <div className={componentStyle.chart_data}>
                <Grid container columnSpacing={2}>
                  <Grid item xs={12} md={8}>
                    <div
                      className={componentStyle.chart_card}
                      style={{ display: "block" }}
                    >
                      <div>
                        <div className={componentStyle.chart_title}>
                          <h6>
                            {
                              selectedMunicipality.dashboard.grantDistributed
                                .title
                            }
                          </h6>
                        </div>

                        <HighchartsReact
                          highcharts={Highcharts}
                          options={grantDistributed}
                        />
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <div
                      className={componentStyle.chart_card}
                      style={{ height: "307px" }}
                    >
                      <div className={componentStyle.numbers}>
                        <img
                          src={
                            selectedMunicipality.dashboard.plasticCollected.icon
                          }
                          alt=""
                        />
                        <h2>
                          {
                            selectedMunicipality.dashboard.plasticCollected
                              .count
                          }
                        </h2>
                        <p>
                          {selectedMunicipality.dashboard.plasticCollected.unit}
                        </p>
                        <h6>
                          {
                            selectedMunicipality.dashboard.plasticCollected
                              .title
                          }
                        </h6>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <div
                      className={componentStyle.chart_card}
                      style={{ display: "block" }}
                    >
                      <div>
                        <div className={componentStyle.chart_title}>
                          <h6>Total Number of People Reached</h6>
                        </div>

                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={gender}
                            />

                            <Grid container>
                              <Grid item xs={6} md={6}>
                                <div className={componentStyle.genderText}>
                                  <h2>
                                    {
                                      selectedMunicipality.dashboard.gender
                                        .femaleNum
                                    }
                                  </h2>
                                  <p>Female</p>
                                </div>
                              </Grid>

                              <Grid item xs={6} md={6}>
                                <div className={componentStyle.genderText}>
                                  <h2>
                                    {
                                      selectedMunicipality.dashboard.gender
                                        .maleNum
                                    }
                                  </h2>
                                  <p>Male</p>
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <label>Ethinicity</label>
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={ethinicity}
                            />
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <div
                      className={componentStyle.chart_card}
                      style={{ display: "block" }}
                    >
                      <div className={componentStyle.chart_title}>
                        <h6>
                          {selectedMunicipality.dashboard.youthReached.title}
                        </h6>
                      </div>

                      <div>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={youthReached}
                        />

                        <div
                          className={componentStyle.chart_title}
                          style={{ textAlign: "center" }}
                        >
                          <h2>
                            {
                              selectedMunicipality.dashboard.youthReached
                                .reached
                            }
                          </h2>
                          <h6>
                            {
                              selectedMunicipality.dashboard.youthReached
                                .countTitle
                            }
                          </h6>
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <div
                      className={componentStyle.chart_card}
                      style={{ height: "130px" }}
                    >
                      <div className={componentStyle.numbers}>
                        <h2>
                          {selectedMunicipality.dashboard.campaigns.count}
                        </h2>
                        <h6>
                          {selectedMunicipality.dashboard.campaigns.title}
                        </h6>
                      </div>
                    </div>

                    <div
                      className={componentStyle.chart_card}
                      style={{ height: "130px" }}
                    >
                      <div className={componentStyle.numbers}>
                        <h2>
                          {selectedMunicipality.dashboard.tagMePoints.count}
                        </h2>
                        <h6>
                          {selectedMunicipality.dashboard.tagMePoints.title}
                        </h6>
                      </div>
                    </div>

                    <div
                      className={componentStyle.chart_card}
                      style={{ height: "130px" }}
                    >
                      <div className={componentStyle.numbers}>
                        <h2>
                          {
                            selectedMunicipality.dashboard.govermentOfficial
                              .count
                          }
                        </h2>
                        <h6>
                          {
                            selectedMunicipality.dashboard.govermentOfficial
                              .title
                          }
                        </h6>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <div
                      className={componentStyle.chart_card}
                      style={{ display: "block" }}
                    >
                      <div className={componentStyle.chart_title}>
                        <h6>
                          {selectedMunicipality.dashboard.studentReached.title}
                        </h6>
                      </div>

                      <div>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={studentReached}
                        />

                        <div
                          className={componentStyle.chart_title}
                          style={{ textAlign: "center" }}
                        >
                          <h2>
                            {
                              selectedMunicipality.dashboard.studentReached
                                .reached
                            }
                          </h2>
                          <h6>
                            {
                              selectedMunicipality.dashboard.studentReached
                                .countTitle
                            }
                          </h6>
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <div
                      className={componentStyle.chart_card}
                      style={{ display: "block" }}
                    >
                      <div className={componentStyle.chart_title}>
                        <h6>
                          {selectedMunicipality.dashboard.wasteWorker.title}
                        </h6>
                      </div>

                      <div>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={wasteWorkers}
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
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
          <p>Filter Data</p>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              label="Select year"
              onChange={handleChange}
            >
              <MenuItem value={0}>See All</MenuItem>

              <MenuItem value={1}>First Year</MenuItem>
              <MenuItem value={2}>Second Year</MenuItem>
              <MenuItem value={3}>Third Year</MenuItem>
            </Select>
          </FormControl>
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
                <h6>Overall Dashboard</h6>
              </div>
            </li>
            {MunicipalityFilter.map((val, index) => {
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
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  const pins = MunicipalityFilter.map((city, index) => (
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
            mapStyle="mapbox://styles/yogeshkarki/clvjq9l5v01ci01qp0oczhfgy"
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
