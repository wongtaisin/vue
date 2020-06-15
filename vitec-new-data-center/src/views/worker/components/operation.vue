<template lang="pug">
.work-operation-block.scroll-box
  .title
    span 总人数
    span.number {{all}}
  .process-blocks.scroll-content
    ScrollBar
      table.process-table
        tr.process-block(v-for='(one, index) in datas', :key='index')
          td.process-name {{one.workType}}
          td.process-percent
            .progress-bar
              .progress-bar__mask(:style='{width: (100-one.percent) + "%"}')
          td.process-amount {{one.qty}}
</template>

<script>
import ScrollBar from "@/components/scroll-bar";
import { getOperators } from "@/api/worker";

export default {
  components: {
    ScrollBar
  },

  data: () => ({
    originals: [],
    datas: [],
    timer: null,
    all: 0
  }),

  methods: {
    dealOriginalData(list) {
      const max = Math.max(...list.map(one => one.qty));
      // let all = 0

      const deals = list.map(one => {
        one.percent = ~~((one.qty / max) * 100);
        // all += one.amount
        return one;
      });

      // console.log(max, list, deals)

      this.datas = deals;
      // this.all = all
    },
    getOperators() {
      getOperators().then(({ qty, data }) => {
        this.all = qty;
        this.dealOriginalData(data);
        setTimeout(() => this.getOperators(), 5000);
      });
    }
  },

  mounted() {
    // this.dealOriginalData(getOperators())
    // this.timer = setInterval(() => {
    //     this.getOperators()
    // }, 2000);
    this.getOperators();
  },

  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
// .work-operation-block {
//     // display: flex;
//     // // justify-content: stretch;
//     // flex-direction: column;

//     height: 100%;
//     overflow: hidden;

//     .process-blocks{
//         // flex: 1;
//         height: 100%;
//         overflow-y: hidden;
//     }
// }

.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: #ffffff;
  // margin-left: 15px;
  margin-bottom: 20px;
  span {
    &.number {
      font-size: 32px;
      margin-left: 20px;
    }
  }
}

$progressHeight: 8px;
.progress-bar {
  display: flex;
  width: 100%;
  height: $progressHeight;
  background-image: linear-gradient(-90deg, #78deff 0%, #74fda6 100%);
  font-size: 0;
  // justify-content: space-around;
  justify-content: flex-end;

  .progress-bar {
    // &__transparent {
    //     height: $progressHeight;
    //     background: transparent;
    //     width: 0;
    // }
    &__mask {
      height: $progressHeight;
      background: #17181d;
      width: 100%;
      transition: width 0.3s linear;
    }
  }
}

// .process-blocks {
//     display: block;

//     .process-block {
//         display: flex;
//         justify-content: flex-start;

//         .proces{
//             &-name{
//                 flex-wrap: nowrap;
//                 word-break: keep-all;
//             }
//         }
//     }
// }

.process-table {
  border-collapse: collapse;
  border: none;
  width: 100%;

  td {
    padding: 4px 4px 4px 0;
  }

  .process {
    &-name {
      font-size: 14px;
      color: #ffffff;
      word-break: keep-all;
      text-align: left;
    }

    &-percent {
      width: 100%;
      min-width: 50%;
    }

    &-amount {
      width: 4em;
      text-align: right;
    }
  }
}
</style>
