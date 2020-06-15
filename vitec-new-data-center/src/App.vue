<template>
  <div id="app">
    <app-head v-if="!$route.meta.headerHidden"></app-head>
    <router-view/>
  </div>
</template>

<script>
import AppHead from '@/components/head'
export default {
  name: 'app',
  components: { AppHead },
  methods: {
    onResize() {
      let el = document.getElementById('app')
      let w = window.innerWidth / 1600;
      // let h = window.innerHeight / 900;
      el.style.transform = 'scale(' + w + ',' + w+')'
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  }
}
</script>


<style lang="scss">
body {
  background: #030c1a;
  height: 100vh;
}
#app {
  font-family: PingFangSC-Regular,'Microsoft Yahei', Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 1600px;
  // height: 900px;
  // height: 100vh;
  transform-origin: left top;
  // position: fixed;
  overflow: auto;
}
*, *:before, *:after {
  margin: 0;
  padding: 0;
}
</style>
