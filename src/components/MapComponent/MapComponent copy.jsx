import React, { useState, useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hook";

import { styled } from "@mui/material/styles";

import Drawer from "@mui/material/Drawer";

import componentStyle from "@/styles/component.module.scss";

import NepalDisrticts from "./data/NepalDisrticts.json";
import FilterMunicipalities from "./data/filter-municipalities.json";

import MunicipalityData from "./data/data.json";
import MunicipalityLabelData from "./data/MunicipalityLabel.json";

import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { Source, Layer } from "react-map-gl";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Container, Grid } from "@mui/material";

const MapComponent = () => {
  const mapRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);

  const mapStyleLine = {
    id: "map_style",
    type: "line",
    layout: {},
    paint: {
      "line-color": "#5e5959",
      "line-width": 1.2,
    },
  };

  const mapStyleFill = {};

  const [mapLabel, setMapLabel] = useState({
    id: "provinceLabel",
    type: "symbol",
    layout: {
      "text-allow-overlap": false,
      "text-field": ["get", "description"],
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.5,
      "text-justify": "auto",
      "text-size": 12,
    },
    paint: {
      "text-color": "#5e5959",
      // "text-opacity": 0,
    },
  });

  const [mapdata, setMMapData] = useState(NepalDisrticts);
  const [municipalitylabel, setmunicipalityLabel] = useState();
  const [initialZoom, setInitialZoom] = useState(6.3);

  const [municipality, setMunicipality] = useState("");

  let [clickedMarkerIndex, setClickedMarkerIndex] = useState(null);

  useIsomorphicLayoutEffect(() => {
    let windowInnerWidth = window.innerWidth;

    windowInnerWidth > 1700 ? setInitialZoom(6.3) : setInitialZoom(6.1);
  });

  mapboxgl.accessToken =
    "pk.eyJ1IjoieW9nZXNoa2Fya2kiLCJhIjoiY2txZXphNHNlMGNybDJ1cXVmeXFiZzB1eSJ9.A7dJUR4ppKJDKWZypF_0lA";

  const [viewport, setViewport] = useState({
    latitude: 28.3534542,
    longitude: 84.0835325,
    minZoom: initialZoom,
    maxZoom: initialZoom,
  });

  const flyToMuni = (lng, lat, zoomValue) => {
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: lng,
      zoom: zoomValue,
      maxZoom: zoomValue,
      transitionDuration: 12000, // duration of the fly animation in milliseconds
      transitionInterpolator: "flyTo",
      essential: true,
    });
  };

  const pins = MunicipalityData.map((city, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={city.longitude}
      latitude={city.latitude}
      onClick={(e) => {
        setOpen(true);
        setPopupInfo(city);
        setClickedMarkerIndex(true);
        flyToMuni(city.longitude, city.latitude, city.zoomValue);
        setMMapData(FilterMunicipalities);
        setmunicipalityLabel(MunicipalityLabelData);
        setMapLabel({
          ...mapLabel,
          paint: {
            "text-opacity": 1,
          },
        });
        console.log(clickedMarkerIndex, "marker");
      }}
    >
      <img
        src="./pin.png"
        alt=""
        className={`${componentStyle.map_pin} marker-pin ${
          clickedMarkerIndex ? "map-zoom" : ""
        }`}
      />
    </Marker>
  ));

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 7,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#3f7b93" : "#377087",
    },
  }));

  const DrawerList = (
    <div className={componentStyle.drawer_box}>
      {popupInfo ? (
        <>
          <div className={componentStyle.title}>
            <h4>{popupInfo.title}</h4>
            <img src={popupInfo.image} alt="" />
            <p>
              IMPLEMENTED BY
              <strong> Youth Innovation Lab Restless Development</strong>
            </p>

            <p>
              LOCATION
              <strong>{popupInfo.municipality}</strong>
            </p>
          </div>

          <ul className={componentStyle.list}>
            <li>
              <div className={componentStyle.flex}>
                <span>Climate Fellows :</span>
                <strong>2</strong>
              </div>

              <BorderLinearProgress variant="determinate" value={50} />
            </li>
            <li>
              <div className={componentStyle.flex}>
                <span>Young People Reached : </span>
                <strong>1</strong>
              </div>

              <BorderLinearProgress variant="determinate" value={10} />
            </li>
            <li>
              <div className={componentStyle.flex}>
                <span>Government Representatives Oriented : </span>
                <strong>0</strong>
              </div>

              <BorderLinearProgress variant="determinate" value={10} />
            </li>
            <li>
              <div className={componentStyle.flex}>
                <span>Point Data Collected : </span>
                <strong>0</strong>
              </div>
              <BorderLinearProgress variant="determinate" value={30} />
            </li>
            <li>
              <div className={componentStyle.flex}>
                <span>Community People Reached : </span>
                <strong>0</strong>
              </div>

              <BorderLinearProgress variant="determinate" value={60} />
            </li>
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );

  const closeDrawer = () => {
    setClickedMarkerIndex(false);
    setMunicipality("Select Municipality");

    setMMapData(NepalDisrticts);
    setOpen(false);
    setPopupInfo(null);
    setmunicipalityLabel(null);

    setViewport({
      ...viewport,
      latitude: 28.3534542,
      longitude: 84.0835325,
      zoom: initialZoom,
    });

    setMapLabel({
      ...mapLabel,
      paint: {
        "text-opacity": 0,
      },
    });
  };

  const flyToHandle = () => {
    setViewport({
      latitude: 27.609831,
      longitude: 83.5418406,
      zoom: 10,
      maxZoom: 20,
      transitionDuration: 22000, // duration of the fly animation in milliseconds
      transitionInterpolator: "flyTo",
      essential: true,
    });

    console.log(mapRef.current.getMap());

    const map = mapRef.current.getMap();

    if (map) {
      map.flyTo({
        center: [83.5418406, 27.609831],
        zoom: 10, // Optionally specify zoom level
        // Additional options can be specified here
      });
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <div className="map-container">
          <button onClick={flyToHandle}>Fly To</button>
          <ReactMapGL
            {...viewport}
            ref={mapRef}
            classList={componentStyle.map}
            mapboxAccessToken={mapboxgl.accessToken}
            mapStyle="mapbox://styles/yogeshkarki/cltpp0ybj00u201pkcor06ylg"
            interactiveTool={{
              dragPan: false,
            }}
          >
            {pins}

            <Source id="nepalMap" type="geojson" data={mapdata}>
              <Layer {...mapStyleLine} />
            </Source>

            <Source
              id="municipalityLabel"
              type="geojson"
              data={municipalitylabel}
            >
              <Layer {...mapLabel} />
            </Source>
          </ReactMapGL>
        </div>
        <Grid
          container
          spacing={4}
          className={componentStyle.map_facts_wrapper}
        >
          <Grid item md={4}>
            <div className={componentStyle.map_facts}>
              <div className={componentStyle.map_facts_title}>
                <h5>Bagmati</h5>
                <small>Implemented Municipalities</small>
                <p>Lalitpur, Bharatpur, Ichchhakamana</p>
              </div>
              <div className={componentStyle.map_facts_detail}>
                {/* <p>Fund Allocated: 10K USD</p>
                <p>Fund Spent: 1.5K USD</p> */}
              </div>
            </div>
          </Grid>

          <Grid item md={4}>
            <div className={componentStyle.map_facts}>
              <div className={componentStyle.map_facts_title}>
                <h5>Lumbini </h5>
                <small>Implemented Municipalities</small>
                <p>Lalitpur, Bharatpur, Ichchhakamana</p>
              </div>
              <div className={componentStyle.map_facts_detail}>
                {/* <p>Fund Allocated: 10K USD</p>
                <p>Fund Spent: 1.5K USD</p> */}
              </div>
            </div>
          </Grid>

          <Grid item md={4}>
            <div className={componentStyle.map_facts}>
              <div className={componentStyle.map_facts_title}>
                <h5>Madhesh</h5>
                <small>Implemented Municipalities</small>
                <p>Lalitpur, Bharatpur, Ichchhakamana</p>
              </div>
              <div className={componentStyle.map_facts_detail}>
                {/* <p>Fund Allocated: 10K USD</p>
                <p>Fund Spent: 1.5K USD</p> */}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Drawer
        open={open}
        onClose={closeDrawer}
        classList={componentStyle.drawer}
        anchor="right"
        BackdropProps={{
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.01)", // Your custom backdrop color
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default MapComponent;
