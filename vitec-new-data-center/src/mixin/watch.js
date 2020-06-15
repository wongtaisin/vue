import { mapGetters } from 'vuex'
import qs from 'querystring'
import { NEW_WEBSOCKET_URL } from '@/utils/constants'
import { parseCookie } from '@/utils/common'

export default {
  data() {
    return {
      ws: null,
      interval: null
    }
  },
  computed: {
    ...mapGetters(['auth_arr', 'socket', 'belong'])
  },
  async mounted() {
    console.log('watch mixin mounted.')
    await this.initWebsocket()
    await this.check()
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  },
  watch: {
    auth_arr() {
      this.check()
    },
    // socket() {
    //   this.check()
    // }
  },
  methods: {
    async initWebsocket() {
      if (this.ws) {
        return
      }

      // 由于原代码里面的 getUserInfo 没有放在 router 的 BeforeGuard 里面
      // 导致 getUserInfo 没获得响应就会进入该页面，所以要等待一下
      while (this.belong === 0) {
        await new Promise(resolve => {
          setTimeout(() => resolve(), 100)
        })
      }

      let qstr = qs.stringify({
        belong: this.belong,
        token: parseCookie().token,
        room_number: this.websocketRoom
      })
      this.ws = new WebSocket(NEW_WEBSOCKET_URL + `?${qstr}`)

      this.ws.onopen = () => {
        console.log('Connection open ...')
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
        this.interval = setInterval(() => {
          try {
            this.ws.send('heartbeat')
          } catch (e) {
            if (this.ws) {
              this.ws.close()
              this.ws = null
            }
            this.initWebsocket()
          }
        }, 55000)
      }
      this.ws.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data)
          if (data.type && data.type === this.websocketType) {
            this.getData()
          }
        } catch (e) {
          // noop
        }
      }
      this.ws.onclose = () => {
        console.log('Connection close...')
        this.ws = null
      }
    }
  },
}
