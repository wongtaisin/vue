<template>
  <div
    :id="id"
    class="echart-circle"
  ></div>
</template>

<script>
import echarts from '@/utils/echarts'
export default {
  name: "echarts-circle",
  computed: {
    id() {
      return "echarts-circle-" + new Date().getTime();
    }
  },
  props: {
    data: {
      type: Array
    }
  },
  methods: {
    draw() {
      let series_data = [],
        legend_data = [];
      this.data.forEach((item, index) => {
        if (index < 5) {
          series_data.push({
            value: item.count,
            name: `${item.type} ${item.count} ${item.percent}`
          });
          legend_data.push({
            name: `${item.type} ${item.count} ${item.percent}`,
            icon:
              "path://M0,2 Q0,0 2,0 L8,0 Q10,0 10,2 L10,8 Q10,10 8,10 L2,10 Q0,10 0,8 z"
          });
        } else {
          series_data[4].value = series_data[3].value + item.count;
          series_data[4].name = "其他分类";
          legend_data[4] = {
            name: '其他分类',
            icon:
              "path://M0,2 Q0,0 2,0 L8,0 Q10,0 10,2 L10,8 Q10,10 8,10 L2,10 Q0,10 0,8 z"
          };
        }
      });

      let option = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return (
              params.data.name.split(" ")[0] +
              ": " +
              params.data.value +
              "(" +
              params.data.name.split(" ")[2] +
              ")"
            );
          }
        },
        legend: {
          data: legend_data,
          top: "auto",
          right: "0px",
          width: "10px",
          textStyle: {
            color: "#d3d9e2",
            fontSize: 12
          },
          formatter: function(name) {
            return echarts.format.truncateText(
              name,
              120,
              "14px Microsoft Yahei",
              "…"
            );
          },
          tooltip: {
            show: true
          }
        },
        series: [
          {
            name: "问题项统计",
            type: "pie",
            radius: ["70%", "90%"],
            center: ["30%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "14",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: series_data
          }
        ],
        color: ["#DA6464", "#FFB107", "#07D3A8", "#3581FB"]
      };

      let chart = echarts.init(document.getElementById(this.id));
      chart.setOption(option);
      window.addEventListener("resize", () => {
        chart.resize();
      });
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
