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

const mapStyleFill = {
  id: "map_style_fill",
  type: "fill",
  layout: {},
  paint: {
    "fill-color": "#33b2b6",
    "fill-opacity": 0.75,
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

export { mapStyleLine, mapStyleFill, viewportCommon };
