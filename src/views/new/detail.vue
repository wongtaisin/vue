<template>
  <section class="page-domain-detail">
    <common-banner-img></common-banner-img>
    <div class="content">
      <div class="common-inside-classify">
        <ul>
          <li>最新咨询</li>
          <li>第二zix</li>
        </ul>
      </div>
      <div class="right">
        <common-inside-title :cn="`金融银行法律服务中心`" :icon="false"></common-inside-title>
        <div class="year">
          2019-04-02
          <span>阅读：126</span>
        </div>
        <div class="text">内容</div>
      </div>
    </div>
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
.common-inside-classify {
  width: 200px;
  background: #46433f;
  li {
    font-size: 18px;
    color: white;
    text-align: center;
    cursor: pointer;
    line-height: 65px;
    &:hover {
      background: #c12219;
    }
  }
}
.page-domain-detail {
  .content {
    width: 1080px;
    display: flex;
    margin: 0 auto;
    .right {
      width: 830px;
      margin-left: 50px;
      margin-bottom: 60px;
      .year {
        font-size: 16px;
        color: #999;
        margin: 40px 0;
      }
      .text {
      }
    }
  }
}
</style>
