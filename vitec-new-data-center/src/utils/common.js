import _ from 'lodash'

export function parseCookie() {
  const cookie = document.cookie
  const output = {}

  if (cookie) {
    const pairs = cookie.split(';').map(item => _.trim(item))
    for (let i = 0; i < pairs.length; i += 1) {
      const key = pairs[i].split('=')[0]
      const value = pairs[i].split('=')[1]
      output[key] = value
    }
  }

  return output
}