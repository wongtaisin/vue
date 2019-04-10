<template>
  <section class="page-team-detail">
    <common-banner-img></common-banner-img>
    <div class="content">
      <div class="introduce">
        <div class="left">
          <p>陈一心</p>
          <ul>
            <li>专业领域：</li>
            <li>毕业院校：</li>
            <li>电话：</li>
            <li>传真：</li>
            <li>邮箱：</li>
            <li>地址：</li>
          </ul>
        </div>
        <div class="right">
          <img
            alt
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554529135898&di=933fd82861291dbe9451d7ac7fa84fca&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F6ffa5773gw1e9xggeq31tj21kw11xgqq.jpg"
          >
        </div>
      </div>
      <div class="describe">内容</div>
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
.page-team-detail {
  .content {
    width: 1080px;
    margin: 60px auto;
    .introduce {
      width: 1080px;
      height: 390px;
      background: #4e4d4d;
      color: white;
      display: flex;
      justify-content: space-between;
      .left {
        width: 640px;
        margin-right: 20px;
        padding: 30px 0 0 30px;
        font-size: 18px;
        p {
          font-size: 32px;
          margin-bottom: 40px;
        }
        ul {
          width: 640px;
        }
        li {
          margin-bottom: 10px;
        }
      }
      .right {
        width: 390px;
        height: 390px;
        img {
          width: 390px;
          height: 390px;
        }
      }
    }
    .describe {
      width: 1018px;
      font-size: 18px;
      padding: 30px;
      border: 1px solid #ddd;
      line-height: 1.6;
    }
  }
}
</style>
