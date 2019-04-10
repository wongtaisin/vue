<template>
  <section class="page-detail">
    <div class="rules">
      <div class="img">
        <img alt src="https://files.1card1.cn/g1/M02/1A/98/CgoMA1nzTWuAGhjYAAA13yhGUKA430.jpg">
      </div>
      <div class="text">
        <div class="left">
          <div class="tit">【O2O商家】望桐山庄荆楚农家菜</div>
          <div class="ad">望桐路1199号云桐轩文化创意园5号铺</div>
          <div class="ico">
            <i></i>
            <span>距离：</span>
          </div>
        </div>
        <div class="right">
          <a href="tel:15986998644">电话图标</a>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="tit">门店介绍</div>
      <span>里面填写内容</span>
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
    getOrder () {
      return this.$store.getters['shop/getOrder']
    }
  },
  created () { },
  mounted () { },
  methods: {
    loadData () {
      let data = {
        token: this.token,
        id: this.form.id
      }
      let _params = {
        paramsDate: data,
        callBack: () => {

        }
      }
      this.$store.dispatch('shop/getOrder', _params)
    }
  }
}
</script>

<style scoped lang="scss">
.page-detail {
  width: 10rem;
  font-size: 14px;
  background: #f2f2f2;
  min-height: 100vh;
  .rules {
    background: white;
    overflow: hidden;
    margin-bottom: 0.27rem;
    .img {
      height: 5.33rem;
      overflow: hidden;
      img {
        width: 10rem;
        height: 5.33rem;
      }
    }
    .text {
      background: white;
      display: flex;
      padding: 0.27rem 0.4rem;
      .left {
        width: 7.33rem;
        border-right: 1px solid #e8e8e8;
        .tit {
          font-weight: bold;
        }
        .ad {
          margin: 0.27rem 0;
        }
      }
      .right {
        display: flex;
        align-items: center;
        text-align: center;
        margin-left: 0.27rem;
      }
    }
  }
  .content {
    background: white;
    padding: 0 0.27rem;
    .tit {
      padding: 0.27rem 0;
    }
  }
}
</style>
