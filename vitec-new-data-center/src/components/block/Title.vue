<template lang="pug">
.block-title
    span.block-title__value {{title}}
    span.block-title__suffix
        span
        span
        span
        span
        hr
</template>

<script>
import titleMixins from "@/mixin/block_title";
export default {
  mixins: [titleMixins]
};
</script>

<style lang="scss" scoped>
@import 'src/styles/global/variables.scss';

.block-title {
  display: flex;
  justify-content: center;
  align-items: baseline;

  .block-title {
    &__value {
      font-family: PingFangSC-Semibold;
      font-size: 20px;
      color: $commonPrimaryColor;
      letter-spacing: 0;
      text-align: left;
      margin-right: 24px;
      word-break: keep-all;
    }

    &__suffix {
      display: flex;
      align-items: baseline;
      justify-content: center;
      width: 100%;
      // display: block;
      // height: 10px;
      // content: '';
      // background: $commonPrimaryColor;
      // flex: 1;
      flex-wrap: nowrap;
      span {
        // &::before, &::after {
        display: inline-block;
        content: "";
        background: $commonPrimaryColor;
        height: 14px;
        width: 10px;
        transform: skew(-30deg);
        margin-left: 5px;
        // }
      }
      hr {
        display: block;
        height: 2px;
        background: $commonPrimaryColor;
        width: 100%;
        border: 0;
        outline: 0;
        margin-left: -5px;
      }
    }
  }
}
</style>

