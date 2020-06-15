<template>
  <div class="management-analysis">
    <component-title style="margin-left: 48px" title="工人分析"></component-title>
    <div class="top">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <p>在册</p>1200
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <p>未进场</p>1200
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <p>进场</p>1200
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <p>已退场</p>1200
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="diagram">
      <div class="left">
        <analysis-sex></analysis-sex>
        <div class="progress">
          <el-progress :percentage="75" :width="130" type="circle"></el-progress>
          <p style="text-align: center;">合同签订率</p>
        </div>
      </div>
      <div class="right">
        <analysis-age></analysis-age>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentTitle from "@/components/title"
import analysisSex from '@/views/management/analysis/sex'
import analysisAge from '@/views/management/analysis/age'
export default {
  name: 'management-analysis',
  components: {
    ComponentTitle,
    analysisSex,
    analysisAge
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.management-analysis {
  width: 565px;
  .macrame {
    width: 408px;
  }
  .top {
    width: 90%;
    margin: 24px auto 0;
    text-align: center;
    p {
      color: #6f83a0;
      margin-bottom: 8px;
    }
  }
  .diagram {
    display: flex;
    justify-content: space-between;
    .left {
      width: 220px;
      margin-left: 30px;
    }
  }
  .progress {
    width: 130px;
    margin-top: 20px;
    margin-left: 20px;
    p {
      margin-top: 5px;
    }
  }
  .el-progress__text {
    font-size: 26px !important;
    color: white;
  }
  .el-progress-circle__track {
    stroke: #153359;
  }
}
</style>
