<template>
  <div>
    <el-table
      :data="data"
      :header-cell-style="getHeadCellStyle"
      :cell-style="getCellStyle"
      :row-style="getRowStyle"
      style="height: 320px;width: 100%;background:transparent;"
      @row-click="rowClick"
    >
      <el-table-column
        type="index"
        width="62"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        prop="department"
        label="整改责任单位"
        show-overflow-tooltip
        width="152"
      >
      </el-table-column>
      <el-table-column
        prop="building"
        label="工程部位"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="问题描述"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="deadline"
        width="104"
        label="整改期限"
      >
      </el-table-column>
      <el-table-column
        prop="manager"
        label="整改责任人"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="creater"
        label="发单人"
        width="66"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="整改状态"
      >
      </el-table-column>
    </el-table>
    <el-dialog
      v-loading="loading"
      :title="'问题状态-' + status"
      :visible.sync="dialog_show"
      :modal="false"
      top="70px"
    >
      <div
        v-if="details"
        class="dialog-box"
      >
        <div class="dialog-left_box">
          <div class="dialog-box_left">
            整改责任单位
          </div>
          <div class="dialog-box_middle">
            {{details.department_name}}
          </div>
          <div class="dialog-box_left">
            整改责任人
          </div>
          <div class="dialog-box_middle">
            {{details.manager_name.name}}
          </div>
          <div class="dialog-box_left">
            整改期限
          </div>
          <div class="dialog-box_middle">
            {{details.deadline * 1000 | date('YYYY年M月D日')}}
          </div>
          <div class="dialog-box_left">
            发单人
          </div>
          <div class="dialog-box_middle">
            {{details.creater_name.name}}
          </div>
          <div class="dialog-box_left">
            发单时间
          </div>
          <div class="dialog-box_middle">
            {{details.create_time * 1000 | date('YYYY年M月D日 HH:mm')}}
          </div>
          <div class="dialog-box_left">
            工程部位
          </div>
          <div class="dialog-box_middle">
            {{details.problem.building}}栋 {{details.problem.zone}}区 {{details.problem.floor}}层
          </div>
        </div>
        <div class="dialog-right_box">
          <span>定位</span>
          <div class="img-box"
              v-if="details.problem.floor_plan">
            <img
              :src="details.problem.floor_plan"
              alt="定位平面图"
            >
            <img
              ref="location"
              :style="'left:' + left + ';top:' + top + ';'"
              src="@/assets/location.svg"
              alt="svg"
              class="floor-plan-label"
            >
          </div>
        </div>
      </div>
      <div class="dialog-box" v-if="details">
        <div class="dialog-left_box">
          <div class="dialog-box_left">问题分类</div>
          <div class="dialog-box_middle">{{details.problem.type_name}}</div>
          <div class="dialog-box_left">问题描述</div>
          <div class="dialog-box_middle">{{details.problem.description}}</div>
        </div>
        <div class="dialog-right_box">
          <span>问题照片</span>
          <div class="img-box" v-if="details.problem.image">
            <img :src="details.problem.image.url" alt="问题照片">
          </div>
        </div>
      </div>
      <div class="dialog-box" v-if="details && details.status != 1">
        <div class="dialog-left_box">
          <div class="dialog-box_left">问题回复</div>
          <div class="dialog-box_middle">{{details.problem.content}}</div>
        </div>
        <div class="dialog-right_box">
          <span>整改照片</span>
          <div class="img-box" v-if="details.problem.replyImage">
            <img :src="details.problem.replyImage.url" alt="整改照片">
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMixin from "@/mixin/table.js";
import { getQualityDetails } from "@/api/quality.js";
import { getSafetyDetails } from "@/api/safety.js";

export default {
  name: "echart-table",
  props: ["data"],
  data() {
    return {
      status: undefined,
      dialog_show: false,
      loading: false,
      details: undefined
    };
  },
  mixins: [tableMixin],
  methods: {
    rowClick(row) {
      this.loading = true;
      if (this.$route.name == "quality") {
        getQualityDetails({ id: row.id }).then(res => {
          console.log(res.data);
          this.loading = false;
          this.details = res.data;
        });
      } else if (this.$route.name == "safety") {
        getSafetyDetails({ id: row.id }).then(res => {
          this.loading = false;
          this.details = res.data;
        });
      }
      this.status = row.status;
      this.dialog_show = true;
    }
  },
  computed: {
    left: function() {
      let s = this.details.problem.s * 100 + "%";
      return "calc((100% + " + s + " ) / 2 - 12px )";
    },
    top: function() {
      let h = this.details.problem.h * 100 + "%";
      return "calc((100% + " + h + ") / 2 - 12px" + ")";
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/scroll.scss";
.dialog-box {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  padding-top: 24px;
  padding-bottom: 16px;
  border-top: 1px solid #dddddd;

  &:first-child {
    border-top: none;
    padding-top: 0;
  }
  .dialog-left_box {
    width: 308px;
    display: flex;
    flex-wrap: wrap;
    margin-right: 46px;
  }

  &_left {
    width: 84px;
    margin-right: 24px;
    color: #6f83a1;
    margin-bottom: 8px;
  }

  &_middle {
    width: 200px;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  .dialog-right_box {
    width: 386px;
    color: #6f83a1;
    font-weight: 600;

    span {
      display: inline-block;
      vertical-align: top;
      width: 56px;
      text-align: right;
    }

    .img-box {
      width: 320px;
      display: inline-block;
      position: relative;
      img {
        width: 320px;
        height: 180px;
        margin-left: 10px;
      }
      

        &:first-child img:first-child {
          height: auto;
        }

      .floor-plan-label {
        position: absolute;
        color: red;
        width: 24px;
        height: 24px;
        z-index: 1000;
      }
    }
  }
}
</style>
