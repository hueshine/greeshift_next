import React, { useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hook";

import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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

const MapComponent = () => {
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

  const provinceLabelStyle = {
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
    },
  };

  const handleChange = (event) => {
    setMunicipality(event.target.value);

    let selected = event.target.value;

    const filterData = MunicipalityData.filter(
      (data) => data.municipality == selected
    );

    setClickedMarkerIndex(filterData[0].id - 1);

    setOpen(true);
    setPopupInfo(filterData[0]);
  };

  const [mapdata, setMMapData] = useState(NepalDisrticts);
  const [municipalitylabel, setmunicipalityLabel] = useState();

  const [municipality, setMunicipality] = useState("");

  let [clickedMarkerIndex, setClickedMarkerIndex] = useState(null);

  mapboxgl.accessToken =
    "pk.eyJ1IjoieW9nZXNoa2Fya2kiLCJhIjoiY2txZXphNHNlMGNybDJ1cXVmeXFiZzB1eSJ9.A7dJUR4ppKJDKWZypF_0lA";

  const [viewport, setViewport] = useState({
    latitude: 28.3534542,
    longitude: 84.0835325,
    minZoom: 6.3,
    maxZoom: 6.3,
  });

  const flyToMuni = (lng, lat) => {
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: lng,
      zoom: 10,
      maxZoom: 10,
      transitionDuration: 5000, // duration of the fly animation in milliseconds
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
        setClickedMarkerIndex(index);
        flyToMuni(city.longitude, city.latitude);
        setMMapData(FilterMunicipalities);
        setmunicipalityLabel(MunicipalityLabelData);
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

          <ul class={componentStyle.list}>
            <li>
              <div className={componentStyle.flex}>
                <span>Climate Fellows :</span>
                <strong>2</strong>
              </div>
            </li>
            <li>
              <div className={componentStyle.flex}>
                <span>Young People Reached : </span>
                <strong>1</strong>
              </div>
            </li>
            <li>
              <div className={componentStyle.flex}>
                <span>Government Representatives Oriented : </span>
                <strong>0</strong>
              </div>
            </li>
            <li>
              <div className={componentStyle.flex}>
                <span>Point Data Collected : </span>
                <strong>0</strong>
              </div>
            </li>
            <li>
              <div className={componentStyle.flex}>
                <span>Community People Reached : </span>
                <strong>0</strong>
              </div>
            </li>
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );

  const closeDrawer = () => {
    setClickedMarkerIndex(null);
    setMunicipality("Select Municipality");

    setMMapData(NepalDisrticts);
    setOpen(false);
    setPopupInfo(null);

    setViewport({
      ...viewport,
      latitude: 28.3534542,
      longitude: 84.0835325,
      zoom: 6.3,
    });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ width: 320 }} style={{ margin: "40px auto" }}>
          <FormControl fullWidth>
            <InputLabel id="select-municipality">
              Select Municipality
            </InputLabel>
            <Select
              labelId="select-municipality"
              id="select-municipality-select"
              value={municipality}
              label="Select Municipality"
              onChange={handleChange}
            >
              {MunicipalityData.map((val, index) => {
                return (
                  <MenuItem value={val.municipality} key={index}>
                    {val.municipality}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Container>

      <div className="map-container">
        <ReactMapGL
          {...viewport}
          classList={componentStyle.map}
          mapboxAccessToken={mapboxgl.accessToken}
          mapStyle="mapbox://styles/yogeshkarki/cltpp0ybj00u201pkcor06ylg"
          interactiveTool={{
            dragPan: false,
            dragRotate: false,
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
            <Layer {...provinceLabelStyle} />
          </Source>
        </ReactMapGL>
      </div>

      <Drawer
        open={open}
        onClose={closeDrawer}
        classList={componentStyle.drawer}
        anchor="right"
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default MapComponent;
