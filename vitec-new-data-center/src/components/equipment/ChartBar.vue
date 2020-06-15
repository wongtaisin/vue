<template>
  <div>
    <component-title title="设备安全运行分析表"></component-title>
    <el-date-picker
      class="date-pick"
      v-model="analyze_date_pick"
      size="medium"
      value-format="yyyy-MM-dd"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="~"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      @change="handleAnalyzeDatePicker"
    >
    </el-date-picker>
    <div class="flex-box">
      <echarts-bar v-if="analyze_data" class="echarts" :datas="analyze_data"></echarts-bar>
      <ul class="driver-info">
        <li v-for="(item, index) in drivers_info" :key="index" class="flex-box">
          <img :src="item.card_file || default_img" alt="card_file">
          <div class="dirver-info_box">
            <p>{{item.driver_name}}<span>{{item.score}}</span></p>
            <p>{{item.type | filterDriverType}}</p>
          </div>
          
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ComponentTitle from "@/components/title";
import EchartsBar from '@/components/echarts/bar'

import { fetchEquipmentSafetyWorking, fetchEquipmentDriverInfo } from '@/api/equipment.js'

import { getFirstOfMonth, getToday } from '@/utils/formdate.js'


import commonMixin from './mixin'

const url = require('@/assets/images/user.png')
export default {
  mixins: [commonMixin],
  name: "Chart-Bar",
  components: {
    ComponentTitle,
    EchartsBar
  },
  filters: {
    filterDriverType: function (value) {
      if (value == '1') {
        return '塔吊司机'
      } else {
        return '电梯司机'
      }
    }
  },
  data() {
    return {
      default_img: url,
      analyze_date_pick: [ getFirstOfMonth(), getToday()],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      analyze_data: undefined,
      drivers_info: undefined
    };
  },
  methods: {
    handleAnalyzeDatePicker () {
      let params = {
        start_time: this.analyze_date_pick[0],
        end_time: this.analyze_date_pick[1]
      }
      fetchEquipmentSafetyWorking(params).then(res => {
        this.analyze_data = res.data;
      })
    },
    async getDriversInfo () {
      let arr = []
      await fetchEquipmentDriverInfo({cate: 1}).then(res => {
        arr = arr.concat(...res.data)
      })
      await fetchEquipmentDriverInfo({ cate: 2 }).then(res => {
        arr = arr.concat(...res.data)
      })
      this.drivers_info = arr;
    },

    init() {
      this.handleAnalyzeDatePicker();
      this.getDriversInfo();
    }
  },
  mounted () {
    this.init()
  }
};
</script>

<style lang="scss">
@import '~@/assets/scss/DatePicker.scss';

.echarts {
  margin-top: 16px;
}

.driver-info {
  margin-top: 54px;
  margin-left: 20px;
  height: 200px;
  overflow-y: auto;

  li {
    margin-bottom: 20px;
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 2px;
  }

  p {
    margin-left: 16px;
    font-size: 12px;
    margin-bottom: 6px;

    span {
      color:#a3b4cc;
      margin-left: 6px;
    }
  }
}
</style>
