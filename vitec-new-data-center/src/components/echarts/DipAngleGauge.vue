<template>
  <div
    :id="id"
    class="dip-angle-gauge"
  >
    <dip-angle-svg></dip-angle-svg>
  </div>
</template>

<script>
// import echarts from '@/utils/echarts'
import DipAngleSvg from '@/components/svg/DipAngle.vue'
export default {
  name: "Dip-Angle-Gauge",
  computed: {
    id: function() {
      return "dip-angle-gauge-" + Math.random() * new Date().getTime();
    }
  },
  props: {
    data: {
      type: String,
      default: "6"
    }
  },
  methods: {
    initData() {
    }
  },
  mounted() {
    this.initData();
  },
  components: {
    DipAngleSvg
  }
};
</script>

<style>
.dip-angle-gauge {
  width: 109px;
  height: 100px;
}
</style>
