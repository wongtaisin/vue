<template>
  <section class="common-footer">
    <div class="copy">版权所有</div>
    <!-- <div class="copy">{{data}}</div> -->
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default () {
        return ''
      }
    },
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.common-footer {
  width: 100%;
  line-height: 32px;
  background: #3a3633;
  position: fixed;
  bottom: 0;
  z-index: 9;
  .copy {
    text-align: center;
    color: white;
  }
}
</style>
