<style lang="scss" scoped>
.common-error {
  width: 100%;
  height: 100%;
  margin-top: 38%;
  .img {
    width: 300px;
    margin: 0 auto;
    img {
      width: 300px;
      height: 313px;
    }
  }
  .text {
    width: 100%;
    text-align: center;
    margin-top: 30px;
    font-size: 14px;
  }
}
</style>

<template>
  <div class="common-error">
    <div class="img">
      <img :src="src" alt="">
    </div>
    <div class="text">
      {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'common-error',
  props: {
    msg: {
      type: String,
      default() {
        return '暂无数据'
      }
    },
    src: {
      type: String,
      default() {
        return `${this.domain}app/static/img/noData.png`
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>
