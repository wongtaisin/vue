<style lang="scss" scoped>
.common-orders-row {
  .common-orders-content {
    padding: 26px 32px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
  }
  .left {
    width: calc(100% - 2.4rem);
    .name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .dps {
      color: #707070;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .right {
    height: 88px;
    justify-content: center;
    display: flex;
    max-width: 180px;
    p {
      padding: 0;
      margin: 0;
    }
    .right-content {
      height: 88px;
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap-reverse;
      text-align: right;
      p {
        width: 100%;
      }
    }
    .right-icon {
      height: 88px;
      line-height: 88px;
      display: flex;
      align-items: center;
      padding-left: 5px;
    }
  }
}
</style>

<template>
  <div class="common-orders-row">
    <div class="common-orders-content">
      <div class="left">
        <div class="name" v-text="name">name</div>
        <div class="dps" v-text="dps">dps</div>
      </div>
      <div class="right">
        <div class="right-content">
          <slot name="rightContent"></slot>
        </div>
        <div class="right-icon">
          <i class="mu-icon material-icons">chevron_right</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'common-orders-row',
  props: {
    name: {
      type: String,
      default() {
        return ''
      }
    },
    dps: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
