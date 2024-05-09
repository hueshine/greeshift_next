const grantDistributedStyle = {
  chart: {
    type: "line",
    spacing: [10, 10, 10, 10],
    height: 235,
  },
  title: false,
  credits: {
    enabled: false,
  },
  yAxis: {
    title: false,
  },

  legend: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
  },

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
          },
        },
      },
    ],
  },
};

const genderStyle = {
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
    visible: false,
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
            "M74.5,103c0,1.1-0.6,2.2-1.7,2.8c-1.6,0.8-3.5,0.2-4.2-1.4L53.6,73.5L52.4,86l18.8,39.9H53.8l-5,41c-0.1,0.8-0.5,1.4-1,1.9c-0.5,0.5-1.2,0.8-2,0.8c-1.7,0-3-1.3-3-3v-40.6h-3.7v40.6c0,1.7-1.3,3-3,3c-0.8,0-1.5-0.3-2-0.8c-0.5-0.5-0.9-1.1-1-1.9l-5-41H11.6L30.4,86l-1.2-12.9l-15.1,31.2c-0.8,1.6-2.7,2.2-4.2,1.4h0c-1.4-0.7-2.1-2.4-1.5-3.9l15.6-41.6c2-5.2,6.9-8.6,12.4-8.6c-5.8-2-10-7.6-10-14.1c0-1,0.1-2,0.3-3c-1.1,2.3-1.9,4.9-2,7.7c-0.6,10.6-10.4,10.2-10.4,10.2c8.1-4.7-1.3-21.2,6.2-28.5S35,24,35,24c1.9-0.9,4-1.4,6.3-1.4c8.2,0,14.9,6.7,14.9,14.9c0,6.6-4.3,12.3-10.3,14.2l0.8,0c5.4,0.2,10.2,3.6,12,8.6l15.5,41.5C74.4,102.3,74.5,102.6,74.5,103z",
        },
        {
          definition:
            "M74.7,101.3c0,1.2-0.7,2.3-1.7,2.8c-1.7,0.9-3.8,0-4.4-1.8L57.8,71.2l-2.1,37h-0.1l-3.6,56.6c-0.1,1.3-0.7,2.5-1.6,3.4c-0.9,0.8-2.1,1.4-3.5,1.4c-2.8,0-5.1-2.3-5.1-5.1v-56.3h-3.8v56.3c0,2.8-2.3,5.1-5.1,5.1c-1.3,0-2.6-0.5-3.5-1.4c-0.9-0.9-1.5-2-1.6-3.4l-3.6-56.6h-0.1l-1.2-37.4l-10.9,31.5c-0.6,1.8-2.7,2.7-4.4,1.8h0c-1.3-0.7-2-2.1-1.6-3.6l10.3-43.1c1.2-5.1,5.8-8.7,11-8.7h8c-4-1.3-7.4-4.3-9.2-8.5c-3.3-7.8,0.3-16.7,8-20.1c2-0.8,4-1.2,6-1.2l0,0h0.3c3.9-0.1,7.7-1.2,8.2-4.6c0,0,1.2,0.8,0,4.6c0,0,1.2,0.1,1.7-1.1c0,0,1,2.6-0.4,4.6c1.8,1.5,3.3,3.5,4.3,5.8c3.3,7.8-0.3,16.7-8,20c-0.5,0.2-1,0.4-1.5,0.5l8.7,0.2c5.1,0.1,9.5,3.7,10.7,8.7l10.2,42.8C74.7,100.8,74.7,101,74.7,101.3z",
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

const ethinicityStyle = {
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
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
  },
};

const pieChartDataStyle = {
  chart: {
    type: "pie",
    spacing: [10, 10, 10, 10],
    height: 212,
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

const wasteWorkerStyle = {
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

export {
  grantDistributedStyle,
  genderStyle,
  ethinicityStyle,
  pieChartDataStyle,
  wasteWorkerStyle,
};
