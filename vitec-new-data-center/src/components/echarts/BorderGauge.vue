<template>
  <div :id="id" class="border-gauge"></div>
</template>

<script>
import echarts from '@/utils/echarts'
export default {
  name: "Border-Gauge",
  computed: {
    id: function() {
      return "border-gauge-" + Math.random() * (new Date().getTime());
    }
  },
  props: {
    color: {
      type: Array,
      default: () => ['#3B7DF3', '#F45C5F']
    },
    data: {
      type: Array,
      // 值，总值，计量单位
      default: () => ['1.8', '2.5', 'T']
    } 
  },
  methods: {
    initData() {
      let divisor = 100 / this.data[1];  // 计算公约数，表盘以100位总值

      let option = {
        series: [
          {
            center: ["50%", "40%"], //仪表的位置
            name: "刻度", //仪表的名字
            type: "gauge", //统计图类型为仪表
            radius: "68%", //统计图的半径大小
            min: 0, //最小刻度
            max: 15, //最大刻度
            splitNumber: 5, //刻度数量
            startAngle: 210, //开始刻度的角度
            endAngle: -30, //结束刻度的角度
            axisLine: {
              //设置默认刻度盘上的刻度不显示，重新定义刻度盘
              show: false,
              lineStyle: {
                width: 1,
                color: [[1, "rgba(255,255,255,0)"]]
              }
            }, //仪表盘轴线
            axisLabel: {
              //仪表盘上的数据
              show: false,
              color: "#4d5bd1", //仪表盘上的轴线颜色
              distance: 25, //图形与刻度的间距
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 5, //刻度的段落数
              lineStyle: {
                color: "#83878E",
                width: 1 //刻度的宽度
              },
              length: 4 //刻度的长度
            }, //刻度样式
            splitLine: {
              //文字和刻度的偏移量
              show: true,
              length: 5, //便宜的长度
              lineStyle: {
                color: "#83878E"
              }
            } //分隔线样式
          },
          {
            type: "gauge", //刻度轴表盘
            radius: "80%", //刻度盘的大小
            center: ["50%", "40%"], //刻度盘的位置
            splitNumber: 5, //刻度数量
            startAngle: 210, //开始刻度的角度
            endAngle: -30, //结束刻度的角度
            axisLine: {
              //刻度的线条
              show: true,
              lineStyle: {
                width: 4, //定义一个宽15的数轴
                color: [
                  //颜色为渐变色
                  [
                    this.data[0] * divisor / 100,  // 渐变从0开始到的位置
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: this.color[0]
                      },
                      {
                        offset: 1,
                        color: this.color[1]
                      }
                    ])
                  ],
                  [1, "#293E3D"] // 背景色
                ]
              }
            },
            //分隔线样式。
            splitLine: {
              //表盘上的轴线
              show: false
            },
            axisLabel: {
              //表盘上的刻度数值文字
              show: false
            },
            axisTick: {
              //表盘上的刻度线
              show: false
            },
            pointer: {
              //表盘上的指针
              show: false
            },
            itemStyle: {
              //表盘指针的颜色
              color: "#18c8ff"
            },
            title: {
              //标题
              show: true,
              offsetCenter: [0, "100%"], // x, y，单位px
              textStyle: {
                color: "#8F9FB6",
                fontSize: 12 //表盘上的标题文字大小
              }
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, "0%"],
              color: "#ffffff",
              formatter: function(params) {
                return (params / divisor).toFixed(2);
              },
              textStyle: {
                fontSize: 14,
                fontWeight: 600
              }
            },
            data: [
              //当前数值的数据
              {
                // name: "/" + this.data[1] + this.data[2],
                value: (this.data[0] * divisor).toFixed(2)
              }
            ]
          }
        ]
      };
      
      let el = echarts.init(document.getElementById(this.id));
      el.clear();
      el.setOption(option);
    }
  },
  mounted () {
    this.initData()
  },
  watch: {
    data () {
      this.initData()
    }
  }
};
</script>

<style lang="scss">
.border-gauge {
  width: 109px;
  height: 100px;
}
</style>
