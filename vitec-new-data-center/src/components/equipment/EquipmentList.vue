<template>
  <div class="equipment">
    <ul class="equipment-list">
      <li
        v-for="(item, index) in equipment_list"
        :key="item.id"
        :class="status(index)"
      >
        <div
          @click="handleChangeEquipment(index, item)"
          class="icon-box"
        >
        <a :href="'#chart-' + index" v-if="item.cate == '电梯'">
          <elevator-svg></elevator-svg>
        </a>
        <a :href="'#chart-' + index" v-else>
          <tower-crane-svg></tower-crane-svg>
        </a>
        </div>
        <p>{{item.tower_name}}</p>
      </li>
    </ul>
    <div class="equipment-chart">
      <div v-for="(item, index) in equipment_list" :key="index">
        <tower-crane-block 
          v-if=" realList[index] && item.cate == '塔吊' && driverList[index]"
          :driver="driverList[index].driver" 
          :data="realList[index]" 
          :name="item.tower_name" 
          :id="'chart-' + item.sn"
        >
        </tower-crane-block>
        <elevator-block 
          v-else-if=" realList[index] && item.cate == '电梯' && driverList[index]"
          :driver="driverList[index].driver" 
          :data="realList[index]" 
          :name="item.tower_name" 
        >
        </elevator-block>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fetchRealTimeTowerCraneData,
  fetchRealTimeElevatorData
} from "@/api/real";
import { fetchEquipmentList,
  fetchEquipmentDriver } from "@/api/equipment";
import {WEBSOCKET_URL} from '@/utils/constants'


import TowerCraneSvg from "@/components/svg/tower_crane.vue";
import ElevatorSvg from "@/components/svg/elevator.vue";

import TowerCraneBlock from './TowerCraneBlock'
import ElevatorBlock from './ElevatorBlock'

import commonMixin from './mixin'

export default {
  mixins: [commonMixin],
  name: "Equipment-List",
  components: {
    TowerCraneSvg,
    ElevatorSvg,
    TowerCraneBlock,
    ElevatorBlock
  },
  data() {
    return {
      initing: false,
      equipment_list: undefined,
      active_num: 0,
      tower_crane: undefined,
      elevator: undefined,
      ws: undefined,
      snList: [],
      timer: undefined,
      realList: undefined,
      driverList: undefined,

      manualTimer: null,
    };
  },
  methods: {
    async init() {
      // this.getData()
      // this.snList = []
      if (this.initing) return
      this.initing = true
      try {
        console.log('getEquipmentList')
        await this.getEquipmentList();
        console.log('getEquipmentDriver')
        this.getEquipmentDriver();
        console.log('initWebSocket')
        this.initWebSocket()
      } catch (error) {
        console.error(error)
        this.initing = false
      }
    },
    getData() {
      this.getEquipmentList();
      this.active_num = 0;
    },
    async getEquipmentList() {
      const res = await fetchEquipmentList()
      const arr = res.data.list;
      console.log(arr)
      this.snList = arr.map(i => i.num)
      // arr.forEach(item => {
      //   this.snList.push(item.num)
      // });
      this.equipment_list = arr;
      this.realList = new Array(arr.length)
      console.log('finish getEquipmentList')
      // .then(res => {
        
        
        // this.timer = null
        // clearInterval(this.timer)
        // this.wsSend();
        // this.timer = setInterval(() => {
        //   this.wsSend(1)
        // }, 300000)
      // });
    },
    handleChangeEquipment(index) {
      this.active_num = index;
    },
    wsSend(val) {
      if (!this.ws) return
      if (this.snList.length === 0 || this.ws.readyState === 3) {
        return
      }
      if (val) {
        this.ws.send(JSON.stringify({"type":"heart"}))
        return
      }
      
      // let snList_str = '';
      // this.snList.forEach((item, index) => {
      //   if (this.snList.length - 1 == index) {
      //     snList_str += item;
      //     return
      //   }
      //   snList_str += item + ',';
      // })
      const snList_str = this.snList.join(',')
      const str = {type: 'client', snList: snList_str}
      const strJSON = JSON.stringify(str)
      console.log(strJSON);
      this.ws.send(strJSON);

      this.timer = setTimeout(() => {
        this.wsSend(1)
      }, 300000)
    },
    async getEquipmentDriver() {
      this.driverList = []
      const tasks = []
      for(let i = 0; i < this.snList.length; i ++) {
        let params = {
          num: this.snList[i]
        }
        tasks.push(fetchEquipmentDriver(params))
        // fetchEquipmentDriver(params).then(res => {
        //   this.driverList.push(res.data)
        // })
      }
      Promise.all(tasks).then(res => {
        this.driverList = res.map(r => r.data)
      })
    },
    status(index) {
      let str = ''
      str += this.active_num == index ? 'active': '';
      // if (!this.realList) {
      //   str += ' off-line-icon'
      // } else if (this.realList[index] && this.realList[index].warning != '正常工作') {
      //   str += ' warning-icon'
      // } else if (this.realList[index] && this.realList[index].alarm != '正常工作'){
      //   str += ' early-warning-icon'
      // } else {
      //   return str
      // }
      return str;
    },
    initWebSocket() {
      this.ws = new WebSocket(WEBSOCKET_URL)
      this.ws.onopen = () => { 
        console.log("Connection open ...", this._uid);
        this.wsSend();
        this.timer = setTimeout(() => {
          this.wsSend(1)
        }, 300000)
        clearTimeout(this.manualTimer)
      };
      this.ws.onmessage = (evt) => {
        console.log('Websocket has received datas.')
        if (evt.data === '注册成功') return
        try {
          let obj = JSON.parse(evt.data);
          // console.log(obj)
          for(let i = 0; i < this.equipment_list.length; i ++) {
            if (obj.sn == this.equipment_list[i].num) {
              this.$set(this.realList, i, obj)
              console.log(this.realList)
            }
          }
          console.log('set equipment data successfully.')
        } catch (error) {
          // console.error(error)
          console.error(`WebSocket has an error.Ignore it. ${error.message}`)
        }
      }
      this.ws.onclose = (err) => {
        console.log('连接失败')
        if (/设备序列号:(.*)不存在/.test(err.reason)) {
          console.error(`WebSocket has been closed with an error. ${err.reason}`)
          this.getEquipmentInfoManually()
        } else {
          console.error(`WebSocket has been closed with an error. ${err.message}`)
        }
        clearTimeout(this.timer)
        this.ws = null
      }
      this.ws.onerror = (err) => {
        console.error(`WebSocket has trigger an error. ${err.message}`)
        // console.log('连接失败')
        clearTimeout(this.timer)
      }
    },
    async getEquipmentInfoManually() {
      console.log('getEquipmentInfoManually')
      try {
        const towerInfos = await fetchRealTimeTowerCraneData()
        towerInfos.forEach(info => {
          const index = this.equipment_list.findIndex(one => one.num === info.sn)
          if (index > -1) {
            this.$set(this.realList, index, info)
          }
        })
        const elevatorInfos = await fetchRealTimeElevatorData()
        elevatorInfos.forEach(info => {
          const index = this.equipment_list.findIndex(one => one.num === info.sn)
          if (index > -1) {
            this.$set(this.realList, index, info)
          }
        })
      } catch (error) {
        console.error(error)
      }
      // this.manualTimer = setTimeout(() => this.getEquipmentInfoManually(), 5000)
    }
  },
  
  async mounted() {
    // await this.getData()
    this.init()
  },
  destroyed() {
    // this.timer = null;
    clearTimeout(this.timer)
    clearTimeout(this.manualTimer)
    if (this.ws) {
      this.ws.close()
    }
  }
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  display: none;
}
.equipment {
  display: flex;
}
.equipment-list {
  list-style: none;
  color: #3581fb;
  height: 800px;
  overflow-y: auto;
  .icon-box {
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    background: rgba(53, 129, 251, 0.3);
  }

  p {
    margin-top: 4px;
    width: 56px;
    margin-bottom: 26px;
    font-weight: 600;
  }
}

.warning-icon {
  .icon-box {
    background: rgba(250, 92, 92, 0.3);
  }
  border-color: #fa5c5c;
  color: #fa5c5c;

  path {
    fill: #fa5c5c;
  }
}

.early-warning-icon {
  .icon-box {
    background: rgba(234, 160, 0, 0.3);
  }
  color: #eaa000;
  border-color: #eaa000;

  path {
    fill: #eaa000;
  }
}

.off-line-icon {
  .icon-box {
    background: rgba(111, 131, 161, 0.3);
  }
  color: #6f83a1;
  border-color: #6f83a1;

  path {
    fill: #6f83a1;
  }
}

.active {
  position: relative;

  .icon-box {
    border: 4px solid;
  }

  &:before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-style: solid;
    border-width: 4px 0 4px 12px;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-top-color: transparent;
    transform: translateX(calc(-100% - 4px)) translateY(24px);
  }
}

.equipment-chart {
  box-sizing: border-box;
  margin-left: 54px;
  width: 532px;
  height: 800px;
  overflow-y: auto;

  .equipment-block {
    margin-bottom: 18px;
  }

  &_block {
    margin-top: 8px;
    justify-content: space-between;

    p {
      text-align: right;
    }
  }

  &_box {

    & > div {
      width: 109px;
      margin-right: 32px;

      &:last-of-type {
        margin-right: 0;
      }
    }

    .title {
      font-size: 12px;
      color: #a3b4cc;
      margin-bottom: 12px;

      span {
        margin-left: 4px;
      }
    }

    .no-equipment {
      width: 100px;
      height: 100px;

      & + p {
        text-align: center;
        color: #8F9FB6;
      }
    }
    
  }
}

</style>
