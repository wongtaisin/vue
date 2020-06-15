<template>
  <div class="wrapper">
    <!-- <div class="header">质量管理</div> -->
    <div class="date-input-container">
      <el-date-picker
        v-model="query.startDate" class="date-input" type="date"
        @change="changeStartDate" placeholder="开始日期" :clearable="false"
        :picker-options="{disabledDate: disabledStartDate}"
      ></el-date-picker>
      <div class="seperator">-</div>
      <el-date-picker
        v-model="query.endDate" class="date-input" type="date"
        @change="changeEndDate" placeholder="结束日期" :clearable="false"
        :picker-options="{disabledDate: disabledEndDate}" 
      ></el-date-picker>
    </div>
    <div class="group-title">整改问题概况</div>
    <div class="count-box-container">
      <div class="count-box">
        <div>问题总数</div>
        <div>{{ count.total }}</div>
      </div>
      <div class="count-box">
        <div>已整改</div>
        <div>{{ count.finished }}</div>
      </div>
      <div class="count-box">
        <div>待复核</div>
        <div>{{ count.reviewing }}</div>
      </div>
      <div class="count-box">
        <div>未整改</div>
        <div>{{ count.pending }}</div>
      </div>
    </div>
    <div style="position:relative">
      <div ref="circleChart" class="circle-chart"></div>
      <div v-if="count.total <= 0" class="empty-circle-chart">
        该时间段无整改问题
      </div>
    </div>
    <template v-if="!query.building">
      <div class="group-title">楼栋{{ type === 'quality' ? '质量' : '安全' }}问题统计</div>
      <div style="margin-bottom: 25px;">
        <div v-for="(item, index) in buildingData" :key="index" class="category-item">
          <div class="category-name" :title="item.name">{{ item.name }}</div>
          <el-progress
            :percentage="item.percentage" class="quality-progress-bar"
            :stroke-width="6" color="#5965E7" :show-text="false"
          ></el-progress>
          <div class="category-count" :title="item.count">{{ item.count }}</div>
        </div>
        <div v-if="buildingData.length <= 0" class="empty-hint">
          该时间段无整改问题
        </div>
      </div>
      <div class="group-title">整改闭合率</div>
      <div style="margin-bottom: 25px;">
        <div v-for="(item, index) in buildingData" :key="index" class="category-item">
          <div class="category-name" :title="item.name">{{ item.name }}</div>
          <el-progress
            :percentage="item.finishedPercent" class="quality-progress-bar"
            :stroke-width="6" color="#37B877" :show-text="false"
          ></el-progress>
          <div class="category-count" :title="`${item.finishedPercent}%`">
            {{ `${item.finishedPercent}%` }}
          </div>
        </div>
        <div v-if="buildingData.length <= 0" class="empty-hint">
          该时间段无整改问题
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import fecha from 'fecha'
import { Progress } from 'element-ui'
import echarts from 'echarts'
import * as QUALITY_API from '@/api/quality'
import * as SAFETY_API from '@/api/safety'

export default {
  name: 'overall-statistics',
  components: {
    ElProgress: Progress
  },
  data() {
    return {
      type: 'quality',
      overall: true,
      query: {
        building: null,
        startDate: null,
        endDate: null,
      },
      count: {
        total: 0,
        pending: 0,
        reviewing: 0,
        finished: 0,
      },
      circleChart: null,
      typeData: [],
      buildingData: [],
    }
  },
  async mounted() {
    if (this.$route.name.indexOf('quality') >= 0) {
      this.type = 'quality'
    } else if (this.$route.name.indexOf('safety') >= 0) {
      this.type = 'safety'
    }

    if(this.$route.name.indexOf('building') >= 0) {
      this.query.building = parseInt(this.$route.params.id, 10)
      this.overall = false
    }

    let today = new Date(fecha.format(new Date(), 'YYYY/MM/DD'))
    this.query.startDate = new Date(today)
    this.query.startDate.setFullYear(this.query.startDate.getFullYear() - 1)
    this.query.endDate = new Date(today)

    this.resetGlobalStyle()
    this.initData()
  },
  methods: {
    async initData() {
      let API = this.type === 'quality' ? QUALITY_API : SAFETY_API
      let promises = [API.getOverallStatistics(this.query)]
      if (this.overall) {
        promises.push(API.getBuildingStatistics(this.query))
      }
      let results = await Promise.all(promises)
      this.count = results[0].count
      this.typeData = results[0].typeData
      if (this.overall) {
        this.buildingData = results[1]
      }

      this.circleChart = echarts.init(this.$refs.circleChart)
      this.updateCircleChart()
    },
    changeStartDate() {
      this.initData()
    },
    changeEndDate() {
      this.initData()
    },
    disabledStartDate(value) {
      if (!this.query.endDate) {
        return true
      }
      return value.getTime() > this.query.endDate.getTime()
    },
    disabledEndDate(value) {
      if (!this.query.startDate) {
        return true
      }
      return value.getTime() < this.query.startDate.getTime()
    },
    resetGlobalStyle() {
      document.body.style.background = '#fff'
      document.body.style.overflow = 'hidden'
      let el = document.getElementById('app')
      el.style.textAlign = 'left'
      el.style.transform = 'scale(1, 1)'
      el.style.width = '100vw'

      window.removeEventListener('resize', this.$parent.onResize)
    },
    updateCircleChart() {
      // const CATEGORIES_COUNT = 6
      const seriesData = []
      const legendData = []
      this.typeData.forEach((item) => {
        // if (index < CATEGORIES_COUNT) {
        seriesData.push({
          value: item.count,
          name: `${item.name}+++${item.count}`,
        })
        legendData.push({
          name: `${item.name}+++${item.count}`,
          icon: 'circle',
        })
        // } else {
        //   seriesData[CATEGORIES_COUNT - 1].value += item.count
        //   seriesData[CATEGORIES_COUNT - 1].name = '其他'
        //   legendData[CATEGORIES_COUNT - 1].name = '其他'
        // }
      })

      const option = {
        series: [{
          name: '整改问题概况',
          type: 'pie',
          radius: [48, 54],
          center: ['20%', '50%'],
          data: seriesData,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'center',
              formatter: () => this.typeData.reduce(
                (total, item) => total + item.count, 0,
              ),
              textStyle: {
                fontSize: 30,
                color: '#fff',
              },
            },
            emphasis: {
              show: false,
            },
          },
          labelLine: {
            show: false,
          },
          hoverOffset: 4,
        }],
        color: ['#DA6464', '#FFB107', '#07D3A8', '#3581FB'],
        tooltip: {
          trigger: 'item',
          formatter(params) {
            const arr = params.data.name.split('+++')
            return `${arr[0]}：${params.value}（${params.percent}%）`
          },
          position: 'right',
          textStyle: {
            fontSize: 12
          }
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          data: legendData,
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
          top: 'middle',
          right: '0px',
          formatter: (name) => {
            const arr = name.split('+++')
            let str = echarts.format.truncateText(arr[0], 75, '12px Microsoft Yahei', '…')
            while (true) { // eslint-disable-line
              const tmp = echarts.format.truncateText(`${str} `, 75, '12px Microsoft Yahei', '…')
              if (tmp.indexOf('…') >= 0) {
                break
              }
              str += ' '
            }
            arr[1] = parseFloat(arr[1])
            let total = this.typeData.reduce(
              (total, item) => total + item.count, 0,
            )
            let percent = Math.round(arr[1] / total * 100)
            return `${str}   ${arr[1] < 10 ? `  ${arr[1]}` : arr[1]}    ${percent}%`
          },
          itemGap: 10,
          pageButtonPosition: 'end',
          pageTextStyle: {
            fontSize: 10,
            color: '#fff',
          },
          pageIconSize: 8,
          pageIconColor: '#aaa',
          pageIconInactiveColor: '#2f4554',
          tooltip: {
            show: false,
            // formatter(params) {
            //   const arr = params.name.split('+++')
            //   return `${arr[0]}`
            // },
          },
        },
      }
      this.circleChart.clear()
      this.circleChart.setOption(option, true)
    }
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  box-sizing: border-box;
  background: rgb(77, 89, 103);
  padding: 15px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  color: #fff;
  // .header {
  //   box-sizing: border-box;
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 56px;
  //   padding: 16px;
  //   background: #131D2D;
  //   font-size: 18px;
  //   line-height: 25px;
  //   color: #fff;
  //   font-weight: bold;
  // }
}
.date-input-container {
  display: flex;
  align-items: center;
  .seperator {
    margin: 0 5px;
  }
}
.date-input {
  background: #131d2d;
  margin: 0;
  width: 100%;
  height: 36px;
  border: 1px solid #3a4c68;
  border-radius: 2px;
  font-size: 14px;

  /deep/ .el-input__inner {
    padding-right: 0;
    background: #131d2d;
    color: #a3b4cc;
    height: 36px;
    line-height: 36px;
    border: 1px solid #6f83a1;
    // border-color: #d3d9e2;
    border-radius: 2px;
    &:focus, &:hover {
      border-color: #A3B4CC;
    }
  }
}
.group-title {
  position: relative;
  padding-left: 12px;
  margin: 18px 0;
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  &::before {
    content: '';
    position: absolute;
    top: 2px;;
    left: 0;
    width: 4px;
    height: 16px;
    background: #37B877;
  }
}
.count-box-container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  text-align: center;
  font-size: 14px;
  .count-box {
    &>div:last-child {
      margin-top: 5px;
    }
  }
}
.circle-chart {
  margin: 25px 0;
  height: 120px;
}
.empty-circle-chart {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 120px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #a3b4cc;
}
.category-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
  .category-name {
    width: 50px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    text-align: right;
  }
  .category-count {
    width: 50px;
    text-align: right;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 16px;
    line-height: 20px;
  }
  .quality-progress-bar {
    margin-left: 10px;
    width: calc(100% - 100px);
  }
}
.empty-hint {
  text-align: center;
  font-size: 14px;
  color: #a3b4cc;
}
</style>

<style lang="scss">
.quality-progress-bar {
  .el-progress-bar__outer {
    background:darken(rgb(77, 89, 103), 5%);
  }
}
</style>