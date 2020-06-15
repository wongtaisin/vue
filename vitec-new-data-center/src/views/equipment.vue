<template>
  <div id="equipment">
    <!-- <component-head></component-head> -->
    <equipment-page></equipment-page>
  </div>
</template>

<script>
// import ComponentHead from '@/components/head/index'
import EquipmentPage  from '@/components/equipment/index'

export default {
  name: 'app',
  components: {
    // ComponentHead,
    EquipmentPage
  },
  // mounted() {
  //   this.onResize()
  //   window.addEventListener('resize', this.onResize)
  // },
  // methods: {
  //   onResize() {
  //     let el = document.getElementById('app')
  //     let w = window.innerWidth / 1600;
  //     let h = window.innerHeight / 900;
  //     el.style.transform = 'scale(' + w + ',' + h+')'
  //   }
  // }
};
</script>

<style lang="scss">
*, *:before, *:after {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 1600px;
  height: 900px;
  transform-origin: left top;
  background: #030C1A;
  font-size: 14px;
  color: #fff;
  position: fixed;
}
</style>
