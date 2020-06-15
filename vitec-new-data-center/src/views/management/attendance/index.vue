<template>
  <div class="management-attendance">
    <component-title style="margin-left: 48px" title="工人出勤分析"></component-title>
    <attendance-chart></attendance-chart>
  </div>
</template>

<script>
import ComponentTitle from "@/components/title"
import attendanceChart from '@/views/management/attendance/chart'
export default {
  name: 'management-attendance',
  components: {
    ComponentTitle,
    attendanceChart
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.management-attendance {
  width: 565px;
  margin-top: 66px;
  .macrame {
    width: 368px;
  }
}
</style>
