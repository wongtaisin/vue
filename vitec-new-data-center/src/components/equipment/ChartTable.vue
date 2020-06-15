<template>
  <div class="chart-table">
    <component-title title="设备异常运行报警记录表"></component-title>
    <div class="chart-header">
      <el-date-picker
        class="date-pick"
        style="margin-top: 0"
        v-model="date_pick"
        size="medium"
        value-format="yyyy-MM-dd"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="handleDatePicker"
      >
      </el-date-picker>

      <div>
        <button class="button" :disabled="page === 1" @click="getPrevPage">上一页</button>
        <button class="button" :disabled="page === total" @click="getNextPage">下一页</button>
      </div>
    </div>

    <el-table
      :data="table_data"
      class="table"
      :height="280"
      :header-cell-style="handleHeaderCellStyle"
      :cell-style="handleCellStyle"
      :row-style="handleRowStyle"
    >
      <el-table-column
        type="index"
        label="序号"
        width="64"
      ></el-table-column>
      <el-table-column
        prop="tower_name"
        label="设备名称"
        width="112"
      ></el-table-column>
      <el-table-column
        prop="driver_name"
        label="驾驶司机"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="alarm_value"
        label="报警值"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="peak_value"
        label="实际值"
        width="100"
      ></el-table-column>
      <el-table-column label="报警类型" width="110">
        <template slot-scope="scope">{{scope.row.type | filterAlarmType}}</template>
      </el-table-column>
      <el-table-column label="报警时间" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.over_start_time}}-{{scope.row.over_end_time}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ComponentTitle from "@/components/title";

import { getFirstOfMonth, getToday } from "@/utils/formdate.js";

import { fetchEquipmentAlarmRecordTable } from "@/api/equipment";

import { ALARM_TYPES } from '@/utils/constants'

import commonMixin from './mixin'

export default {
  mixins: [commonMixin],
  name: "Chart-Table",
  filters: {
    filterAlarmType: function(value) {
      return ALARM_TYPES[value || 0]
    }
  },
  components: {
    ComponentTitle
  },
  data() {
    return {
      page: 1,
      total: 0,
      date_pick: [getFirstOfMonth(), getToday()],
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
      table_data: undefined
    };
  },
  methods: {
    getPrevPage() {
      if (this.page === 1) return
      this.page -= 1
      this.handleDatePicker()
    },
    getNextPage() {
      this.page += 1
      this.handleDatePicker()
    },
    async handleDatePicker() {
      const params = {
        start_time: this.date_pick[0],
        end_time: this.date_pick[1],
        total: 10,
        page: this.page
      }
      let arr = []
      try {
        const res = await fetchEquipmentAlarmRecordTable(params)
        arr = res.data.map(one => ({
          ...one,
          alarm_value: +one.alarm_value === 0 ? '-' : one.alarm_value,
          peak_value: +one.peak_value === 0 ? '-' : one.peak_value,
        }))
        this.page = res.page.current_page
        this.total = res.page.last_page
      } catch (error) {
        console.error(error)
      }
      this.table_data = arr
      // let params = {
      //   start_time: this.date_pick[0],
      //   end_time: this.date_pick[1]
      // };
      // let arr = [];
      // let tower_crane_params = Object.assign(params, { cate: 1 });
      // await fetchEquipmentAlarmRecordTable(tower_crane_params).then(res => {
      //   arr = arr.concat(...res.data);
      // });
      // let elevator_params = Object.assign(params, { cate: 2 });
      // await fetchEquipmentAlarmRecordTable(elevator_params).then(res => {
      //   arr = arr.concat(...res.data);
      // });
      // this.table_data = arr;
    },
    handleRowStyle({ rowIndex }) {
      if (rowIndex % 2) {
        return 'background:#192538;'
      } else {
        return 'background: transparent;'
      }
      // return 'background:#192538;'
    },
    handleCellStyle({ columnIndex }) {
      let str = "";
      if (columnIndex == 0) {
        str += "padding-left: 16px;";
      }
      str += 'padding-top: 9px;padding-bottom: 9px;'
      return str;
    },
    handleHeaderCellStyle({ columnIndex }) {
      let str = ''
      if (columnIndex == 0) {
        str += "padding-left: 16px;";
      }
      str += 'padding-top: 9px;padding-bottom: 8px;background:#192538;color: #fff;border-bottom: 1px solid #3a4c68;'
      return str;
    },
    init() {
      this.handleDatePicker();
    }
  },
  mounted() {
    this.handleDatePicker();
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/DatePicker.scss";

.chart-table {
  margin-top: 26px;

  .table {
    margin-top: 16px;
    background: transparent;
    color:#ffffff;
    // height: 280px;
    // overflow-y: scroll
  }

  /deep/ .el-table th > .cell, .el-table .cell {
    padding: 0;
  }

  /deep/ .el-table::before {
    height: 0;
  }

  /deep/ .el-table td, .el-table th.is-leaf {
    border-bottom: none;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #212e3e !important;
  }
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;

  .button {
    padding: 4px 12px;
    background: #131d2d;
    color: #a3b4cc;
    cursor: pointer;
    border-radius: 4px;
    border: #3a4c68 1px solid;
    margin-left: 10px;
  }
}
</style>
