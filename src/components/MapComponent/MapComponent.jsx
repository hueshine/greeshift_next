import React, { useState, useRef, useMemo, useEffect } from "react";
import { useIsomorphicLayoutEffect } from "@/hook";

import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import componentStyle from "@/styles/component.module.scss";

import NepalDisrticts from "./data/NepalDisrticts.json";
import MunicipalityData from "./data/data.json";

import Map, { Marker } from "react-map-gl";
import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Drawer from "@mui/material/Drawer";

import { Source, Layer } from "react-map-gl";

const MapComponent = () => {
  const [open, setOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);

  const [municipality, setMunicipality] = React.useState("");

  mapboxgl.accessToken =
    "pk.eyJ1IjoieW9nZXNoa2Fya2kiLCJhIjoiY2txZXphNHNlMGNybDJ1cXVmeXFiZzB1eSJ9.A7dJUR4ppKJDKWZypF_0lA";

  const mapStyleLine = {
    id: "map_style",
    type: "line",
    layout: {},
    paint: {
      "line-color": "#5e5959",
      "line-width": 1.2,
    },
  };

  const closeDrawer = () => {
    setMunicipality("Select Municipality");
    setOpen(false);
    setPopupInfo(null);
  };

  const handleChange = (event) => {
    setMunicipality(event.target.value);

    let selected = event.target.value;

    const filterData = MunicipalityData.filter(
      (data) => data.municipality == selected
    );

    console.log(filterData[0]);

    setOpen(true);
    setPopupInfo(filterData[0]);
  };

  useIsomorphicLayoutEffect(() => {
    console.log(popupInfo && popupInfo.municipality);
  }, [popupInfo]);

  const [viewport, setViewport] = useState({
    latitude: 28.3534542,
    longitude: 84.0835325,
    minZoom: 6.6,
    maxZoom: 6.6,
  });

  const pins = MunicipalityData.map((city, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={city.longitude}
      latitude={city.latitude}
      onClick={(e) => {
        setOpen(true);
        setPopupInfo(city);
      }}
    >
      <img src="./pin.png" alt="" className={componentStyle.map_pin} />
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

          <ul>
            <li>
              <strong>Climate Fellows </strong>: 0
            </li>
            <li>
              <strong>Young People Reached </strong>: 1
            </li>
            <li>
              <strong>Government Representatives Oriented </strong>: 0
            </li>
            <li>
              <strong>Point Data Collected </strong>: 0
            </li>
            <li>
              <strong>Community People Reached </strong>: 0
            </li>
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );
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

      <Map
        {...viewport}
        classList={componentStyle.map}
        mapboxAccessToken={mapboxgl.accessToken}
        dragPan={false}
        mapStyle="mapbox://styles/yogeshkarki/cltppcq79000601qz3rkz2ogc"
      >
        {pins}

        <Source id="nepalMap" type="geojson" data={NepalDisrticts}>
          <Layer {...mapStyleLine} />
        </Source>
      </Map>

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