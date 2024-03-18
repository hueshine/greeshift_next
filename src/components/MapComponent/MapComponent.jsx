import React, { useState} from "react";
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

import Map, { FlyToInterpolator , Marker } from "react-map-gl";
import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Drawer from "@mui/material/Drawer";
import LinearProgress from '@mui/material/LinearProgress';

import { Source, Layer } from "react-map-gl";

const MapComponent = () => {
  const [open, setOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);

  const [municipality, setMunicipality] = useState("");

  let [clickedMarkerIndex, setClickedMarkerIndex] = useState(null);

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
    setClickedMarkerIndex(null);
    setMunicipality("Select Municipality");
    setOpen(false);
    setPopupInfo(null);

    setViewport({
      ...viewport,
      latitude: 28.3534542,
      longitude: 84.0835325,
      zoom: 6.6
    });
  };

  const handleChange = (event) => {



    setMunicipality(event.target.value);

    let selected = event.target.value;

    const filterData = MunicipalityData.filter(
      (data) => data.municipality == selected
    );
    
    setClickedMarkerIndex(filterData[0].id -1 );


    setOpen(true);
    setPopupInfo(filterData[0]);
  };

  const [viewport, setViewport] = useState({
    latitude: 28.3534542,
    longitude: 84.0835325,
    zoom: 6.6
  
  });

  const flyToMuni = (lng ,lat) => {
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: lng,
      zoom: 8,
      transitionDuration: 5000, // duration of the fly animation in milliseconds
      transitionInterpolator: 'flyTo', 
    });
  }

  const pins = MunicipalityData.map((city, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={city.longitude}
      latitude={city.latitude}
      onClick={(e) => {
        setOpen(true);
        setPopupInfo(city);
        setClickedMarkerIndex(index);
        flyToMuni(city.longitude, city.latitude )
      }}
    >
      <img
        src="./pin.png"
        alt=""
        className={`${componentStyle.map_pin} marker-pin ${
          clickedMarkerIndex === index ? "hover-active" : ""
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

          <ul class={componentStyle.list} >
            <li>
            
              <span>Climate Fellows :</span><strong>2</strong>
            </li>
            <li>
              <span>Young People Reached : </span><strong>1</strong>
            </li>
            <li>
              <span>Government Representatives Oriented : </span><strong>0</strong>
            </li>
            <li>
              <span>Point Data Collected : </span><strong>0</strong>
            </li>
            <li>
              <span>Community People Reached : </span><strong>0</strong>
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
                  <MenuItem value={val.municipality}  key={index}>
                    {val.municipality}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Container>

      <div className="map-container">
        <Map
          {...viewport}
          classList={componentStyle.map}
          mapboxAccessToken={mapboxgl.accessToken}
          mapStyle="mapbox://styles/yogeshkarki/cl09du53z009w14ro850lmz4z"
        >
          {pins}

          <Source id="nepalMap" type="geojson" data={NepalDisrticts}>
            <Layer {...mapStyleLine} />
          </Source>
        </Map>
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
