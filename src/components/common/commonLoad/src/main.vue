<style lang="scss" scoped>
.common-load {
  width: 100%;
  top: 48%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  .img {
    width: 100px;
    margin: 0 auto;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .text {
    width: 100%;
    text-align: center;
    margin-top: 30px;
    font-size: 14px;
  }
}
</style>

<template>
    <div class="common-load">
        <div>
            <div class="img">
                <img :src="src" alt="">
            </div>
            <!-- <div class="text">
                {{msg}}
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'common-load',
    props: {
        msg: {
            type: String,
            default() {
                return '正在加载中'
            }
        },
        src: {
            type: String,
            default() {
                return `${this.domain}app/static/img/loading.gif`
            }
        }
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>
