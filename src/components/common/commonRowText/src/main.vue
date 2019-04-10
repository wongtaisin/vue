<style lang="scss" scoped>
.common-row-text_ {
  padding: 32px;
  text-align: left;
  background-color: #ffffff;
  color: #4b4b4b;
  font-size: 14px;
  min-height: 1px;
  overflow: hidden;
  .common-row-title_ {
    padding-right: 10px;
    font-weight: bold;
  }
  &.common-row-bg {
    background-color: #f0eff4;
  }
  .common-row-content_ {
    float: right;
    color: #9097a1;
    .iconfont {
      color: #e4e5e6;
      font-size: 14px;
    }
  }
}
</style>

<template>
  <div class="common-row-text_ common-border" @click="click">
    <span class="common-row-title_" v-text="title"></span>
    <span class="common-row-content_" v-if="cont" v-text="cont"></span>
    <div class="common-row-content_">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'common-row-text',
  props: {
    title: {
      default() {
        return ''
      }
    },
    content: {
      default() {
        return ''
      }
    }
  },
  computed: {
    cont() {
      // if (parseInt(this.content) || parseInt(this.content) === 0) return '￥' + parseFloat(this.content).toFixed(2)
      // else return this.content
      return this.content
    }
  },
  mounted() {

  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
