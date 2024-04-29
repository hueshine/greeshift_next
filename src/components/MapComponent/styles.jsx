import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor: theme.palette.mode === "light" ? "#1e607a" : "#308fe8",
  },
}));

const MuniBorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor: theme.palette.mode === "light" ? "#40cc288f" : "#308fe810",
  },
}));

const mapStyleLine = {
  id: "map_style",
  type: "line",
  layout: {},
  paint: {
    "line-color": "#1e607a",
    "line-width": 1,
  },
};

const mapStyleFill = {
  id: "map_style_fill",
  type: "fill",
  layout: {},
  paint: {
    "fill-color": "#4F6F52",
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

const plasticOptionsStyle = {
  chart: {
    type: "pie",
  },
  credits: {
    enabled: false,
  },
  title: {
    text: "",
  },
  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}',
  },
};

const genderOptionsStyle = {
  chart: {
    type: "column",
  },
  credits: {
    enabled: false,
  },
  title: {
    text: "",
  },
  accessibility: {
    announceNewData: {
      enabled: true,
    },
  },
  xAxis: {
    type: "category",
    gridLineWidth: 0,
    lineColor: "#efefef",
  },
  yAxis: {
    title: false,
    labels: {
      enabled: false,
    },
    gridLineWidth: 0,
  },
  legend: {
    enabled: false,
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}',
  },
};

const schoolOptionsStyle = {
  chart: {
    type: "pie",
  },
  credits: {
    enabled: false,
  },
  title: {
    text: "",
  },
};

const youthOptionsStyle = {
  chart: {
    type: "pie",
  },
  credits: {
    enabled: false,
  },
  title: {
    text: "",
  },
};

export {
  BorderLinearProgress,
  mapStyleLine,
  mapStyleFill,
  viewportCommon,
  plasticOptionsStyle,
  genderOptionsStyle,
  schoolOptionsStyle,
  youthOptionsStyle,
  MuniBorderLinearProgress,
};
