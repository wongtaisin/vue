<template>
  <div class="data-box">
    <div>
      <head-line :title="'安全销项统计分析'"></head-line>
      <el-date-picker
        class="date-input"
        format="yyyy-MM-dd"
        v-model="sales_time"
        type="daterange"
        align="right"
        unlink-panels
        @change="getSalesStatisticsAnalysis"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pick_options"
      ></el-date-picker>
      <echarts-bar
        class="echarts"
        :classify="[['安全待整改', '安全待复核', '安全整改完成']]"
        :color_arr="['#3581FB', '#07D3A8', '#715DD0']"
        :data="[sales_statistics_alalysis_data]"
      ></echarts-bar>
    </div>
    <div>
      <head-line :title="'待销项安全问题统计表'"></head-line>
      <echart-table
        class="problem-table table"
        :data="penging_sales_problem_statistics_data"
        height="320"
      ></echart-table>
    </div>
    <div>
      <head-line :title="'安全问题项统计'"></head-line>
      <div>
        <el-date-picker
          class="date-input"
          format="yyyy-MM-dd"
          v-model="problem_time"
          type="daterange"
          align="right"
          unlink-panels
          @change="getProblemStatisticsData"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pick_options"
        ></el-date-picker>
      </div>

      <echarts-circle
        class="echarts-circle"
        :data="problem_statistics_data"
      ></echarts-circle>
      <small-table
        :data="problem_statistics_data"
        class="echarts-circle table"
      ></small-table>
    </div>
    <div>
      <head-line :title="'安全整改单统计(' + year + ')年'"></head-line>
      <echarts-line
        class="echarts-line"
        :data="annual_survey_data"
        v-if="annual_survey_data"
      ></echarts-line>
    </div>
  </div>
</template>

<script>
import authMixin from "@/mixin/auth";

import HeadLine from "@/components/title";
import EchartsBar from "@/components/echarts-bar";
import EchartTable from "@/components/table";
import EchartsCircle from "@/components/echarts-circle";
import SmallTable from "@/components/table/SmallTable";
import EchartsLine from "@/components/echarts-line";
import {
  fetchSalesStatisticsAnalysis,
  fetchPendingSalesProblemStatistics,
  fetchProblemStatistics,
  fetchAnnualSurvey
} from "@/api/safety";
import {
  getFirstOfMonth,
  getToday,
  // getFullMonth,
  formatDate,
  formData
} from "@/utils/formdate";
import watchMixin from '@/mixin/watch'

export default {
  name: "safety",
  mixins: [authMixin, watchMixin],
  components: {
    HeadLine,
    EchartsBar,
    EchartTable,
    EchartsCircle,
    SmallTable,
    EchartsLine
  },
  data() {
    return {
      websocketRoom: 'safety_data_center',
      websocketType: 'safety',
      sales_time: [getFirstOfMonth(), getToday()],
      problem_time: [getFirstOfMonth(), getToday()],
      pick_options: {
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
      sales_statistics_alalysis_data: undefined,
      penging_sales_problem_statistics_data: undefined,
      year: new Date().getFullYear(),
      problem_statistics_data: undefined,
      annual_survey_data: undefined,
      is_fetch_auth: false
    };
  },
  methods: {
    getSalesStatisticsAnalysis() {
      if(!this.is_fetch_auth) return;
      let params = {
        startTime: formatDate(this.sales_time[0]),
        endTime: formatDate(this.sales_time[1])
      };
      fetchSalesStatisticsAnalysis(params).then(res => {
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
          data[i].building = data[i].building + "栋";
        }
        this.sales_statistics_alalysis_data = data;
      });
    },
    getPendingSalesProblemStatistics() {
      fetchPendingSalesProblemStatistics().then(res => {
        let arr = res.data;
        arr.forEach(item => {
          item.deadline = formData(item.deadline);
          item.building =
            item.building + "栋" + item.zone + "区" + item.floor + "层";
        });
        this.penging_sales_problem_statistics_data = arr;
      });
    },
    getProblemStatisticsData() {
      if(!this.is_fetch_auth) return;
      let params = {
        startTime: formatDate(this.problem_time[0]),
        endTime: formatDate(this.problem_time[1])
      };
      fetchProblemStatistics(params).then(res => {
        this.problem_statistics_data = res.data;
      });
    },
    getAnnualSurveyData() {
      fetchAnnualSurvey().then(res => {
        this.annual_survey_data = res.data.data;
      });
    },
    getData() {
      this.getSalesStatisticsAnalysis();
      this.getPendingSalesProblemStatistics();
      this.getProblemStatisticsData();
      this.getAnnualSurveyData();
    },
    check() {
      this.is_fetch_auth = this.checkAuth(this.auth_arr);
      if(this.is_fetch_auth) {
        this.getData()
      } else if(this.is_fetch_auth === undefined){
        this.$message({
          message: '对不起，你没有权限!',
          type: 'error'
        })
      }
    }
  },
  // mounted() {
  //   this.check()
  // },
  // computed: {
  //   auth_arr() {
  //     return this.$store.state.auth_arr;
  //   }
  // },
  // watch: {
  //   auth_arr() {
  //     this.check()
  //   }
  // }
};
</script>

<style lang="scss">
@import "../assets/scss/data.scss";
</style>
