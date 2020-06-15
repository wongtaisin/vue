import io from 'socket.io-client'
import {SOCKET_URL} from './constants'

import store from '@/store'

const socket = io(SOCKET_URL)

const login = () => {
  if (store.getters.belong > 0) {
    console.log('login', store.getters.belong)
    socket.emit('login', store.getters.belong)
  } else {
    setTimeout(login, 500)
  }
}

socket.on('connect', () => {
  console.log('connect', store.getters.belong)
  login()
})

socket.on('new_msg', msg => {
  console.log('new_msg', msg)
  if (+msg === 20000) {
    store.dispatch('updateSocket')
  }
})

socket.on('disconnect', () => {
  console.log('disconnect')
})
