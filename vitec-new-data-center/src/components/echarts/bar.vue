<template>
  <div
    :id="id"
    class="echarts-bar"
  ></div>
</template>

<script>
import echarts from '@/utils/echarts'
export default {
  name: "Echarts-Bar",
  computed: {
    id() {
      return "echarts-bar-" + Math.random() * (new Date().getTime());
    }
  },
  props: {
    datas: {
      type: Array,
      required: true
    }
  },
  methods: {
    initData() {
      if (!this.datas) return
      console.log('bar init.')
      let x_data = [],
        // legend_data = ["预警数", "报警数"],
        arr1 = [],
        arr2 = [];
      this.datas.forEach(item => {
        x_data.push(item.tower_name);
        // arr1.push(item.early_warning_num);
        arr1.push({
          value: item.early_warning_num,
          itemStyle: {
            barBorderRadius: [2, 2, 0, 0]
          }
        });
        // arr2.push(item.alarm_num);
        arr2.push({
          value: item.alarm_num,
          itemStyle: {
            barBorderRadius: [2, 2, 0, 0]
          }
        });
      });

      let options = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: [
            {
              name: "预警数",
              icon:
                "path://M0,2 Q0,0 2,0 L8,0 Q10,0 10,2 L10,8 Q10,10 8,10 L2,10 Q0,10 0,8 z"
            },
            {
              name: "报警数",
              icon:
                "path://M0,2 Q0,0 2,0 L8,0 Q10,0 10,2 L10,8 Q10,10 8,10 L2,10 Q0,10 0,8 z"
            }
          ],
          left: 10,
          textStyle: {
            color: "#d3d9e2"
          },
          itemGap: 24
        },
        grid: {
          left: "0",
          right: "0",
          bottom: "0",
          top: "15%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: x_data,
            axisLine: {
              lineStyle: {
                color: "#35445a"
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
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#ffffff"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#6f83a1"
              }
            },
            splitNumber: 3,
            axisTick: {
              show: false
            },
            minInterval : 1
          }
        ],
        series: [
          {
            name: "预警数",
            type: "bar",
            itemStyle: {
              color: "#56bfe7"
            },
            data: arr1,
            barWidth: 16
          },
          {
            name: "报警数",
            type: "bar",
            itemStyle: {
              color: "#3581fb"
            },
            data: arr2,
            barWidth: 16
          }
        ]
      };

      let el = echarts.init(document.getElementById(this.id));
      el.clear();
      el.setOption(options);
    }
  },
  watch: {
    datas() {
      console.log('bar\'s data has been changed.')
      this.initData();
    }
  },
  mounted() {
    this.initData()
  }
};
</script>

<style lang="scss">
.echarts-bar {
  height: 275px;
  width: 642px;
}
</style>
