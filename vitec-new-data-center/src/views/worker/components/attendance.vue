<template lang="pug">
.attendance-page
  .chart-container
    #echart(ref='echart')
</template>

<script>
import { getDepartments } from "@/api/worker";
const maxLine = 8;
const axisLabel = {
  color: "#fff",
  fontSize: 14,
  margin: 36,
  verticalAlign: "middle",
  interval: 0,
  showMaxLabel: true,
  // padding: [16, 5],
  formatter: value => {
    const len = value.length / maxLine;
    // console.log(value, len)
    if (len >= 1) {
      return value.substr(0, maxLine) + "...";
      // const arr = value.split('')
      // return [
      //     value.substr(0, maxLine) + '...',
      //     value.substr(maxLine, maxLine),
      //     // arr.splice(0, maxLine),
      //     // [...arr.splice(maxLine, maxLine), '...']
      // ].join('\n')
    }
    return value;
  }
};

const color = ["#75fda7", "#39ccf7", "#009aff", "#8a47f5", "#4664f8"];
export default {
  data: () => ({
    datas: [],
    chart: null,
    options: {
      color,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "line" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        show: true
        // left: '3%',
        // right: '4%',
        // bottom: '3%',
        // containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
            interval: 0
          },

          axisLine: {
            lineStyle: {
              color: "#a8aab0"
            }
          },

          axisLabel: {
            ...axisLabel
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            ...axisLabel,
            margin: 16
          }
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "16px",
          data: [10, 52, 200, 123, 390, 330, 220],
          itemStyle: {
            color(params) {
              var index = params.dataIndex % 5;
              return color[index];
            }
          },
          label: {
            normal: {
              show: true,
              position: "top",
              color: "#fff"
            }
          }
        }
      ]
    }
  }),

  methods: {
    refresh() {
      getDepartments().then(res => {
        if (res.length > 0) {
          const names = [];
          const counts = [];
          res.forEach(one => {
            names.push(one.department);
            counts.push(one.qty);
          });

          this.options.xAxis[0].data = names;
          this.options.series[0].data = counts;

          this.chart = window.echarts.init(this.$refs.echart);
          this.chart.setOption(this.options);
        }
        setTimeout(() => {
          this.refresh();
        }, 5000);
      });
    }
  },

  mounted() {
    // console.log(this.$refs.echart)
    // this.chart = window.echarts.init(this.$refs.echart)
    // this.chart.setOption(this.options)

    this.refresh();

    // setTimeout(() => {

    //     // this.options.xAxis[0].data = [
    //     //     '山湖花园山湖花园山湖花园山湖花园山湖花园山湖花园山湖花园山湖花园山湖花园山湖花园山湖花园山湖花园山湖花园',
    //     //     '山湖花园2',
    //     //     '山湖花园3',
    //     //     '山湖花园4'
    //     // ]
    //     // this.options.series[0].data = this.options.series[0].data.splice(0, 4)
    //     // this.options.xAxis[0].axisLabel.showMinLabel = this.options.xAxis[0].data.length
    //     // this.chart.setOption(this.options)
    // }, 2000)
  }
};
</script>

<style lang="scss" scoped>
.attendance-page {
  height: 100%;
  .chart-container {
    height: 100%;
  }
  #echart {
    height: 100%;
  }
}
</style>
