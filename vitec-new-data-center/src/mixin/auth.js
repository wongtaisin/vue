const authMixin = {
  methods: {
    checkAuth() {
      let url = this.$route.path;
      let auth_arr = this.$store.state.auth_arr;
      if(!auth_arr) return false;
      // 所有图表权限id 280(质量/安全整改数据中心)
      if(url.includes('all')) {
        return auth_arr.find((value) => {
          if(value === 280) return true;
        })
      } else if (url.includes('quality')) {
        return auth_arr.find((value) => {
          if(value === 278) return true;
        })
      } else {
        return auth_arr.find((value) => {
          if(value === 279) return true;
        })
      }
    }
  }
}

export default authMixin
