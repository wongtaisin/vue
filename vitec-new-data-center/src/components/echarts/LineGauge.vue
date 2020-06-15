<template>
  <div>
    <img
      id="img"
      src="@/assets/images/bg.png"
    >
    <div
      :id="id"
      class="line-gauge "
    ></div>
  </div>
</template>

<script>
import echarts from '@/utils/echarts'
export default {
  name: "Line-Gauge",
  props: {
    data: {
      type: Array,
      default: () => [23, 25, "M"]
    }
  },
  computed: {
    id: function() {
      return "line-gauge-" + Math.random() * (new Date().getTime());
    }
  },
  methods: {
    initData() {
      let divisor = 100 / this.data[1];

      let end_num = Math.floor(((this.data[0] * divisor) / 100) * 240) - 210;  // 270 总角度， 225起始角度，-45终点角度
      end_num = 0 - end_num;
      let split = this.data[1];
      let option = {
        series: [
          {
            type: "gauge",
            center: ["50%", "40%"],
            min: 0,
            max: 25,
            splitNumber: 1,
            startAngle: end_num,
            endAngle: -30,
            axisLine: {
              show: false,
              lineStyle: {
                color: [[1, "rgba(255,255,255,0)"]]
              },
              length: 5
            },
            axisTick: {
              show: true,
              splitNumber:
                split - Math.floor(((this.data[0] * divisor) / 100) * split),  // 25个间隔中所占比例
              length: 5,
              lineStyle: {
                color: '#464d56'
              }
            },
            splitLine: {
              show: false
            }
          },
          {
            type: "gauge",
            center: ["50%", "40%"],
            min: 0,
            max: 25,
            splitNumber: 1,
            startAngle: 210,
            endAngle: end_num,
            detail: {
              offsetCenter: [0, "0%"],
              formatter: function(params) {
                return params / divisor;
              },
              color: '#fff',
              textStyle: {
                fontSize: 14,
                fontWeight: 600
              }
            },
            data: [{ value: this.data[0] * divisor, name: '/' + this.data[1] + this.data[2] }],
            axisTick: {
              splitNumber: Math.floor(((this.data[0] * divisor) / 100) * split),
              lineStyle: {
                color: {
                  image: document.getElementById("img"),
                  repeat: "no-repeat"
                },
                length: 5
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: [[1, "rgba(255,255,255,0)"]]
              },
              length: 5
            },
            splitLine: {
              show: false
            },
            title: {
              show: true,
              offsetCenter: [0, "100%"], 
              textStyle: {
                color: "#8F9FB6",
                fontSize: 12 
              }
            }
          }
        ]
      };
      let el = echarts.init(document.getElementById(this.id));
      el.clear();
      el.setOption(option);
    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style>
.line-gauge {
  width: 109px;
  height: 100px;
}
#img {
  width: 100px;
  height: 100px;
  display:none;
}
</style>
