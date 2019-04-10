<template>
  <section class="common-header">
    <div class="logo">
      <img alt src="../../../assets/logo.png">
    </div>
    <div class="right">
      <div class="top">
        <div class="top-right">
          <div class="tel">
            <i class="iconfont icon-dianhua"></i>
            0755-12345678
          </div>
          <div class="language">
            <span @click="language('zh-CN')">简体</span>
            <span @click="language('zh-HK')">繁体</span>
            <span @click="language('en-US')">英文</span>
          </div>
          <div class="search">
            <i @click="clickSea" class="iconfont icon-sousuo"></i>
            <div @mouseleave="moveSea" class="input" v-show="searchShow">
              <input placeholder="请输入" type="text">
            </div>
          </div>
        </div>
      </div>
      <div class="nav">
        <ul class="sidebar-ul">
          <li
            :class="index===i?'active sidebar-li':'sidebar-li'"
            :key="i"
            @click="changeMenu(item, i)"
            v-for="(item,i) in nav"
          >
            <span @mouseenter="mouMenu(item, i)">{{item.name}}</span>
            <ul
              :class="sub===i?'block':'none'"
              @mouseleave="moveMenu"
              class="sub-menu"
              v-if="item.child"
            >
              <li :key="index" class="sub-li" v-for="(res,index) in item.child">{{res.name}}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      index: 0,
      nav: [
        {
          url: '/home',
          name: '首页'
        },
        {
          url: '',
          name: '关于我们'
        },
        {
          url: '/team',
          name: '专业团队'
        },
        {
          url: '/domain',
          name: '专业领域'
        },
        {
          url: '/new',
          name: '新闻资讯',
          child: [
            {
              id: 1,
              name: '最新交易'
            },
            {
              id: 12,
              name: '最新动态'
            },
            {
              id: 13,
              name: '新闻'
            }
          ]
        },
        {
          url: '/job',
          name: '诚聘英才'
        },
        {
          url: '/message',
          name: '客户留言'
        }
      ],
      sub: '',
      searchShow: false
    }
  },
  created () { },
  mounted () { console.log(this.data) },
  methods: {
    changeMenu (item, i) {
      this.index = i
      this.$router.push({
        path: item.url
      })
    },
    mouMenu (item, i) {
      this.sub = i
      // if (item.child == undefined) return false
    },
    moveMenu () {
      this.sub = ''
    },
    clickSea () {
      this.searchShow = true
    },
    moveSea () {
      this.searchShow = false
    },
    language (data) {
      console.log(data, `切换语言`)
    }
  }
}
</script>

<style lang='scss' scoped>
.common-header {
  width: 1080px;
  height: 90px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  .logo {
    width: 234px;
    height: 32px;
    margin-right: 188px;
    img {
      height: 32px;
    }
  }
  .right {
    height: 90px;
    .top {
      height: 30px;
      width: 100%;
      position: relative;
      margin-top: 5px;
      .top-right {
        display: flex;
        position: absolute;
        right: 0;
        div {
          margin: 0 0 0 10px;
        }
        .tel {
          i {
            margin-right: 5px;
          }
        }
        .language {
          span {
            margin-left: 5px;
            cursor: pointer;
            &:hover {
              color: #c12219;
            }
          }
        }
      }
      .search {
        i {
          display: block;
        }
        .input {
          position: absolute;
          left: 0px;
          background: #3a3633;
          width: 187px;
          height: 42px;
          padding: 0 15px;
          animation: mySea 0.5s alternate;
          animation-fill-mode: forwards;
          animation-direction: alternate;
          overflow: hidden;
          margin-left: 29px;
          input {
            line-height: 24px;
            margin-top: 5px;
            width: 178px;
            background: #3a3633;
            border: none;
            border-bottom: 1px solid white;
            color: white;
          }
        }
      }
    }
    .nav {
      font-size: 16px;
      height: 60px;
      .sidebar-ul {
        display: flex;
        .sidebar-li {
          padding: 0 15px;
          height: 60px;
          line-height: 60px;
          cursor: pointer;
          span {
            &:hover {
              color: #c5241a;
            }
          }
        }
        .active {
          background: #3a3633;
          color: white;
        }
      }
      .sub-menu {
        background: white;
        position: absolute;
        overflow: hidden;
        border: 1px solid #c12219;
        margin: -10px 0 0 -20px;
        animation: mySec 1s alternate;
        animation-fill-mode: forwards;
        animation-direction: alternate;
        color: black;
        z-index: 9;
        .sub-li {
          text-align: center;
          padding: 0 20px;
          line-height: 48px;
          // border-bottom: 1px dashed #c12219;
          &:hover {
            background: #c12219;
            color: white;
          }
        }
      }
    }
  }
}

@keyframes mySec {
  0% {
    height: 0;
  }
  100% {
    height: 144px;
  }
}
@keyframes mySea {
  0% {
    height: 0;
  }
  100% {
    height: 42px;
  }
}
</style>
