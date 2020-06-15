<template>
  <div>
    <svg id="head-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1600 74">
      <path stroke="#3581fb" d="M0,66 604,66 L539,0" stroke-width="2" opacity="0.3"></path>
      <path stroke="#3581fb" stroke-width="2" d="M562,0 616,54" opacity="0.54" />
      <path stroke="#3581fb" stroke-width="3" d="M616,54 636,73 L656,73" />
      <path stroke="#3581fb" stroke-width="2" d="M656,73 945,73" opacity="0.54" />
      <path stroke="#3581fb" stroke-width="3" d="M945,73 965,73 L985,54" />
      <path stroke="#3581fb" stroke-width="2" d="M985,54 1039,0" opacity="0.54" />
      <path stroke="#3581fb" stroke-width="2" d="M1062,0 997,66 L1600,66" opacity="0.3" />
    </svg>
    <div id="project-name">
      <el-select v-model="belong" placeholder="请选择" @change="changeBelong">
        <el-option
          v-for="item in project_arr"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div id="title">{{title_name}}</div>
    <div id="time">{{time}}</div>
    <!-- <div id="log-out" @click="logOut">退出</div> -->
  </div>
</template>

<script>
import { getUserInfo, exit, choiceProject } from '@/api/user'
import {LOGIN_URL} from '@/utils/constants'
import {setUserInfo} from '@/utils/sentry'

// const LOGIN_URL = process.env.VUE_APP_LOGIN_URL

export default {
  name: 'Head',
  data() {
    return {
      project_name: undefined,
      title_name: '质量管理数据中心',
      time: undefined,
      timer: undefined,
      auth_arr: undefined,
      belong: undefined,
      project_arr: undefined
    }
  },
  mounted() {
    this.getUserInfo();
    this.time = this.getTime();
    this.timer = setInterval(() => {
      this.time = this.getTime()
    }, 3000);
  },
  methods: {
    getTime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let data = date.getDate();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      month = month > 9 ? month : '0' + month;
      data = data > 9 ? data : '0' + data;
      hour = hour > 9 ? hour : '0' + hour;
      minutes = minutes > 9 ? minutes : '0' + minutes;
      return year + '-' + month + '-' + data + '  ' + hour + ':' + minutes;
    },
    logOut() {
      exit().then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        let url = window.location.href;
        window.location.href = LOGIN_URL + '?url=' + encodeURIComponent(url)
      })
    },
    getUserInfo() {
      getUserInfo().then(res => {
        let data = res.data;
        this.project_name = data.projectName;
        this.project_arr = data.project;
        this.belong = data.belong * 1;
        this.$store.commit('setAuthArrAction', data.auth)
        this.$store.commit('setBelong', this.belong)
        this.$store.commit('changeSetBelong');

        setUserInfo({
          id:data.id,
          username:data.name,
          token:data.UnionID,
          belong:data.belong,
          project:data.projectName,
        })
      })
    },
    changeBelong() {
      choiceProject({project_id: this.belong}).then(() => {
        this.getUserInfo();
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  watch: {
    $route(newVal) {
      this.title_name = newVal.meta.title;
    }
  }
}
</script>

<style lang="scss">
#head-svg {
  width: 100%;
  height: 74px;
}
#project-name, #time, #log-out {
  color:#6f83a1;
  font-size: 20px;
  position: absolute;
  top: 33px;
  transform: translateY(-50%);
}
#project-name {
  left: 48px;

  /deep/ .el-input__inner{
    font-weight: bold;
    background: transparent;
    border: none;
    color:#6f83a1;
    font-size: 20px;
    padding-left: 0;
  }

  /deep/ .el-icon-arrow-up:before {
    content: '';
  }
}
#title {
  font-weight: bold;
  color: #fff;
  font-size: 24px;
  text-align: center;
  list-style: 24px;
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
}
#time {
  right: 108px;
  font-weight: bold;
}
#log-out {
  right: 48px;
  color: #fff;
}
</style>
