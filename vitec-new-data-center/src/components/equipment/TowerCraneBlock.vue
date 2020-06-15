<template>
  <div class="equipment-block equipment-tower-crane_block">
    <component-title :title="name"></component-title>
    <div class="flex-box equipment-chart_block">
      <img
        src="@/assets/images/img_crane@3x.png"
        alt="crane"
      >
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
      <!-- <p
        v-if="status"
        :class="status[0]"
      >{{status[1]}}</p> -->
    </div>
    <div class="flex-box equipment-chart_box">
      <div>
        <div class="title">承重<span>Bearing</span></div>
        <border-gauge
          v-if="data && data.load != null"
          :color="['#3B7DF3', '#F45C5F']"
          :data="[data.load.toFixed(2), 2.5, 'T']"
        ></border-gauge>
        <div v-else>
          <img
            class="no-equipment"
            src="@/assets/images/no-equipment.png"
            alt="no-equipment"
          >
          <p>暂未安装</p>
        </div>
      </div>
      <div>
        <div class="title">高度<span>Height</span></div>
        <line-gauge v-if="data && data.height != null" :data='[data.height, 25, "M"]'></line-gauge>
        <div v-else>
          <img
            class="no-equipment"
            src="@/assets/images/no-equipment.png"
            alt="no-equipment"
          >
          <p>暂未安装</p>
        </div>
      </div>
      <div>
        <div class="title">角度<span>Angle</span></div>
        <echart-circle
          v-if="data && data.rotation != null"
          :data="[data.rotation, '°']"
        ></echart-circle>
        <div v-else>
          <img
            class="no-equipment"
            src="@/assets/images/no-equipment.png"
            alt="no-equipment"
          >
          <p>暂未安装</p>
        </div>
      </div>
      <div>
        <div class="title">风速<span>Wind speed</span></div>
        <block-line-gauge
          :data="[data.windLevel.split('级')[0], 17, data.windSpeed + 'm/s']"
          v-if="data && data.windSpeed != null"
        ></block-line-gauge>
        <div v-else>
          <img
            class="no-equipment"
            src="@/assets/images/no-equipment.png"
            alt="no-equipment"
          >
          <p>暂未安装</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import ComponentTitle from "@/components/title";
import BorderGauge from "@/components/echarts/BorderGauge.vue";
import LineGauge from "@/components/echarts/LineGauge.vue";
import EchartCircle from "@/components/echarts/EchartCircle.vue";
import BlockLineGauge from "@/components/echarts/BlockLineGauge.vue";
const url = require('@/assets/images/user.png')
export default {
  name: "Tower-Crane-Block",
  props: {
    data: {
      type: Object
    },
    name: {
      type: String
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
  data() {
    return {
      default_img: url,
      status: undefined
    };
  },
  components: {
    ComponentTitle,
    BorderGauge,
    LineGauge,
    EchartCircle,
    BlockLineGauge
  },
  watch: {
    data: {
      deep: true,
      hanlder:function(newValue){
        console.log(newValue)
        console.log('tower-crane-block')
        try {
          this.getStatus()
          
        } catch (error) {
          console.error('tower-crane-block', error.message)
        }
      }
    }
  },
  methods: {
    getStatus() {
      if (!this.data) {
        this.status = ["off-line-icon", "离线"];
      } else if (this.data.warning != "正常工作") {
        this.status = ["warning-icon", "报警"];
      } else if (this.data.alarm != "正常工作") {
        this.status = ["early-warning-icon", "预警"];
      } else {
        this.status = ["", "正常"];
      }
    }
  },
  mounted() {
    this.getStatus()
  }
};
</script>

<style lang="scss">
.equipment-tower-crane_block .equipment-chart_block {
  position: relative;
  > img {
    margin-left: 62px;
    width: 212px;
    height: 220px;
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
.equipment-chart_block {
  color: #3581fb;
}
</style>
