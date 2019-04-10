<template>
  <section id="init">
    <law-header :data="commonPublic.header"></law-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <law-footer :data="commonPublic.footer"></law-footer>
  </section>
</template>

<script>
import lawHeader from './template/header'
import lawFooter from './template/footer'

export default {
  components: {
    lawHeader,
    lawFooter
  },
  data () {
    return {

    }
  },
  computed: {
    commonPublic () {
      return this.$store.getters['common/commonPublic']
    }
  },
  created () { },
  mounted () {
    this.$store.dispatch('common/commonPublic')
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
#init {
  width: 100%;
  min-height: 100%;
}
</style>
