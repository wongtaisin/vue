<template>
  <section class="page-team">
    <common-banner-img></common-banner-img>
    <div class="content">
      <common-inside-title :cn="`专业团队`" :en="`Professional TEAM`"></common-inside-title>
      <ul class="list">
        <li :key="i" @click="changeMenu(item, i)" v-for="(item, i) in list">
          <div class="img">
            <img :src="item.img" alt>
          </div>
          <div class="text">
            <div class="cont">
              <div class="name">{{item.name}}</div>
              <div class="line"></div>
              <div>
                专业领域：
                <div>{{item.text}}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      list: [
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554529135898&di=933fd82861291dbe9451d7ac7fa84fca&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F6ffa5773gw1e9xggeq31tj21kw11xgqq.jpg',
          name: '陈一❤新',
          text: '资本市场/证券, 私募股权与投资 基金',
          id: 1
        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554529135898&di=933fd82861291dbe9451d7ac7fa84fca&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F6ffa5773gw1e9xggeq31tj21kw11xgqq.jpg',
          name: '陈er❤新',
          text: '资本市场/证券, 私募股权与投资 基金',
          id: 1

        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554529135898&di=933fd82861291dbe9451d7ac7fa84fca&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F6ffa5773gw1e9xggeq31tj21kw11xgqq.jpg',
          name: '陈er❤新',
          text: '资本市场/证券, 私募股权与投资 基金',
          id: 1
        }
      ]
    }
  },
  created () { },
  mounted () { },
  methods: {
    changeMenu (id) {
      this.$router.push({
        path: '/team/detail',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.page-team {
  width: 100%;
  min-height: 100%;
  .content {
    width: 1080px;
    margin: 0 auto 60px;
    .list {
      width: 1080px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0 auto;
      li {
        width: 530px;
        height: 240px;
        border: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
        &:hover {
          color: white;
          background: #c12219;
          animation: pageTeamLi 0.5s alternate;
          animation-fill-mode: forwards;
          animation-direction: alternate;
          img {
            animation: pageTeamImg 0.5s alternate;
            animation-fill-mode: forwards;
            animation-direction: alternate;
          }
        }
        .img {
          width: 240px;
          height: 240px;
          overflow: hidden;
          margin-top: -30px;
          margin-left: 20px;
          img {
            width: 240px;
            height: 240px;
          }
        }
        .text {
          width: 226px;
          margin-top: 30px;
          .name {
            font-size: 28px;
            margin-bottom: 5px;
          }
          .line {
            width: 25px;
            height: 2px;
            background: #c12219;
            margin: 10px 0 20px;
            border-radius: 2px;
          }
        }
      }
    }
  }
}
@keyframes pageTeamLi {
  0% {
    color: black;
    background: white;
  }
  100% {
    background: #c12219;
  }
}
@keyframes pageTeamImg {
  0% {
    width: 240px;
    height: 240px;
  }
  100% {
    width: 260px;
    height: 260px;
  }
}
</style>
