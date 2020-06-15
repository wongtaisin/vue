<template>
  <div class="management-age">
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
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
      this.initChart()
    },
    initChart () {
      this.chart = echarts.init(this.$refs.chart)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['平均出勤人数', '平均工作时长'],
          left: '60%',
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 12,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            },
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
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位/人',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}人'
            },
            axisLine: {
              lineStyle: {
                color: '#6F83A1',
              },
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: '#6F83A1',
              },
            }
          },
          {
            type: 'value',
            name: '单位/小时',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} 时'
            },
            axisLine: {
              lineStyle: {
                color: '#6F83A1',
              },
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: '#6F83A1',
              },
            }
          }
        ],
        series: [
          {
            name: '平均出勤人数',
            type: 'bar',
            barWidth: '40%',
            itemStyle: {
              normal: {
                color: ['#3581FB']
              }
            },
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: '平均工作时长',
            type: 'line',
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: ['#35E7F5']
              }
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 10.3, 13.4, 13.0, 16.5, 12.0, 6.2]
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
  margin-left: 25px;
  .chart {
    width: 565px;
    height: 325px;
  }
  .date-label {
    margin-right: 10px;
    color: #96a5bb;
  }
}
</style>
