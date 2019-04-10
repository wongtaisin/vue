<template>
  <div class="common-inside-title">
    <div class="icon" v-if="icon"></div>
    <div class="text">
      <span>{{cn}}</span>
      <p>{{en}}</p>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: 'common-inside-title',
  props: {
    icon: {
      type: Boolean,
      default () {
        return true
      }
    },
    cn: {
      type: String,
      default () {
        return ''
      }
    },
    en: {
      default () {
        return ''
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.common-inside-title {
  margin-top: 60px;
  text-align: center;
  .icon {
    width: 28px;
    height: 28px;
    background: #c12219;
    margin: 0 auto;
    transform: rotateX(360deg) rotateY(360deg) rotateZ(45deg);
  }
  .text {
    font-size: 16px;
    margin-top: 20px;
    p {
      letter-spacing: 4px;
    }
  }
  .line {
    width: 25px;
    height: 2px;
    background: #c12219;
    margin-left: 49%;
    margin-top: 15px;
    border-radius: 2px;
  }
}
</style>
