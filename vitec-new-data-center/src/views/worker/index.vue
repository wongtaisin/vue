<template lang="pug">
.worker-page
    Header
    .fixed-box.fixed-top
        Block(title='现场作业人员统计')
            operatePage
    .fixed-box.fixed-bottom
        Block(title='班组今日出勤人员统计')
            attendancePage
    .fixed-box.fixed-right
        Block(title='现场管理人员统计')
            siteManagementPage
</template>

<script>
import Block from "@/components/block";

// import Header from '@/components/Header'

import operatePage from "./components/operation";
import attendancePage from "./components/attendance";
import siteManagementPage from "./components/siteManagement";

export default {
  name: "worker-page",
  components: {
    Block,
    // Header,
    siteManagementPage,
    attendancePage,
    operatePage
  }
};
</script>

<style lang="scss" scoped>
$top: 70px;
.fixed-box {
  // @include fixedBox();
  position: fixed;

  &.fixed-top {
    @include position($top, 50%, 50%, 0);
  }
  &.fixed-bottom {
    @include position(50%, 50%, 0, 0);
  }
  &.fixed-right {
    @include position($top, 0, 0, 50%);
  }
}
// .flex-box{
//     height: 100%;
// }
</style>
