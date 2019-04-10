<style lang="scss" scoped>
.search-box {
  position: fixed;
  left: 0;
  width: 100%;
  z-index: 1;
  width: 100%;
  background: #0992fd;
  color: #ffffff;
  padding-top: 86px;
  input::input-placeholder {
    color: #fff;
    opacity: 1;
  }

  input::-webkit-input-placeholder {
    color: #fff;
    opacity: 1;
  }

  input:-ms-input-placeholder {
    color: #fff;
    opacity: 1;
  }

  input:-moz-placeholder {
    color: #fff;
    opacity: 1;
  }

  input::-moz-placeholder {
    color: #fff;
    opacity: 1;
  }

  input:focus::-webkit-input-placeholder {
    color: #fff;
    opacity: 1;
  }

  input:focus::-moz-input-placeholder {
    color: #fff;
    opacity: 1;
  }
  .search {
    text-align: left;
    padding: 0 40px;
    font-size: 24px;
    height: 86px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .input {
    width: 100%;
    height: 86px;
    line-height: 86px;
    font-size: 12px;
    border: 0;
    outline: 0;
    color: #ffffff;
    background: none;
    box-shadow: none;
    display: block;
  }
  .scan-code {
    background-color: #0992fd;
    z-index: 1;
  }
}
</style>

<template>
  <div class="search-box">
    <div class="search">
      <input type="text" class="input" v-model="value" v-on:input="$emit('input', $event.target.value)" :placeholder="placeholder" ref="input" @input="input" @focus="focus" @blur="blur">
      <slot name="other"></slot>
      <div v-if="scanCode" class="scan-code">
        <common-scan-code @update="getScanCode"></common-scan-code>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'common-top-search',
  props: {
    //备注
    placeholder: {
      type: String,
      default() {
        return ''
      }
    },
    //是否开启扫码
    scanCode: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      value: '',
      flag: true,
      setTimeoutFlag: null
    }
  },
  watch: {
    value(e) {
      this.update(e)
    }
  },
  methods: {
    //扫码返回数据
    getScanCode(e) {
      this.value = e
    },
    //60ms节流处理
    update(e) {
      if (!e) return this.$emit('update', e)
      if (!this.flag) return false
      this.flag = false
      this.setTimeoutFlag = setTimeout(() => {
        this.flag = true
        this.$emit('update', e)
        clearTimeout(this.setTimeoutFlag)
      }, 60)
    },
    change(e) {
      this.$emit('change', e.target.value)
    },
    input(e) {
      this.$emit('input', e.target.value)
    },
    focus() {
      this.$emit('focus')
      this.$refs.input.focus()
    },
    blur() {
      this.$emit('blur')
      this.$refs.input.blur()
    }
  }
}
</script>
