<template>
  <div
    :id="id"
    class="block-line-gauge"
  ></div>
</template>

<script>
import echarts from '@/utils/echarts'
export default {
  props: {
    data: {
      type: Array,
      default: () => [5, 17, '8.6km/h'],
    },
  },
  computed: {
    id() {
      return `block-line-gague-${Math.random() * (new Date().getTime())}`;
    },
  },
  methods: {
    initData() {
      // const data = this.data;

      const split = this.data[1];
      this.data[0] = this.data[0] * 1;
      // const end_num = -(Math.floor((this.data[0] / split) * 240) - 210);
      const color_arr = [];


      const white_arr = [];
      for (let i = 0; i < split; i++) {
        white_arr.push([(i + 1) / split, '#464d56']);
        if (i < this.data[0]) {
          color_arr.push([(i + 1) / split, '#3581fb']);
        }
      }

      const option = {
        series: [
          {
            type: 'gauge',
            center: ['45%', '40%'],
            max: 17,
            startAngle: 210,
            endAngle: -30,
            splitNumber: 17,
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#030C1A',
                width: 1,
              },
              length: 5,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: white_arr,
                width: 5,
              },
            },
            axisLabel: {
              show: false,
            },
            detail: {
              color: 'transparent',
            },
            pointer: {
              show: false,
            },
            title: {
              show: true,
              offsetCenter: [0, '100%'],
              textStyle: {
                color: '#FFF',
                fontSize: 12,
              },
            },
          },
        ],
      };

      if (this.data[0] !== 0) {
        option.series.push({
          type: 'gauge',
          center: ['45%', '40%'],
          startAngle: 210,
          endAngle: -30,
          detail: {
            offsetCenter: [0, '0%'],
            formatter: '{value}',
            color: '#fff',
            textStyle: {
              fontSize: 14,
              fontWeight: 600,
            },
            backgroundColor: '#3a4c68',
            borderRadius: 50,
          },
          splitNumber: Math.floor(this.data[0]),
          data: [{ value: Math.floor(this.data[0]), name: this.data[2] }],
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            splitNumber: 1,
            lineStyle: {
              color: '#030C1A',
              width: 1,
            },
            length: 5,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: color_arr,
              width: 5,
            },
          },
          pointer: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          title: {
            show: true,
            offsetCenter: [0, '100%'],
            textStyle: {
              color: '#FFF',
              fontSize: 12,
            },
          },
        });
      } else {
        option.series[0].data = [{ value: 0, name: this.data[2] }];
      }

      const el = echarts.init(document.getElementById(this.id));
      el.clear();
      el.setOption(option);
    },
  },
  mounted() {
    this.initData();
  },
};
</script>

<style lang="scss">
.block-line-gauge {
  width: 109px;
  height: 100px;
  font-size: 12px;
  position: relative;
  color:#a3b4cc;

  &:before{
    content: '0';
    position: absolute;
    bottom: 28px;
    left: 8px;
  }

  &:after {
    content: '17级';
    position: absolute;
    bottom: 28px;
    right: 0px;
  }
}
</style>
