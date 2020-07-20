option = {
  backgroundColor: '#fff',
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(0,0,250,0.2)'
  },
  radar: {
    // center: ["50%", "50%"],
    // radius: "70%",
    indicator: [{
        text: '进度',
        max: 100
      },
      {
        text: '质量',
        max: 100
      },
      {
        text: '安全',
        max: 100
      },
      {
        text: '工人',
        max: 100
      }
    ],
    shape: "circle",
    splitArea: {
      show: true,
      areaStyle: {
        color: '#fff',

      }
    },
    axisLine: {
      show: true,
    },
    axisLabel: {
      rotate: 30
    },
    name: { // (圆外的标签)雷达图每个指示器名称的配置项。
      formatter: '{value}',
      textStyle: {
        fontSize: 24,
        color: '#333'
      }
    },
  },
  series: {
    name: '体测',
    type: 'radar',
    symbolSize: 10,
    symbol: "circle",
    areaStyle: {
      color: "#246CFF",
      opacity: 0.3
    },
    lineStyle: {
      color: "#246CFF ",
      opacity: 0.8,
      width: 2
    },
    itemStyle: {
      color: "#246CFF ",
      borderColor: "#246CFF",
      opacity: 0.8
    },
    label: {
      show: true,
      formatter: "{c} %",
      color: "#333",
      fontSize: 15
    },
    data: [{
      value: [45, 50, 49, 43],
      // name: '服务人员文化程度分析',
      // label: {
      //   normal: {
      //     show: true,
      //     textStyle: {
      //       fontSize: 8,
      //       color: 'fff'
      //     },
      //     formatter: function (params) {
      //       return params.value + "人";
      //     }
      //   }
      // }
    }]
  }
};