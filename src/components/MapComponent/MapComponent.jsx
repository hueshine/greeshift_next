import React, { useState, useRef, useCallback, useEffect } from "react";

import componentStyle from "./dashboard.module.scss";

import { useIsomorphicLayoutEffect } from "@/hook";

import { Container, Grid } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { Marker, Map, Source, Layer, Popup } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import NepalMap from "./data/MapOfNepal.json";
import MunicipalityMap from "./data/MapOfMunicipalities.json";
import BagmatiMap from "./data/Bagmati.json";
import MadeshMap from "./data/Madesh.json";
import LumbiniMap from "./data/Lumbini.json";

import {
  mapStyleLine,
  bagmatiMapFill,
  madeshMapFill,
  lumbiniMapFill,
  viewportCommon,
  mapStyleFill,
} from "./styles";

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
import { useRouter } from "next/router";

if (typeof Highcharts === "object") {
  HighchartsMore(Highcharts);
  HighchartsSolidGauge(Highcharts);
  HighchartsPictorial(Highcharts);
}

const MapComponent = ({ mapData, mapText }) => {
  const router = useRouter();
  let lang = router.locale;

  let MunicipalityData = mapData;
  const imageUrl = `https://www.app.greenshift.creasion.org/storage`;

  const mapRef = useRef(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [initialZoomValue, setInitialZoomValue] = useState(null);
  const [dataBoxIndex, setDataBoxIndex] = useState(false);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [allDataIndex, setAllDataIndex] = useState(false);
  const [MunicipalityFilter, setMunicipalityFilter] = useState(
    MunicipalityData.siteData
  );

  mapboxgl.accessToken =
    "process.env.NEXT_PUBLIC_MAPBOX_TOKEN";

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

    const studentGender = {
      ...genderStyle,
      series: [
        {
          data: [
            {
              y: allDataIndex
                ? MunicipalityData.allData.studentReached.femalePercentage
                : selectedMunicipality.dashboard.studentReached
                    .femalePercentage,
            },
            {
              y: allDataIndex
                ? MunicipalityData.allData.studentReached.malePercentage
                : selectedMunicipality.dashboard.studentReached.malePercentage,
            },
          ],
        },
      ],
    };

    const ethinicity = {
      ...ethinicityStyle,

      series: [
        {
          minPointSize: 10,
          innerSize: "30%",
          zMin: 0,
          borderRadius: 2,
          name: allDataIndex
            ? MunicipalityData.allData.dashboard.ethnicity.title
            : selectedMunicipality.dashboard.ethnicity.title,

          data: allDataIndex
            ? MunicipalityData.allData.dashboard.ethnicity.data
            : selectedMunicipality.dashboard.ethnicity.data,
        },
      ],
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
        <div className={componentStyle.data_title}>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item sm={7}>
              <h5>{selectedMunicipality.title}</h5>
              <h6>{selectedMunicipality.description}</h6>
              <p>
                Last Updated{" "}
                {selectedMunicipality.last_updated_at.split("T")[0]}
              </p>
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
                        {selectedMunicipality.dashboard.grantDistributed.title}
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
                  style={{ display: "block" }}
                >
                  <div className={componentStyle.chart_title}>
                    <h6>{selectedMunicipality.dashboard.youthReached.title}</h6>
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
                        {selectedMunicipality.dashboard.youthReached.reached}
                      </h2>
                      <h6>
                        {selectedMunicipality.dashboard.youthReached.countTitle}
                      </h6>
                    </div>
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
                      <h6>Total Number of Community People Reached</h6>
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
                                {selectedMunicipality.dashboard.gender.maleNum}
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
                  style={{ height: "407px" }}
                >
                  <div className={componentStyle.numbers}>
                    <img
                      src={`${imageUrl}/${selectedMunicipality.dashboard.plasticCollected.icon}`}
                      alt=""
                    />
                    <h2>
                      {selectedMunicipality.dashboard.plasticCollected.count}
                    </h2>
                    <p>
                      {selectedMunicipality.dashboard.plasticCollected.unit}
                    </p>
                    <h6>
                      {selectedMunicipality.dashboard.plasticCollected.title}
                    </h6>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <div
                  className={componentStyle.chart_card}
                  style={{ height: "185px" }}
                >
                  <div className={componentStyle.numbers}>
                    <img
                      src={`${imageUrl}/${selectedMunicipality.dashboard.communityAwareness.icon}`}
                      alt=""
                    />
                    <h2>
                      {selectedMunicipality.dashboard.communityAwareness.count}
                    </h2>
                    <h6>
                      {selectedMunicipality.dashboard.communityAwareness.title}
                    </h6>
                  </div>
                </div>

                <div
                  className={componentStyle.chart_card}
                  style={{ height: "200px" }}
                >
                  <div className={componentStyle.numbers}>
                    <img
                      src={`${imageUrl}/${selectedMunicipality.dashboard.eventsConducted.icon}`}
                      alt=""
                    />
                    <h2>
                      {selectedMunicipality.dashboard.eventsConducted.count}
                    </h2>
                    <h6>
                      {selectedMunicipality.dashboard.eventsConducted.title}
                    </h6>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} md={8}>
                <div
                  className={componentStyle.chart_card}
                  style={{ display: "block" }}
                >
                  <Grid container spacing={0}>
                    <Grid item md={7} xs={12}>
                      <div>
                        <div className={componentStyle.chart_title}>
                          <h6>
                            {
                              selectedMunicipality.dashboard.studentReached
                                .title
                            }
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

                    <Grid item md={5} xs={12}>
                      <div style={{ marginTop: "60px" }}>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={studentGender}
                        />

                        <Grid container>
                          <Grid item xs={6} md={6}>
                            <div className={componentStyle.genderText}>
                              <h2>
                                {
                                  selectedMunicipality.dashboard.studentReached
                                    .femaleNumber
                                }
                              </h2>
                              <p>Female</p>
                            </div>
                          </Grid>

                          <Grid item xs={6} md={6}>
                            <div className={componentStyle.genderText}>
                              <h2>
                                {
                                  selectedMunicipality.dashboard.studentReached
                                    .maleNumber
                                }
                              </h2>
                              <p>Male</p>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <div
                  className={componentStyle.chart_card}
                  style={{ height: "160px" }}
                >
                  <div className={componentStyle.numbers}>
                    <h2>{selectedMunicipality.dashboard.campaign.count}</h2>
                    <h6>{selectedMunicipality.dashboard.campaign.title}</h6>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <div
                  className={componentStyle.chart_card}
                  style={{ height: "160px" }}
                >
                  <div className={componentStyle.numbers}>
                    <h2>{selectedMunicipality.dashboard.tagMePoints.count}</h2>
                    <h6>{selectedMunicipality.dashboard.tagMePoints.title}</h6>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div
                  className={componentStyle.chart_card}
                  style={{ height: "160px" }}
                >
                  <div className={componentStyle.numbers}>
                    <h2>
                      {selectedMunicipality.dashboard.govermentOfficial.count}
                    </h2>
                    <h6>
                      {selectedMunicipality.dashboard.govermentOfficial.title}
                    </h6>
                  </div>
                </div>
              </Grid>

              {/* <Grid item xs={12} md={4}>
                <div
                  className={componentStyle.chart_card}
                  style={{ display: "block" }}
                >
                  <div className={componentStyle.chart_title}>
                    <h6>{selectedMunicipality.dashboard.wasteWorker.title}</h6>
                  </div>

                  <div>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={wasteWorkers}
                    />
                  </div>
                </div>
              </Grid> */}
            </Grid>
          </div>
        </div>
      </>
    );
  };

  let SideBarInitial = () => {
    return (
      <div className={componentStyle.initial}>
        <h3 className={componentStyle.mb_title}>Project Areas</h3>

        <div className={componentStyle.muniCard_wrap}>
          {MunicipalityFilter.map((val, index) => {
            return (
              <div
                className={componentStyle.muniCard}
                key={index}
                onClick={(e) => {
                  setDataBoxIndex(true);
                  setAllDataIndex(false);
                  setSelectedMunicipality(val);
                  whereFly(val);
                }}
              >
                <div className={componentStyle.muniCard_img}>
                  <img src={`${imageUrl}/${val.image}`} alt="" />
                </div>

                <div className={componentStyle.muniCard_text}>
                  <h5>{val.title}</h5>
                  <p>
                    <span>Project Area:</span>
                    {val.description}
                  </p>

                  {val.plasticWasteCollected ? (
                    <p>
                      <span>Plastic Waste Collected:</span>
                      {val.plasticWasteCollected}
                    </p>
                  ) : (
                    ""
                  )}

                  {val.grantDistributed ? (
                    <p>
                      <span>Grant Distributed:</span>
                      {val.grantDistributed}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

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

  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  return (
    <section className={componentStyle.map_section}>
      <div className={componentStyle.map_container}>
        {initialZoomValue ? (
          <Map
            initialViewState={viewportXl}
            mapStyle="mapbox://styles/yogeshkarki/clw91skcb003s01qrdck13ilv"
            mapboxAccessToken={mapboxgl.accessToken}
            attributionControl={false}
            ref={mapRef}
            interactiveLayerIds={["municipalityMap-layer"]}
            onMouseMove={onHover}
            style={{ width: "100%", height: "100%" }}
          >
            <Source id="nepalMap" type="geojson" data={NepalMap}>
              <Layer {...mapStyleLine} />
            </Source>

            {selectedMunicipality ? (
              <>
                {["Madesh", "Bagmati", "Lumbini"].map((region) =>
                  selectedMunicipality.municipality === region ? (
                    <Source
                      key={`${region.toLowerCase()}Map-selected`}
                      id={`${region.toLowerCase()}Map`}
                      type="geojson"
                      data={
                        region === "Madesh"
                          ? MadeshMap
                          : region === "Bagmati"
                          ? BagmatiMap
                          : LumbiniMap
                      }
                    >
                      <Layer
                        {...(region === "Madesh"
                          ? madeshMapFill
                          : region === "Bagmati"
                          ? bagmatiMapFill
                          : lumbiniMapFill)}
                      />
                    </Source>
                  ) : null
                )}

                <Source
                  key="municipalityMap-selected"
                  id="municipalityMap"
                  type="geojson"
                  data={MunicipalityMap}
                >
                  <Layer id="municipalityMap-layer" {...mapStyleFill} />
                </Source>
              </>
            ) : (
              <>
                <Source
                  key="bagmatiMap-default"
                  id="bagmatiMap"
                  type="geojson"
                  data={BagmatiMap}
                >
                  <Layer {...bagmatiMapFill} />
                </Source>

                <Source
                  key="madeshMap-default"
                  id="madeshMap"
                  type="geojson"
                  data={MadeshMap}
                >
                  <Layer {...madeshMapFill} />
                </Source>

                <Source
                  key="lumbiniMap-default"
                  id="lumbiniMap"
                  type="geojson"
                  data={LumbiniMap}
                >
                  <Layer {...lumbiniMapFill} />
                </Source>

                <Source
                  key="municipalityMap"
                  id="municipalityMap"
                  type="geojson"
                  data={MunicipalityMap}
                >
                  <Layer id="municipalityMap-layer" {...mapStyleFill} />
                </Source>
              </>
            )}

            {hoverInfo && (
              <div
                className="tooltips"
                style={{
                  position: "absolute",
                  left: hoverInfo.x,
                  top: hoverInfo.y,
                  background: "#20617B",
                  color: "#fff",
                  padding: "8px 15px",
                  border: "1px solid #fff",
                  borderRadius: "4px",
                  fontSize: "16px",
                  zIndex: 1000,
                }}
              >
                {hoverInfo.feature.properties.NAME}
              </div>
            )}
          </Map>
        ) : (
          ""
        )}
      </div>

      <div className={componentStyle.map_info}>
        <div
          dangerouslySetInnerHTML={{
            __html:
              lang == "en"
                ? mapText.homepage.map_description
                : mapText.homepage.map_description_np,
          }}
        />
      </div>

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
