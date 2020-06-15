<template>
  <div class="management-age">
    <span>年龄段分析</span>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getTaskStateNum } from '@/api/management'
export default {
  components: {},
  data () {
    return {
      data: [],
      chart: null,
      loading: false,
    }
  },
  async mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      // const res = await getTaskStateNum()
      // this.data = [ ]
      this.data = [10, 52, 200, 334, 390, 330]
      this.initChart()
    },
    initChart () {
      this.chart = echarts.init(this.$refs.chart)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['20以下', '21-30', '31-40', '41-50', '51-55', '55以上'],
            axisLine: {
              lineStyle: {
                color: '#fff',
              },
            },
            axisLabel: {
              textStyle: {
                color: '#fff',
              },
              interval: 0,
            },
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: 'transparent',
              },
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: '#fff',
              },
            }
          }
        ],
        series: [
          {
            name: '人数',
            type: 'bar',
            barWidth: '40%',
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = ['#75FDA7', '#39CBF7', '#0099FF', '#8947F5', '#4563F7', '#2F48C5']
                  return colorList[params.dataIndex]
                }
              }
            },
            data: [10, 52, 200, 334, 390, 330]
          }
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.management-age {
  margin-top: 20px;
  .chart {
    width: 330px;
    height: 340px;
  }
  .date-label {
    margin-right: 10px;
    color: #96a5bb;
  }
  p {
  }
}
</style>
