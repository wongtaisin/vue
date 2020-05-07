<template>
  <section class="page-login">
    <div class="bg-contain">
      <van-form @submit="onSubmit">
        <van-field
          :rules="[{ required: true, message: '请填写用户名' }]"
          label="用户名"
          name="用户名"
          placeholder="用户名"
          v-model="username"
        />
        <van-field
          :rules="[{ required: true, message: '请填写密码' }]"
          label="密码"
          name="密码"
          placeholder="密码"
          type="password"
          v-model="password"
        />
        <div style="margin: 16px;">
          <van-button block native-type="submit" round type="info">提交</van-button>
        </div>
      </van-form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {},
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    },
  },
}
</script>

<style lang="scss" scoped>
.page-login {
  width: 375px;
  height: 100vh;
  background: white !important;
  .bg-contain {
    margin: 60px 48px 0;
    .title {
      font-size: 24px;
      color: #4c73f8;
    }
  }
}
</style>
