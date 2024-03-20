import React, { useState, useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hook";

import componentStyle from "@/styles/component.module.scss";

import NepalDisrticts from "./data/NepalDisrticts.json";
import FilterMunicipalities from "./data/filter-municipalities.json";

import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { Source, Layer } from "react-map-gl";

import { Container, Grid } from "@mui/material";

const MapComponent = () => {
  const mapRef = useRef(null);

  const [municipalityIndex, setMunicipalityIndex] = useState(false);

  const mapStyleLine = {
    id: "map_style",
    type: "line",
    layout: {},
    paint: {
      "line-color": "#5e5959",
      "line-width": 1.2,
    },
  };

  const municipalityStyleLine = {
    id: "municipalityMap",
    type: "line",
    layout: {},
    paint: {
      "line-color": "#5e5959",
      "line-width": 1.2,
    },
  };

  const [mapdata, setMMapData] = useState(NepalDisrticts);
  const [initialZoom, setInitialZoom] = useState(6.3);

  mapboxgl.accessToken =
    "pk.eyJ1IjoieW9nZXNoa2Fya2kiLCJhIjoiY2txZXphNHNlMGNybDJ1cXVmeXFiZzB1eSJ9.A7dJUR4ppKJDKWZypF_0lA";

  const [viewport, setViewport] = useState({
    latitude: 28.3534542,
    longitude: 84.0835325,
    minZoom: 6.3,
    maxZoom: 20,
  });

  const mapFlyTO = () => {
    setMunicipalityIndex(!municipalityIndex);
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      if (map) {
        map.flyTo({
          center: [83.5418406, 27.609831],
          zoom: 10,
        });
      }
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <div className="map-container">
          <button onClick={mapFlyTO}>Fly To</button>
          <ReactMapGL
            {...viewport}
            ref={mapRef}
            classList={componentStyle.map}
            mapboxAccessToken={mapboxgl.accessToken}
            mapStyle="mapbox://styles/yogeshkarki/cltpp0ybj00u201pkcor06ylg"
            onMove={(evt) => setViewport(evt.viewport)}
          >
            <Source id="nepalMap" type="geojson" data={mapdata}>
              <Layer {...mapStyleLine} />
            </Source>

            {municipalityIndex ? (
              <Source
                id="municipalityMap"
                type="geojson"
                data={FilterMunicipalities}
              >
                <Layer {...municipalityStyleLine} />
              </Source>
            ) : (
              ""
            )}
          </ReactMapGL>
        </div>
      </Container>
    </>
  );
};

export default MapComponent;
