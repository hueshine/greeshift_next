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
            "M89.4,158.2c-0.8,1.1-2,1.8-3.4,1.9h0c-2.8,0.4-5.3-1.6-5.7-4.4c0,0-4.5-31-4.6-35.2v0c-0.7-4.8-3.3-22.8-4.4-32h-0.9c-0.8,4.3-2.8,16.1-2.8,20.8c0,2.2,0.5,7.2,1,12.4c0,0,0.5,1.4,1.2,3.9v0c0.3,0.1,0.3,0.5,0.2,0.7c2.3,8.3,6.8,26.5,7.2,45.2v15.9h-7.6v8.6c0,0.5,0,0.9-0.1,1.3c0,0,0,0,0,0c0.1,0.4,0.1,0.9,0.1,1.3V237c0,5-4,9-9,9c-5,0-9-4-9-9v-38.2c0-0.5,0-0.9,0.1-1.3c0,0,0,0,0,0c-0.1-0.4-0.1-0.9-0.1-1.3v-8.6h-2.2v8.9c0,0.5,0,0.9-0.1,1.4c0,0,0,0,0,0c0.1,0.4,0.1,0.9,0.1,1.4v38.2c0,5-4,9-9,9c-5,0-9-4-9-9v-38.2c0-0.5,0-0.9,0.1-1.4c0,0,0,0,0,0c-0.1-0.4-0.1-0.9-0.1-1.4v-8.9h-4.9v-15.9c0.4-18.5,4.5-36.5,6.7-44.9h-0.1c-0.8,0-0.8-1,0-1h0.4c0.7-2.5,1.1-3.8,1.1-3.8h0c0.6-5.2,1.1-10.2,1.1-12.4c0-4.5-1.9-16-2.7-20.8h-1c-1.1,9.2-3.7,27.2-4.4,32v0c-0.1,4.3-4.6,35.2-4.6,35.2c-0.4,2.8-2.9,4.7-5.7,4.4c-1.3-0.2-2.5-0.9-3.4-1.9c-0.8-1.1-1.2-2.4-1-3.7c0,0,3.8-33.7,4.6-35.6c0,0,0,0,0-0.1c0.8-6.9,4.2-35.5,4.9-37.2c4.1-15,15.7-14.1,15.7-14.1H45c0.1,0,0.2,0,0.3,0h1.4c-7.9-1.9-13.7-9-13.7-17.4c0-9.9,8-17.9,17.9-17.9c9.9,0,17.9,8,17.9,17.9c0,8.4-5.8,15.5-13.7,17.4h2.8c0.1,0,0.2,0,0.3,0H65c0,0,11.6-0.9,15.7,14.1c0.8,1.7,4.1,30.3,4.9,37.2c0,0,0,0,0,0.1c0.9,1.9,4.6,35.6,4.6,35.6C90.5,155.8,90.2,157.1,89.4,158.2z",
        },
        {
          definition:
            "M88,158.8c-0.8,1.1-2,1.8-3.4,1.9h0c-2.8,0.4-5.3-1.6-5.7-4.4c0,0-4.4-30.4-4.6-35.1c-0.7-4.6-3.3-22.8-4.4-32.1h-0.6v63.5c0,0.3,0,0.5,0,0.8V192c0,0.5,0,0.9-0.1,1.3c0,0,0,0,0,0c0.1,0.4,0.1,0.9,0.1,1.4v45.5c0,5-4,9-9,9c-5,0-9-4-9-9v-45.5c0-0.5,0-0.9,0.1-1.4c0,0,0,0,0,0c-0.1-0.4-0.1-0.9-0.1-1.3v-26.7h-2.2v27c0,0.5,0,0.9-0.1,1.3c0,0,0,0,0,0c0.1,0.4,0.1,0.9,0.1,1.3v45.5c0,5-4,9-9,9c-5,0-9-4-9-9V195c0-0.5,0-0.9,0.1-1.3c0,0,0,0,0,0c-0.1-0.4-0.1-0.9-0.1-1.3V89.2h-0.6c-1.1,9.2-3.7,27.3-4.4,32v0c-0.1,4.3-4.6,35.2-4.6,35.2c-0.4,2.8-2.9,4.7-5.7,4.4h0c-1.3-0.2-2.5-0.9-3.3-1.9c-0.8-1.1-1.2-2.4-1-3.7c0,0,3.8-33.7,4.6-35.6c0,0,0,0,0,0c0.8-6.8,4.2-35.5,5-37.2c4.1-15,15.7-14.1,15.7-14.1h7.5c-7-2.5-11.9-9.1-11.9-16.9c0-9.9,8-17.9,17.9-17.9c9.9,0,17.9,8,17.9,17.9c0,7.8-5,14.4-11.9,16.9h7.3c0,0,11.6-0.8,15.7,14.1c0.8,1.7,4.2,30.3,5,37.2c0,0,0,0,0,0.1c0.9,1.9,4.6,35.6,4.6,35.6C89.2,156.4,88.8,157.8,88,158.8z",
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
