<template>
  <div class="small-table">
    <el-table
      :data="initData"
      :cell-style="getCellStyle"
      :header-cell-style="getHeadCellStyle"
      :row-style="getSmallTableRowStyle"
      style="width: 100%;background:#0e1828;"
    >
      <el-table-column
        prop="index"
        label="序号"
        width="70"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="问题项"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="count"
        label="累积数量"
        width="100"
      >
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import tableMixin from "@/mixin/table.js";

export default {
  name: "small-table",
  props: ["data"],
  mixins: [tableMixin],
  computed: {
    initData: function() {
      if (this.data == undefined || this.data == []) {
        return [];
      }
      // let field = 'count'
      let date_arr = [],
        arr = [],
        new_arr = [];
      // ↓↓↓ 排序
      this.data.forEach((item, i) => {
        date_arr.push(item.count + "+" + i);
      });
      date_arr.sort().reverse();
      date_arr.forEach((item) => {
        arr.push(item.split("+")[1]);
      });
      arr.forEach(el => {
        new_arr.push(this.data[el]);
      });
      new_arr.forEach((el, index) => {
        new_arr[index].index = index + 1;
      });
      return new_arr;
    }
  }
};
</script>

<style lang="scss">
</style>
