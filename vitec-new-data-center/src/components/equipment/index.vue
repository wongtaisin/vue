<template>
  <div class="equipment-box">
    <equipment-list></equipment-list>
    <div class="chart-box">
      <chart-bar></chart-bar>
      <chart-table></chart-table>
    </div>
  </div>
</template>

<script>
import EquipmentList from './EquipmentList'
import ChartBar from './ChartBar'
import ChartTable from './ChartTable'

export default {
  name: 'Equipment',
  components: {
    EquipmentList,
    ChartBar,
    ChartTable
  }
}
</script>

<style lang="scss">
// .flex-box {
//   box-sizing: border-box;
//   display: flex;
// }
.equipment-box {
  padding: 15px 46px 0 48px;
  box-sizing: border-box;
  display: flex;
}
.chart-box {
  box-sizing: border-box;
  margin-left: 72px;
  width: 792px;
  overflow: hidden;
}
</style>
