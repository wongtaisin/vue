

<template>
  <div class="common-banner-img">
    <img :src="src" alt>
  </div>
</template>

<script>
export default {
  name: 'common-banner-img',
  props: {
    src: {
      type: String,
      default () {
        return `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554529135898&di=933fd82861291dbe9451d7ac7fa84fca&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F6ffa5773gw1e9xggeq31tj21kw11xgqq.jpg`
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.common-banner-img {
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 300px;
  }
}
</style>
