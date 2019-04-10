<template>
  <section class="index-banner">
    <swiper :options="swiperOption">
      <swiper-slide :key="i" v-for="(item, i) in banner">
        <div class="content">
          <img :src="item.img" alt>
        </div>
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>

    <div class="new">
      <div class="left">
        <div class="title">最新新闻</div>
        <ul>
          <li>新闻新闻咨询</li>
          <li>新闻新闻咨询</li>
          <li>新闻新闻咨询</li>
        </ul>
        <div class="more">MORE +</div>
      </div>
      <div class="right">
        <div class="img">
          <img
            alt
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555124942&di=13b4a2e7426855bee823d5e993ba19e9&imgtype=jpg&er=1&src=http%3A%2F%2Fcdn.ipernity.com%2F200%2F00%2F44%2F42270044.68af4738.1024.jpg%3Fr2"
          >
          <div class="text">
            关于我们
            <p>
              MORE
              <span>></span>
            </p>
          </div>
        </div>
        <div class="img">
          <img
            alt
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555124942&di=13b4a2e7426855bee823d5e993ba19e9&imgtype=jpg&er=1&src=http%3A%2F%2Fcdn.ipernity.com%2F200%2F00%2F44%2F42270044.68af4738.1024.jpg%3Fr2"
          >
          <div class="text">
            最新动态
            <p>
              MORE
              <span>></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      banner: [
        {
          url: '',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555124942&di=13b4a2e7426855bee823d5e993ba19e9&imgtype=jpg&er=1&src=http%3A%2F%2Fcdn.ipernity.com%2F200%2F00%2F44%2F42270044.68af4738.1024.jpg%3Fr2'
        },
        {
          url: '',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554529135898&di=933fd82861291dbe9451d7ac7fa84fca&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F6ffa5773gw1e9xggeq31tj21kw11xgqq.jpg'
        }
      ],
      swiperOption: {
        spaceBetween: 30,
        effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    getBanner () {
      return this.$store.getters['homeIndex/getBanner'].data
    }
  }
}
</script>

<style lang="scss" scoped>
.index-banner {
  background: white;
  .content {
    width: 100%;
    height: 100%;
    color: #fff;
    img {
      width: 100%;
      height: 720px;
    }
  }
  .swiper-button-next {
    height: 72px;
    right: 10%;
  }
  .swiper-button-prev {
    height: 72px;
    left: 10%;
  }
  .new {
    width: 706px;
    position: absolute;
    bottom: 10%;
    left: 50%;
    margin-left: -353px;
    z-index: 9;
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    padding: 20px;
    -moz-box-shadow: 2px 2px 15px #333333;
    -webkit-box-shadow: 2px 2px 15px #333333;
    box-shadow: 2px 2px 15px #333333;
    .left {
      width: 226px;
      .title {
        font-size: 16px;
        margin-bottom: 10px;
      }
      li {
        line-height: 28px;
        color: #666666;
        &:hover {
          color: #c12219;
          cursor: pointer;
        }
      }
      .more {
        margin-top: 10px;
      }
    }
    .right {
      // width: 200px;
      height: 140px;
      display: flex;
      overflow: hidden;
      .img {
        width: 200px;
        height: 140px;
        margin-left: 20px;
        position: relative;
        .text {
          width: 200px;
          height: 140px;
          text-align: center;
          position: absolute;
          top: 0;
          padding-top: 50px;
          color: white;
          &:hover {
            background-color: rgba(0, 0, 0, 0.3);
            p {
              background: white;
              color: black;
              cursor: pointer;
            }
          }
          p {
            border: 1px solid white;
            border-radius: 10px;
            width: 75px;
            margin-left: 60px;
          }
        }
        img {
          width: 200px;
          height: 140px;
        }
      }
    }
  }
}
</style>
