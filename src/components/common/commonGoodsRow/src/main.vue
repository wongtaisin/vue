<style lang="scss" scoped>
.common-goods-row {
  padding: 37px;
  background-color: #ffffff;
  display: flex;
  overflow: hidden;
  .left {
    width: 130px;
    height: 130px;
    margin-right: 32px;
    overflow: hidden;
  }
  .names {
    font-weight: 700;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    font-size: 14px;
  }
  .right {
    flex-grow: 1;
    text-align: left;
    width: calc(100% - 2.96rem);
  }
  .detail {
    display: flex;
    flex-wrap: wrap;
  }
  .enlarge-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    border: 1px solid red;
  }
}
</style>

<template>
  <div class="common-goods-row common-border">
    <div class="left" v-if="isImg"><img :src="img?img:imgSrc" width="65" height="65" @click="enlarge"></div>
    <div class="right" @click="click">
      <div class="names" v-text="name"></div>
      <div class="detail">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'common-goods-row',
  props: {
    isImg: {
      type: Boolean,
      default() {
        return true
      }
    },
    name: {
      type: String,
      default() {
        return '--'
      }
    },
    img: {
      type: String,
      default() {
        return `${this.domain}app/static/img/shopLogo.png`
      }
    }
  },
  data() {
    return {
      imgSrc: `${this.domain}app/static/img/shopLogo.png`
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    click() {
      this.$emit('click')
    },
    enlarge() {
      this.$emit('enlarge')
    }
  }
}
</script>
