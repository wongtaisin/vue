<template>
  <div class="echart-circle">
    <svg class="hidden">
      <defs>
        <linearGradient
          x1="1"
          y1="0"
          x2="0"
          y2="0"
          id="gradient2"
        >
          <stop
            offset="0%"
            stop-color="#357ffa"
          ></stop>
          <stop
            offset="100%"
            stop-color="#3535cd"
          ></stop>
        </linearGradient>
      </defs>
    </svg>
    <el-progress
      :percentage="angle"
      type="circle"
      :width="67"
      class="circle-1"
      :stroke-width="4"
      :show-text="false"
    ></el-progress>
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      class="svg-circle_inside"
    >
      <circle
        cx="30"
        cy="30"
        r="25"
        stroke="#202835"
        fill="transparent"
      ></circle>
      <circle
        cx="30"
        cy="30"
        r="5"
        fill="#3F4552"
      />
      <path
        d="M30,4 32,31 Q30,34 28,31 z"
        stroke="#3581fb"
        fill="#3581fb"
        :style="'transform: rotate(' + data[0] + 'deg);transform-origin: center center;'"
      />
      <circle
        cx="30"
        cy="30"
        r="1"
        fill="#fff"
      />
    </svg>
    <p>{{show_angle}}</p>
  </div>
</template>

<script>
// import echarts from '@/utils/echarts'
import {Progress} from 'element-ui'
export default {
  name: "Echart-Circle",
  props: {
    data: {
      type: Array,
      default: () => [170, "°"]
    }
  },
  components: {
    ElProgress: Progress
  },
  computed: {
    angle: function() {
      return (this.data[0] / 360) * 100;
    },
    show_angle: function() {
      return this.data[0] + this.data[1];
    }
  }
};
</script>

<style lang="scss">
.echart-circle {
  text-align: center;
  height: 100px;
  position: relative;

  .hidden {
    width: 0;
    height: 0;
  }
  .circle-1 {
    width: 67px;
    height: 67px;
    svg > path:first-of-type {
      stroke: #28303c;
    }
    svg > path:last-of-type {
      stroke: url("#gradient2") !important;
    }
  }

  .svg-circle_inside {
    position: absolute;
    transform: translateX(-63.5px) translateY(3.5px);
  }

  p {
    font-size: 20px;
    margin-top: 4px;
  }
}
</style>
