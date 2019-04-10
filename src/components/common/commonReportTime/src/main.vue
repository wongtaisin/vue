<style lang="scss" scoped>
.common-report-time {
  width: 100%;
  height: 78px;
  background: white;
  display: flex;
  align-items: center;
  position: relative;
  text-align: center;
  box-shadow: 0 1px 0.32rem rgba(0, 0, 0, 0.117647),
    0 1px 0.21rem rgba(0, 0, 0, 0.117647);
  ul {
    width: 100%;
    display: flex;
    li {
      width: 100%;
      height: 46px;
      line-height: 46px;
      border-radius: 30px;
      background: #f5f5f5;
      border: 1px solid #f5f5f5;
      overflow: hidden;
      margin: 0 18px;
      &:last-child {
        border-radius: 0;
        background: white;
        border: none;
        border-left: 2px solid #f5f5f5;
      }
      .blue {
        color: #0992fd;
      }
    }
    .active {
      color: #0992fd;
      background: #e6f3ff;
      border: 1px solid #0992fd;
    }
  }
  .filter {
    width: 100%;
    color: #666;
    i {
      font-size: 18px;
    }
  }
  .filter-box {
    width: 100%;
    position: absolute;
    top: 80px;
    left: 0;
    height: 100vh;
    z-index: 999;
    .filter-bg {
      width: 100%;
      height: calc(100vh + 10rem);
      background: rgba(0, 0, 0, 0.3);
    }
    .filter-tit {
      background: white;
      display: flex;
      div {
        width: 100%;
        height: 80px;
        text-align: left;
        padding: 20px 36px;
        span {
          color: #a0a0a0;
        }
        p {
          font-size: 16px;
          line-height: 1.8;
          height: 52px;
          width: 180px;
          overflow: hidden;
        }
        &:first-child {
          margin-right: 30px;
          position: relative;
          background-color: #e6f3ff;
          text-decoration: none;
          font-size: 20px;
          &::after {
            content: "";
            position: absolute;
            right: -30px;
            top: 0;
            border-left: 30px solid #e6f3ff;
            border-top: 60px solid transparent;
            border-bottom: 60px solid transparent;
          }
        }
        &:last-child {
          padding-left: 56px;
        }
      }
    }
    .filter-but {
      background: white;
      display: flex;
      div {
        width: 100%;
        line-height: 90px;
        font-size: 16px;
        &:first-child {
          background: white;
          color: #a0a0a0;
        }
        &:last-child {
          background: #0992fd;
          color: white;
        }
      }
    }
  }
}
</style>

<template>
  <div class="common-report-time">
    <ul>
      <li :class="{'active':isTime==index+1}" v-for="(item,index) in data" :key="index" @click="timeToggle(index)">{{item}}</li>
      <li @click.stop="timeToggle(4)">
        <div :class="{'blue':isTime==5}" class="filter" @click.stop="openFilter(true)">
          筛选
          <i class="iconfont minku-rili"></i>
        </div>
        <div class="filter-box" v-show="isShow">
          <div class="filter-text">
            <div class="filter-tit">
              <div @click.stop="onDate(true)">
                <span>开始时间</span>
                <p>{{startDate}}</p>
              </div>
              <div @click.stop="onDate(false)">
                <span>结束时间</span>
                <p>{{endDate}}</p>
              </div>
            </div>
            <div class="filter-but">
              <div @click.stop="openFilter(false)">取消</div>
              <div @click.stop="manage">确定</div>
            </div>
          </div>
          <div class="filter-bg" @click.stop="openFilter(false)"></div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'common-report-time',
  props: {
    isTime: {
      // type: [Number, String, Object, Boolean],
      type: Number,
      default() {
        return 1
      }
    }
  },
  data() {
    return {
      data: [
        '本日',
        '本周',
        '本月',
        '本年'
      ],
      isShow: false,
      startDate: '',
      endDate: ''
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.timeToggle(this.isTime - 1)
  },
  methods: {
    timeToggle(i) {
      // 筛选使用 数据展示使用
      this.startDate = sessionStorage.getItem('startDate')
      this.endDate = sessionStorage.getItem('endDate')
      // end

      this.isTime = i + 1
      this.isShow = false

      let date = new Date()
      var strYear = date.getFullYear()
      let strMonth = date.getMonth() + 1
      let strDate = date.getDate()

      if (strMonth >= 1 && strMonth <= 9) strMonth = '0' + strMonth
      if (strDate >= 0 && strDate <= 9) strDate = '0' + strDate
      var nowMonth = [strYear, strMonth].join('-')
      var nowDate = [strYear, strMonth, strDate].join('-')

      //获取本周
      let strDay = date.getDay() //今天是这周的第几天
      let stepSunDay = -strDay + 1 //上周日距离今天的天数（负数表示）
      if (strDay == 0) stepSunDay = -7 // 如果今天是周日
      // let stepMonday = 7 - strDay // 周一距离今天的天数（负数表示）
      let time = date.getTime()
      let monday = new Date(time + stepSunDay * 24 * 3600 * 1000)
      // let sunday = new Date(time + stepMonday * 24 * 3600 * 1000)
      var nowWeekStart = this._utils.dateTime(monday, false) //本周一的日期 （起始日期）
      // var nowWeekEnd = this._utils.dateTime(sunday, false) // 本周日的日期 （结束日期）

      // 筛选当月的最后一天
      // var twoMonth = 2 == Number(strMonth)
      // var pick = [1, 3, 5, 7, 8, 10, 12].join().indexOf(Number(strMonth))
      // var pickNum = twoMonth ? strYear / 4 == 0 ? 29 : 28 : pick < 0 ? 30 : 31
      // if (pickNum >= 0 && pickNum <= 9) pickNum = `0${pickNum}`

      sessionStorage.setItem('play', this.isTime)

      if (i == 4) return false

      switch (i) {
        case 0:
          this.startDate = `${nowDate} 00:00:00`
          // this.endDate = `${nowDate} 23:59:59`
          break
        case 1:
          this.startDate = `${nowWeekStart} 00:00:00`
          // this.endDate = `${nowWeekEnd} 23:59:59`
          break
        case 2:
          this.startDate = `${nowMonth}-01 00:00:00`
          // this.endDate = `${nowMonth}-${pickNum} 23:59:59`
          break
        case 3:
          this.startDate = `${strYear}-01-01 00:00:00`
          // this.endDate = `${strYear}-12-31 23:59:59`
          break
        default:
          break
      }
      this.endDate = `${nowDate} 23:59:59`
      sessionStorage.setItem('startDate', this.startDate)
      sessionStorage.setItem('endDate', this.endDate)

      let res = {
        startDate: this.startDate,
        endDate: this.endDate,
        particle: this.isTime
      }

      this.$emit('timeToggle', res)
    },
    openFilter(val) {
      this.isShow = val
    },
    onDate(val) {
      var _this = null
      this.$picker.show({
        type: 'datePicker',
        onOk: (e) => {
          let m = e[6] == '-' ? `0${e[5]}` : e[5]
          if (e[8] == undefined) {
            let d = e[8] == 'undefined' ? e[7] : `0${e[7]}`
            _this = `${e[0]}${e[1]}${e[2]}${e[3]}${e[4]}${m}${e[6]}${d}`
          } else if (e[6] == '-' && e[8] != undefined) {
            _this = `${e[0]}${e[1]}${e[2]}${e[3]}${e[4]}${m}${e[6]}${e[7]}${e[8]}`
          } else if (e[8] != undefined && e[9] == undefined) {
            let d = e[9] == 'undefined' ? e[8] : `0${e[8]}`
            _this = `${e[0]}${e[1]}${e[2]}${e[3]}${e[4]}${e[5]}${e[6]}${e[7]}${d}`
          } else _this = `${e}`

          if (new Date().getTime() < new Date(_this).getTime()) {
            if (val) this.startDate = ''
            if (!val) this.endDate = ''
            this._utils.tipMessage('请选择过去时间')
            return false
          }

          if (val) {
            this.startDate = `${_this} 00:00:00`
            sessionStorage.setItem('startDate', this.startDate)
          } else {
            this.endDate = `${_this} 23:59:59`
            sessionStorage.setItem('endDate', this.endDate)
          }

          if (new Date(this.startDate).getTime() > new Date(this.endDate).getTime()) {
            this.endDate = ''
            this._utils.tipMessage('结束时间必须大于开始时间')
            return false
          }
        }
      })
    },
    manage() {
      sessionStorage.setItem('play', 5)
      let startTime = new Date(this.startDate).getTime()
      let endTime = new Date(this.endDate).getTime()
      let dates = Math.floor((endTime - startTime)) / (1000 * 60 * 60 * 24)

      let res = {
        startDate: sessionStorage.getItem('startDate'),
        endDate: sessionStorage.getItem('endDate'),
        particle: 1
      }

      // if (dates > 365) return this._utils.tipMessage(`数据年代久远，已消失得无影无踪`)
      if (Math.round(dates) > 30) res.particle = 3 //查周
      if (Math.round(dates) > 365) res.particle = 3 //查月
      if (Math.round(dates) > 730) res.particle = 5 //查年

      this.$emit('timeToggle', res)
      this.openFilter(false)
    }
  }
}
</script>
