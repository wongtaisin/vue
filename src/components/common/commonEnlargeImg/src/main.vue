<style lang="scss" scoped>
.common-enlarge-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  align-items: center;
  display: flex;
  text-align: center;
  .enlarge-img {
    display: inline-block;
    max-width: 90%;
    margin: 0 auto;
  }
}
</style>

<template>
  <div @click="closeImage" class="common-enlarge-img" v-if="src">
    <img :src="src" class="enlarge-img animated jackInTheBox">
  </div>
</template>

<script>
export default {
  name: 'common-enlarge-img',
  props: {
    src: {
      type: String,
      default () {
        return `${this.domain}app/static/img/shopLogo.png`
      }
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    url: {
      set () {
        return this.src
      },
      get () {
        return this.src
      }
    }
  },
  mounted () {
  },
  methods: {
    //关闭
    closeImage () {
      this.$emit('closeImage')
    }
  }
}
</script>
