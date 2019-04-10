<template>
  <section class="page-list">
    <div class="top">
      <div class="text">
        全国
        <span>v</span>
      </div>
      <div class="input">
        <input placeholder="搜索门店名称" type="text">
      </div>
      <div class="ico">图标</div>
    </div>

    <div class="nav">
      <div @click="classify">全部分类</div>
      <div @click="ctiy">全城</div>
      <div @click="distance">距离排序</div>
    </div>

    <div class="list">
      <ul>
        <li @click="etail(1)">
          <div class="left">
            <img alt src="https://files.1card1.cn/g1/M02/1A/98/CgoMA1nzTWuAGhjYAAA13yhGUKA430.jpg">
          </div>
          <div class="rigth">
            <div clss="title">标题标题标题标题</div>
            <div class="ddrii">描述</div>
            <div class="ad">地址</div>
          </div>
        </li>
      </ul>
    </div>

    <div @click="tipClose" class="page-tip" v-show="classifyShow">
      <ul>
        <li @click.stop="tipList(1)">列表标题</li>
        <li @click.stop="tipList(1)">列表标题</li>
        <li @click.stop="tipList(1)">列表标题</li>
        <li @click.stop="tipList(1)">列表标题</li>
        <li @click.stop="tipList(1)">列表标题</li>
        <li @click.stop="tipList(1)">列表标题</li>
        <li @click.stop="tipList(1)">列表标题</li>
        <li @click.stop="tipList(1)">列表标题</li>
      </ul>
    </div>

    <div @click="tipClose" class="page-tip" v-show="ctiyShow">
      <ul>
        <li @click.stop="tipList(2)">列表</li>
        <li @click.stop="tipList(2)">列表</li>
        <li @click.stop="tipList(2)">列表</li>
        <li @click.stop="tipList(2)">列表</li>
      </ul>
    </div>

    <div @click="tipClose" class="page-tip" v-show="distanceShow">
      <ul>
        <li @click.stop="tipList(3)">列表标题列表标题</li>
        <li @click.stop="tipList(3)">列表标题列表标题</li>
        <li @click.stop="tipList(3)">列表标题列表标题</li>
        <li @click.stop="tipList(3)">列表标题列表标题</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      page: {
        title: '',
        page: 1,
        size: 10,
      },
      loadMoreFlag: false,
      classifyShow: false,
      ctiyShow: false,
      distanceShow: false
    }
  },
  computed: {
    GoodsList () {
      return this.$store.getters['shop/GoodsList'] || []
    },
    token () {
      return this.$store.getters['common/token']
    }
  },
  created () { },
  mounted () { },
  methods: {
    // 加载数据
    loadData () {
      let data = {
        token: this.token,
        page: this.page
      }
      this.loadMoreFlag = false
      let _params = {
        paramsDate: data,
        callBack: () => {
          this.loadMoreFlag = true
        }
      }
      this.$store.dispatch('shop/GoodsList', _params)
    },
    etail (e) {
      this.$router.push({
        path: '/shop/detail',
        query: {
          id: e
        }
      })
    },
    classify () {
      this.classifyShow = !this.classifyShow
      this.ctiyShow = false
      this.distanceShow = false
    },
    ctiy () {
      this.ctiyShow = !this.ctiyShow
      this.classifyShow = false
      this.distanceShow = false
    },
    distance () {
      this.distanceShow = !this.distanceShow
      this.classifyShow = false
      this.ctiyShow = false
    },
    tipList (e) {
      console.log(e)
    },
    tipClose () {
      this.classifyShow = false
      this.ctiyShow = false
      this.distanceShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.page-list {
  width: 10rem;
  height: 100%;
  font-size: 14px;
  .top {
    padding: 0.2rem 0;
    width: 10rem;
    display: flex;
    justify-content: space-around;
    line-height: 0.64rem;
    .text {
      width: 12%;
    }
    .input {
      width: 68%;
      border-radius: 0.11rem;
      overflow: hidden;
      input {
        border: none;
        height: 0.69rem;
        width: 100%;
        background: #e8e8e8;
        text-align: center;
      }
    }
    .ico {
      width: 10%;
    }
  }
  .nav {
    display: flex;
    background: #eee;
    height: 0.64rem;
    line-height: 0.64rem;
    padding: 0.213333rem 0;
    div {
      width: 100%;
      text-align: center;
      border-right: 2px solid #e8e8e8;
    }
  }
  .list {
    li {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding: 0.4rem 0.27rem;
      height: 1.92rem;
      overflow: hidden;
      .left {
        margin-right: 0.4rem;
        img {
          width: 3.49rem;
        }
      }
      .rigth {
        .ddrii {
          font-size: 12px;
          color: #999;
          margin: 0.33rem 0;
        }
        .ad {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}

.page-tip {
  font-size: 14px;
  background: rgba($color: #000000, $alpha: 0.3);
  position: absolute;
  width: 100%;
  height: calc(100% - 2.2rem);
  left: 0;
  top: 2.2rem;
  ul {
    background: white;
    max-height: 5.8rem;
    overflow-y: auto;
    li {
      border-bottom: 1px solid #e8e8e8;
      line-height: 0.96rem;
      padding: 0 0.4rem;
    }
  }
}
</style>
