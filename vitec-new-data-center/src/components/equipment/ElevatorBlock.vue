<template>
  <div v-if="data">
    <component-title
        :title="name"
      ></component-title>
    <div class="flex-box equipment-chart_block equipment-elevator_block">
      <img src="@/assets/images/img_elevator@3x.png" alt="elevator">
      <div class="driver-info" v-if="driver && !Array.isArray(driver)">
        <p class="title">当前驾驶员</p>
        <div class="flex-box">
          <img :src="driver.card_file || default_img" alt="card_file">
          <div>
            <p>姓名<span>{{driver.info.name}}</span></p>
            <p>证件有效期<span>{{driver.cardend}}</span></p>
            <p>当前驾驶分<span>{{driver.score}}</span></p>
          </div>
        </div>
      </div>
      <!-- <p v-if="status" :class="status[0]">{{status[1]}}</p> -->
    </div>
    <div class="flex-box equipment-chart_box">
      <div>
        <div class="title">载重<span>Load</span></div>
        <border-gauge v-if="data && data.load != null" :data="[data.load.toFixed(2), data.safeLoad, 'kg']" :color="['#397ff5', '#4fd4c6']"></border-gauge>
        <div v-else>
          <img class="no-equipment" src="@/assets/images/no-equipment.png" alt="no-equipment">
          <p>暂未安装</p>
        </div>
      </div>
      <div>
        <div class="title">速度<span>Speed</span></div>
        <border-gauge v-if="data && data.speed != null" :color="['#3a7df5', '#7f56e7']" :data="[data.speed, '1.5', 'm/s']"></border-gauge>
        <div v-else>
          <img class="no-equipment" src="@/assets/images/no-equipment.png" alt="no-equipment">
          <p>暂未安装</p>
        </div>
      </div>
      <div>
        <div class="title">倾角<span>Dip</span><span>Angle</span></div>
        <dip-angle-gauge v-if="data && data.dipAngle != null"></dip-angle-gauge>
        <div v-else>
          <img class="no-equipment" src="@/assets/images/no-equipment.png" alt="no-equipment">
          <p>暂未安装</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentTitle from "@/components/title";
import BorderGauge from '@/components/echarts/BorderGauge';
import DipAngleGauge from '@/components/echarts/DipAngleGauge';

const url = require('@/assets/images/user.png')
export default {
  name: "Elevator-Block",
  components: {
    ComponentTitle,
    BorderGauge,
    DipAngleGauge
  },
  data() {
    return {
      default_img: url,
      status: undefined
    }
  },
  props: {
    name: {
      type: String
    },
    data: {
      type: Object,
      default: () => ({
        tower_name: '一号电梯'
      })
    },
    driver: {
      default: {
        userid: "2759",
        cardend: "2019-11-22",
        card_file:
          "http://vitec.oss-cn-shenzhen.aliyuncs.com/vitec/locales/20181120/mall/11.jpg",
        pic_url:
          "http://vitec.oss-cn-shenzhen.aliyuncs.com/vitec/locales/20181120/mall/123.png",
        info: {
          name: "李正培",
          mobile: "18825386648",
          file:
            "http://thirdwx.qlogo.cn/mmopen/msfOjs1fJemy2qx2TJuPubiaPUoRRFAVDLDN091SHkBdx76hVIicaVAKq4rXBRlNYt54eZSkcMEIHaxVXPkJrSGsnibrbPNYc3n/132"
        }
      }
    }
  },
  methods: {
    getStatus() {
      if (!this.data) {
        this.status = ['off-line-icon', '离线']
      } else if (this.data.warning != '正常工作') {
        this.status = ['warning-icon', '报警']
      } else  if (this.data.alarm != '正常工作'){
        this.status = ['early-warning-icon', '预警']
      } else {
        this.status = ['', '正常']
      }
    }
  },
  watch: {
    data() {
      this.getStatus()
    }
  },
  mounted() {
    this.getStatus()
  }
}
</script>

<style lang="scss">
.equipment-elevator_block {
  position: relative;
  img {
    width: 138px;
    height: 215px;
    margin-left: 112px;
  }
  .driver-info {
    position: absolute;
    border:1px solid #3581fb;
    width:213px;
    height:94px;
    left: 274px;
    .title {
      font-size: 16px;
      margin-top: 6px;
      font-weight: 600;
    }
    > .flex-box {
      >img{
        margin-left: 16px;
      }
      p {
        text-align: left;
        margin-left: 10px;
        margin-bottom: 4px;
      }
    }
  }
}
</style>
