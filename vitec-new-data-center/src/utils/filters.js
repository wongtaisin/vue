import Vue from 'vue'
import fecha from 'fecha'

Vue.filter('date', (value, formatter = 'YYYY-MM-DD') => {
  if (value) {
    return fecha.format(new Date(value), formatter)
  }
  return value
})