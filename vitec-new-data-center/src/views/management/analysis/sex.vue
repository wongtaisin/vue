<template>
  <div class="management-sex">
    <div class="chart" ref="chart"></div>
    <p>性别分析</p>
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
      // this.data = [
      //   { value: res.normal, name: '男' },
      //   { value: res.late, name: '女' }
      // ]
      this.data = [
        { value: 335, name: '男' },
        { value: 310, name: '女' }
      ]
      this.initChart()
    },
    initChart () {
      this.chart = echarts.init(this.$refs.chart)
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: '70%',
          top: '38%',
          data: ['男', '女'],
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 12,
          textStyle: {
            color: '#fff', // 图例文字颜色
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '80%'],
            center: ['38%', '50%'],
            avoidLabelOverlap: false,
            color: ['#3581FB', '#35E7F5'],
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '男' },
              { value: 310, name: '女' }
            ]
          }
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.management-sex {
  .chart {
    width: 220px;
    height: 170px;
  }
  .date-label {
    margin-right: 10px;
    color: #96a5bb;
  }
  p {
    margin-left: 50px;
  }
}
</style>
