const wasteSmartSchoolStyle = {
  chart: {
    type: "pie",
    spacing: [10, 10, 10, 10],
    height: 235,
  },
  credits: {
    enabled: false,
  },
  title: {
    text: "",
  },

  plotOptions: {
    pie: {
      allowPointSelect: false,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
      },
      showInLegend: false,
    },
  },
};
const peopleInvolvedStyle = {
  chart: {
    type: "pictorial",
    height: 235,
  },

  title: false,

  credits: {
    enabled: false,
  },

  accessibility: {
    screenReaderSection: {
      beforeChartFormat:
        "<{headingTagName}>{chartTitle}</{headingTagName}><p>{typeDescription}</p><p>{chartLongdesc}</p>",
    },
    point: {
      valueDescriptionFormat: "{value}.",
    },
    series: {
      descriptionFormat: "",
    },
    landmarkVerbosity: "one",
  },

  xAxis: {
    categories: ["Female", "Male"],
    lineWidth: 0,
    opposite: true,
  },

  yAxis: {
    visible: false,
    stackShadow: {
      enabled: true,
    },
    max: 100,
  },

  legend: false,

  tooltip: {
    pointFormat: "<b>{point.y} %</b>", // Value format
    footerFormat: "",
  },

  plotOptions: {
    series: {
      pointPadding: 0,
      groupPadding: 0,
      dataLabels: {
        enabled: false,
      },
      stacking: "normal",
      colors: ["#8B93FF", "#40CC28"],
      paths: [
        {
          definition:
            "M71.8,71.4c0,2.6-1.5,5-4,6.1c-3.3,1.4-7.2-0.2-8.6-3.5l-3.8-9.1c-0.2-0.6-1.1-0.3-1,0.3l5.7,23.5c0.5,2-1,3.9-3.1,3.9h-4.8v34.2c0,1.9-0.8,3.6-2,4.9c-1.3,1.3-3,2-4.9,2c-3.8,0-6.9-3.1-6.9-6.9V92.5h-2.8v34.2c0,1.9-0.8,3.6-2,4.9c-1.3,1.3-3,2-4.9,2c-3.8,0-6.9-3.1-6.9-6.9V92.5h-4.8c-2,0-3.6-1.9-3.1-3.9l5.7-23.5c0.2-0.6-0.7-0.9-1-0.3l-3.8,9.1c-1,2.5-3.5,4-6,4c-0.8,0-1.7-0.2-2.5-0.5C3.2,76,1.6,72.2,3,68.9l13.8-33.4c1-2.5,3.5-4.1,6.1-4.1h11.5c-4.7-1.2-8.1-5.5-8.1-10.5c0-6,4.9-10.8,10.8-10.8C43.2,10.1,48,15,48,21c0,5-3.4,9.3-8.1,10.5h11.3c2.6-0.1,5.2,1.5,6.2,4.1l13.8,33.4C71.7,69.7,71.8,70.5,71.8,71.4z",
        },
        {
          definition:
            "M65.9,73.8c0,3.1-2.1,5.8-5.3,6.4c-3.5,0.7-7-1.6-7.7-5.1l-2.2-11c-0.1-0.6-1-0.5-1,0.1V127c0,1.9-0.8,3.6-2,4.9c-1.2,1.2-3,2-4.9,2c-3.8,0-6.9-3.1-6.9-6.9V84.2c0-0.8-0.6-1.4-1.4-1.4s-1.4,0.6-1.4,1.4V127c0,1.9-0.8,3.6-2,4.9c-1.3,1.2-3,2-4.9,2c-3.8,0-6.9-3.1-6.9-6.9V63.9c0-0.6-0.9-0.7-1-0.1L16,75.1c-0.6,3.1-3.4,5.3-6.4,5.3c-0.4,0-0.9,0-1.3-0.1c-3.5-0.7-5.8-4.2-5.1-7.7l7.2-35.4c0.3-1.5,1.1-2.8,2.3-3.8c1.1-0.9,2.6-1.5,4.1-1.5h14.7c-4.8-1.2-8.3-5.4-8.3-10.5c0-6,4.9-10.9,10.8-10.9s10.8,4.9,10.8,10.9c0,5.1-3.5,9.4-8.3,10.5h15.6c3,0.1,5.7,2.2,6.3,5.3l7.2,35.4C65.8,72.9,65.9,73.3,65.9,73.8z",
        },
      ],
    },
    pictorial: {
      colorByPoint: true,
    },
  },

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            padding: 8,
            margin: 12,
            itemMarginTop: 0,
            itemMarginBottom: 0,
            verticalAlign: "bottom",
            layout: "horizontal",
          },
        },
      },
      {
        condition: {
          maxWidth: 400,
        },
        chartOptions: {
          legend: {
            layout: "vertical",
          },
        },
      },
    ],
  },
};

const budgetSpentStyle = {
  chart: {
    type: "gauge",
    spacing: [10, 10, 10, 10],
    height: 180,
  },
  credits: {
    enabled: false,
  },

  title: false,

  pane: {
    startAngle: -90,
    endAngle: 89.9,
    background: null,
    center: ["50%", "75%"],
    size: "110%",
  },

  plotOptions: {
    gauge: {
      dataLabels: {
        enabled: false, // Disable data labels for the gauge chart
      },
      dial: {
        backgroundColor: "transparent", // Hide the dial (value display at the bottom)
      },
    },
  },
};

const wasteDisposalStyle = {
  chart: {
    type: "column",
    spacing: [10, 10, 10, 10],
    height: 200,
  },
  credits: {
    enabled: false,
  },
  title: false,
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
      enabled: true,
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
  plotOptions: {
    column: {
      dataLabels: {
        enabled: true,
        color: "#333",
        align: "center",
        format: "{y}",
        style: {
          textOutline: "none",
          fontSize: "13px",
          fontWeight: "normal",
        },
      },
      groupPadding: 0.2,
    },
  },
};

const reductionPlasticsStyle = {
  chart: {
    type: "column",
    spacing: [10, 10, 10, 10],
    height: 200,
  },
  credits: {
    enabled: false,
  },
  title: false,

  xAxis: {
    type: "category",
    gridLineWidth: 0,
    lineColor: "#efefef",
  },
  yAxis: {
    title: false,
    labels: {
      enabled: true,
    },
    gridLineWidth: 0,
  },
  legend: {
    enabled: false,
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}%',
  },
  plotOptions: {
    column: {
      dataLabels: {
        enabled: true,
        color: "#333",
        align: "center",
        format: "{y} tonnes", // Display the value of each bar
        style: {
          textOutline: "none",
          fontSize: "13px",
          fontWeight: "normal",
        },
      },
      groupPadding: 0.15,
    },
  },
};

const wasteCompositionStyle = {
  chart: {
    type: "pie",
    spacing: [10, 10, 10, 10],
    height: 320,
  },
  credits: {
    enabled: false,
  },
  title: false,
  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}',
  },
  plotOptions: {
    pie: {
      allowPointSelect: false,
      cursor: "pointer",
      dataLabels: {
        enabled: false,
      },
      showInLegend: true,
    },
  },
  legend: {
    layout: "vertical", // Set legend layout to vertical
    align: "left", // Align legend to the right
    verticalAlign: "middle", // Center the legend vertically
  },
};

const vulnerableCommunitiesStyle = {
  chart: {
    type: "column",
    spacing: [10, 10, 10, 10],
    height: 320,
  },
  credits: {
    enabled: false,
  },
  title: false,
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
      enabled: true,
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
  plotOptions: {
    column: {
      dataLabels: {
        enabled: true,
        color: "#333",
        align: "center",
        format: "{y}", // Display the value of each bar
        style: {
          textOutline: "none",
          fontSize: "10px",
          fontWeight: "normal",
        },
      },
      groupPadding: 0.2,
    },
  },
};

const allwasteDisposalStyle = {
  chart: {
    type: "column",
    spacing: [10, 10, 10, 10],
    height: 320,
  },
  credits: {
    enabled: false,
  },
  title: false,
  yAxis: {
    min: 0,
    title: false,
  },
  tooltip: {
    valueSuffix: "",
  },
  plotOptions: {
    column: {
      pointPadding: 0.1,
      borderWidth: 0,
    },
  },
};

const allPlasticLeakageStyle = {
  chart: {
    type: "column",
    spacing: [10, 10, 10, 10],
    height: 320,
  },
  credits: {
    enabled: false,
  },
  title: false,

  yAxis: {
    min: 0,
    title: false,
  },
  tooltip: {
    valueSuffix: "",
  },
  plotOptions: {
    column: {
      pointPadding: 0.1,
      borderWidth: 0,
    },
  },
};

export {
  budgetSpentStyle,
  wasteSmartSchoolStyle,
  peopleInvolvedStyle,
  wasteDisposalStyle,
  reductionPlasticsStyle,
  wasteCompositionStyle,
  vulnerableCommunitiesStyle,
  allwasteDisposalStyle,
  allPlasticLeakageStyle,
};
