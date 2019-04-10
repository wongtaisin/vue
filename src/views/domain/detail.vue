<template>
  <section class="page-domain-detail">
    <common-banner-img></common-banner-img>
    <common-inside-title :cn="`金融银行法律服务中心`" :icon="false"></common-inside-title>
    <div class="content">内容</div>
  </section>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    getDetail () {
      return this.$store.getters['shop/getDetail']
    }
  },
  created () { },
  mounted () { },
  methods: {
    loadData () {
      let data = {
        id: this.form.id
      }
      let _params = {
        paramsDate: data,
        callBack: () => {

        }
      }
      this.$store.dispatch('shop/getDetail', _params)
    }
  }
}
</script>

<style scoped lang="scss">
.page-domain-detail {
  .content {
    width: 1080px;
    margin: 40px auto 60px;
  }
}
</style>
