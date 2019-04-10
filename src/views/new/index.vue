<template>
  <section class="page-new">
    <common-banner-img></common-banner-img>
    <div class="content">
      <div class="common-inside-classify">
        <ul>
          <li>最新咨询</li>
          <li>第二zix</li>
        </ul>
      </div>
      <div class="right">
        <common-inside-title :cn="`最新资讯`" :en="`Jiadesen nformation`"></common-inside-title>
        <ul class="list">
          <li :key="i" @click="changeMenu(item, i)" v-for="(item, i) in list">
            <div class="year">
              <p>{{item.day}}</p>
              {{item.year}}
            </div>
            <div class="img">
              <img :src="item.img" alt>
            </div>
            <div class="text">
              <div class="dis">
                <p>{{item.text}}</p>
                <span>{{item.en}}</span>
              </div>
            </div>
          </li>
        </ul>
        <common-pageContainer :totalPages="50" @current="current"></common-pageContainer>
      </div>
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
          day: '02',
          year: '2018/04',
          id: 168
        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554529135898&di=933fd82861291dbe9451d7ac7fa84fca&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F6ffa5773gw1e9xggeq31tj21kw11xgqq.jpg',
          name: '陈一❤新',
          text: '普惠金融法律服务中心',
          en: 'enenennenememeem',
          day: '02',
          year: '2018/04',
          id: 8
        }, {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554529135898&di=933fd82861291dbe9451d7ac7fa84fca&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F6ffa5773gw1e9xggeq31tj21kw11xgqq.jpg',
          name: '陈一❤新',
          text: '普惠金融法律服务中心',
          en: 'enenennenememeem',
          day: '02',
          year: '2018/04',
          id: 16
        }
      ]
    }
  },
  created () { },
  mounted () { },
  methods: {
    changeMenu (item) {
      this.$router.push({
        path: '/new/detail',
        query: {
          id: item.id
        }
      })
    },
    current (e) {
      console.log(e)
    }
  }
}
</script>

<style lang='scss' scoped>
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
.page-new {
  width: 100%;
  min-height: 100%;
  .content {
    width: 1080px;
    margin: 0 auto;
    display: flex;
    .right {
      width: 830px;
      margin-left: 50px;
      margin-bottom: 40px;
      .list {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 0 auto;
        li {
          display: flex;
          width: 830px;
          padding: 30px 0;
          border-bottom: 1px solid #f8f7f7;
          &:hover {
            // background: #eee;
            // animation: pagenewmLi 0.5s alternate;
            // animation-fill-mode: forwards;
            // animation-direction: alternate;
            // .text {
            //   width: 500px;
            //   .dis {
            //     span {
            //       color: white;
            //     }
            //   }
            //   .line {
            //     background: white;
            //   }
            // }
          }
          .year {
            margin-top: 38px;
            text-align: center;
            p {
              font-size: 48px;
            }
          }
          .img {
            width: 200px;
            height: 160px;
            margin: 0 30px;
            overflow: hidden;
            img {
              width: 200px;
              height: 160px;
            }
          }
          .text {
            margin-top: 20px;
            .dis {
              p {
                font-size: 18px;
                margin-bottom: 5px;
              }
              span {
                font-size: 16px;
                color: #666;
              }
            }
          }
        }
      }
    }
  }
}
@keyframes pagenewmLi {
  0% {
    color: black;
    background: white;
  }
  100% {
    background: #c12219;
  }
}
</style>
