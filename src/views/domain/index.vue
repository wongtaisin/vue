<template>
  <section class="page-domain"></section>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
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
