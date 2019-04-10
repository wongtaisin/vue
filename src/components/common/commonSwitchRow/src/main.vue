<style lang="scss" scoped>
.weui-cells {
  text-align: left;
  color: #4b4b4b;
  font-size: 15px;
}
</style>

<template>
  <div class="weui-cells weui-cells_form">
    <div class="weui-cell weui-cell_switch">
      <div class="weui-cell__bd" v-text="title"></div>
      <div class="weui-cell__ft">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'common-switch-row',
  props: {
    title: [String]
  },
  data() {
    return {

    }
  },

  computed: {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
