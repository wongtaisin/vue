<template>
  <div style="height:292px"
    class="echarts-bar"
    :id="id"
  ></div>
</template>

<script>
import echarts from '@/utils/echarts'
export default {
  name: "echarts-bar",
  props: {
    data: {
      // 数组[[safety]]
      type: Array
    },
    color_arr: {
      type: Array
    },
    classify: {
      // 分类 (需要注意的是，首先传入的是质量、然后是安全)，如果是单项则传入的仍然是数组
      type: Array
    }
  },
  data() {
    return {
      base_data: undefined
    };
  },
  methods: {
    draw() {
      if (this.base_data == undefined || this.base_data.length == 0) return;
      // for(let i = 0; i < this.base_data.length; i ++) {
      //   if (this.base_data[i] === undefined) return;
      // }
      // 数据、x轴数据、提示数据
      let series_data = [],
        x_data = [],
        legend_data = [];
      this.classify.forEach(element => {
        element.forEach(el => {
          legend_data.push({name: el, icon: 'path://M0,2 Q0,0 2,0 L8,0 Q10,0 10,2 L10,8 Q10,10 8,10 L2,10 Q0,10 0,8 z'});
        });
      });

      let get_build_num = 0;
      // 如果内部是多个数组(多个一般为2个，分别是质量数组/安全数组)
      if (this.base_data[1]) {
        // 如果存在第二个数组
        get_build_num =
          this.base_data[0].length > this.base_data[1].length ? 0 : 2;
      }
      // else {
      //   // 如果内部不是数组
      //   for(let i = 0; i < this.base_data.length; i ++) {
      //     x_data.push(this.base_datap[i].building);
      //   }
      // }

      // 以数组长度多的为主设置x轴数据
      for (let i = 0; i < this.base_data[get_build_num].length; i++) {
        x_data.push(this.base_data[get_build_num][i].building);
      }
      if (this.base_data.length > 1) {
        // 避免短数组的楼栋长数组内没有
        get_build_num = get_build_num == 0 ? 1 : 0;
        for (let i = 0; i < this.base_data[get_build_num].length; i++) {
          if (!x_data.includes(this.base_datap[get_build_num][i].building)) {
            x_data.push(this.base_datap[get_build_num][i].building);
          }
        }
      }

      // 数据补足
      for (let i = 0; i < this.base_data.length; i++) {
        let data = this.base_data[i];
        for (let j = 0; j < data.length; j++) {
          // 如果楼栋与x轴数据不符，说明缺少，需要补足
          if (data[j].building !== x_data[j]) {
            data.splice(j, 0, {
              building: x_data[j],
              count: {
                one: 0,
                three: 0,
                tow: 0
              }
            });
          }
        }

        for (let k = 0; k < this.classify[i].length; k++) {
          let value = [];
          for (let j = 0; j < data.length; j++) {
            value.push(data[j].count[Object.keys(data[j].count)[k]]);
          }
          series_data.push({
            name: this.classify[i][k],
            type: "bar",
            data: value,
            stack: "分组" + i,
            barWidth: 20,
            itemStyle: {
              barBorderRadius: [2, 2, 0, 0] 
            }
          });
        }
      }

      if (this.classify.length > 1) {
        series_data.reverse()
        let arr = series_data.slice(0, 3);
        series_data = series_data.concat(...arr);
      }
      // series_data[series_data.length - 1].itemStyle = { barBorderRadius: [2, 2, 0, 0] }
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "0%",
          right: "5%",
          bottom: '15%',
          containLabel: true
        },
        legend: {
          data: legend_data,
          textStyle: {
            color: "#d3d9e2",
            fontSize: 12
          },
          left: 10,
          itemGap: 40
        },
        xAxis: [
          {
            type: "category",
            data: x_data,
            // data: ['周一哈哈哈哈哈哈哈', '周二哈哈哈哈哈哈哈', '周三哈哈哈哈哈哈哈', '周四哈哈哈哈哈哈哈', 
            // '周五哈哈哈哈哈哈哈', '周六哈哈哈哈哈哈哈', '周日哈哈哈哈哈哈哈',
            // '周1哈哈哈哈哈哈哈','周2哈哈哈哈哈哈哈','周3哈哈哈哈哈哈哈','周4哈哈哈哈哈哈哈','周5哈哈哈哈哈哈哈',
            // '周6哈哈哈哈哈哈哈','周7哈哈哈哈哈哈哈',
            // ],
            axisLine: {
              lineStyle: {
                color: "#6f83a1"
              },

            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: '#fff'
              },
              interval: 0,
              formatter: function(val) {          //新增标签名称换行
                var strs = val.split(''); //字符串数组
                var str = ''
                // eslint-disable-next-line no-cond-assign
                for(var i = 0, s; s = strs[i++];) { //遍历字符串数组
                str += s;
                if(!(i % 2)) str += '\n'; //按需要求余
                }
                return str
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "transparent"
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: '#fff'
              }
            },
            minInterval: 1,
            splitLine: {
              lineStyle: {
                color: '#35445a'
              }
            },
            splitNumber: 3
          }
        ],
        dataZoom: {     //新增滚动条
          show: true,
          realtime: true,
          start: 50,
          end: 100
        },
        series: series_data,
        // series: [
        //     {
        //       name: '质量待整改',
        //       type: "bar",
        //       stack: "分组0",
        //       barWidth: 20,
        //       data: [320, 332, 301, 334, 390, 330, 320,320, 332, 301, 334, 390, 330, 320],
        //       itemStyle:{
        //         barBorderRadius:[2,2,0,0]
        //       }
        //   },
        //   {
        //       name: '质量待整改',
        //       type: "bar",
        //       stack: "分组0",
        //       barWidth: 20,
        //       itemStyle:{
        //         barBorderRadius:[2,2,0,0]
        //       },
        //       data: [120, 132, 101, 134, 90, 230, 210,320, 332, 301, 334, 390, 330, 320]
        //   },
        //   {
        //       name: '质量整改完成',
        //       type: "bar",
        //       stack: "分组0",
        //       barWidth: 20,
        //       itemStyle:{
        //         barBorderRadius:[2,2,0,0]
        //       },
        //       data: [220, 182, 191, 234, 290, 330, 310,320, 332, 301, 334, 390, 330, 320]
        //   },
        // ],
        color: this.color_arr
      };
      let chart = echarts.init(document.getElementById(this.id));
      chart.setOption(option);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    }
  },
  watch: {
    data(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.base_data = newVal;
        this.draw();
      } else {
        return;
      }
    }
  },
  computed: {
    id() {
      return "echarts-bar-" + new Date().getTime();
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.echarts-bar {
  height: 272px;
  color: #fff;
}
</style>
