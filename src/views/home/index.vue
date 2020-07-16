<template>
  <div class="page-index">
    首页
    <router-view></router-view>
    <!-- <common-scroll :options="options" ref="commonScroll">
      <template v-slot:content>
        <div class="content"></div>
      </template>
    </common-scroll>-->
  </div>
</template>

<script>
export default {
  name: 'index',
  metaInfo: {
    title: '首页'
  },
  data () {
    return {
      options: {
        top: 12,
        bottom: 17
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.page-index {
}
</style>
