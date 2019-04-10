<template>
  <section class="page-home">
    <law-sidebar></law-sidebar>
  </section>
</template>

<script>
import lawSidebar from './template/sidebar.vue';
export default {
  components: {
    lawSidebar,
  },
  data () {
    return {

    }
  },
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style lang="scss" scoped>
.page-home {
  width: 100%;
  min-height: 100%;
  font-size: 14px;
}
</style>
