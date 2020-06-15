<template>
  <div :id="id"></div>
</template>

<script>
import echarts from '@/utils/echarts'
export default {
  name: "echarts-line",
  props: ["data"],
  methods: {
    draw() {
      if (this.data == undefined) return;
      let legend_arr = [],
        series_arr = [],
        series_data = [];
      this.data.forEach(item => {
        legend_arr.push({ name: item.label, icon: "circle" });
        series_arr.push(item.value);
        let series_obj = {
          name: item.label,
          type: "line",
          stack: "总量",
          data: item.value,
          symbol: 'circle',
          symbolSize: 8,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#133161"
                },
                {
                  offset: 1,
                  color: "#030d1e"
                }
              ])
            }
          }
        };
        series_data.push(series_obj);
      });
      let x_data = [];
      for (let i = 0; i < 12; i++) {
        x_data.push(i + 1 + "月");
      }

      let option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: legend_arr,
          textStyle: {
            color: "#d3d9e2"
          },
          left: "0",
          top: "0",
          itemWidth: 10,
          itemHeight: 10
        },
        grid: {
          left: "1%",
          right: "2%",
          bottom: "0%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: x_data,
          axisLine: {
            lineStyle: {
              color: "#6f83a1"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "transparent"
            }
          },
          minInterval: 1,
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            lineStyle: {
              color: '#35445a'
            }
          },
          splitNumber: 3
        },
        series: series_data,
        color: ["#3581fb", "#4fb0df"]
      };
      let chart = echarts.init(document.getElementById(this.id));
      chart.setOption(option);
    }
  },
  mounted() {
    this.draw();
  },
  computed: {
    id() {
      return "echarts-line-" + new Date().getTime();
    }
  },
  watch: {
    data() {
      this.draw();
    }
  }
};
</script>

<style>
</style>
