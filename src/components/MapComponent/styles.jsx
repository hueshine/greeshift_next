import { styled } from "@mui/material/styles";

const mapStyleLine = {
  id: "map_style",
  type: "line",
  layout: {},
  paint: {
    "line-color": "#ffffff",
    "line-width": 1,
    "line-opacity": 0.7,
  },
};

const bagmatiMapFill = {
  id: "bagmatiMap",
  type: "fill",
  layout: {},
  paint: {
    "fill-color": "#22bf52",
    "fill-opacity": 0.45,
    "fill-outline-color": "#ffffff",
  },
};

const madeshMapFill = {
  id: "madeshMap",
  type: "fill",
  layout: {},
  paint: {
    "fill-color": "#29dadf",
    "fill-opacity": 0.55,
    "fill-outline-color": "#ffffff",
  },
};

const lumbiniMapFill = {
  id: "lumbiniMap",
  type: "fill",
  layout: {},
  paint: {
    "fill-color": "#21a4a5",
    "fill-opacity": 0.95,
    "fill-outline-color": "#ffffff",
  },
};

const viewportCommon = {
  latitude: 28.2913667,
  longitude: 86.5316036,
  minZoom: 6,
  maxZoom: 10,
  dragPan: false,
  scrollZoom: false,
};

const mapStyleFill = {
  id: "municipalityMap-layer",
  type: "fill",
  layout: {},
  paint: {
    "fill-color": "#f7c624",
    "fill-opacity": 0.75,
    "fill-outline-color": "#ffffff",
  },
};

export {
  mapStyleLine,
  bagmatiMapFill,
  madeshMapFill,
  lumbiniMapFill,
  mapStyleFill,
  viewportCommon,
};
