<template>
  <section class="page-domain">
    <common-banner-img></common-banner-img>
    <div class="content">
      <common-inside-title :cn="`专业领域`" :en="`Professional field`"></common-inside-title>
      <ul class="list">
        <li :key="i" @click="changeMenu(item, i)" v-for="(item, i) in list">
          <div class="icon">
            <!-- <i class="iconfont icon-sousuo"></i> -->
            <img :src="item.img" alt>
          </div>
          <div class="text">
            <div class="dis">
              <p>{{item.text}}</p>
              <span>{{item.en}}</span>
            </div>
            <div class="line"></div>
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
          text: '普惠金融法律服务中心',
          en: 'enenennenememeem',
          id: 168
        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554529135898&di=933fd82861291dbe9451d7ac7fa84fca&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F6ffa5773gw1e9xggeq31tj21kw11xgqq.jpg',
          name: '陈er❤新',
          text: '普惠金融法律服务中心',
          id: 1

        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554529135898&di=933fd82861291dbe9451d7ac7fa84fca&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F6ffa5773gw1e9xggeq31tj21kw11xgqq.jpg',
          name: '陈er❤新',
          text: '普惠金融法律服务中心',
          id: 1
        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554529135898&di=933fd82861291dbe9451d7ac7fa84fca&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F6ffa5773gw1e9xggeq31tj21kw11xgqq.jpg',
          name: '陈er❤新',
          text: '普惠金融法律服务中心',
          id: 1
        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554529135898&di=933fd82861291dbe9451d7ac7fa84fca&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F6ffa5773gw1e9xggeq31tj21kw11xgqq.jpg',
          name: '陈er❤新',
          text: '普惠金融法律服务中心',
          id: 1
        },
      ]
    }
  },
  created () { },
  mounted () { },
  methods: {
    changeMenu (item) {
      this.$router.push({
        path: '/domain/detail',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.page-domain {
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
        width: 215px;
        height: 100px;
        background: #f8f8f8;
        padding: 20px;
        margin-top: 20px;
        &:hover {
          color: white;
          background: #c12219;
          animation: pageDomainmLi 0.5s alternate;
          animation-fill-mode: forwards;
          animation-direction: alternate;
          .text {
            .dis {
              span {
                color: white;
              }
            }
            .line {
              background: white;
            }
          }
        }
        .icon {
          height: 24px;
          overflow: hidden;
          .iconfont {
            font-size: 24px;
          }
          img {
            width: 28px;
            height: 28px;
          }
        }
        .text {
          margin-top: 20px;
          .dis {
            p {
              font-size: 16px;
              margin-bottom: 5px;
            }
            span {
              font-size: 12px;
              color: #666;
            }
          }
          .line {
            width: 25px;
            height: 2px;
            background: #c12219;
            margin-top: 5px;
            border-radius: 2px;
          }
        }
      }
    }
  }
}
@keyframes pageDomainmLi {
  0% {
    color: black;
    background: white;
  }
  100% {
    background: #c12219;
  }
}
</style>
