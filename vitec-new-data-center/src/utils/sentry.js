/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import { version } from '../../package'

const isProd = process.env.NODE_ENV !== 'development'

if (isProd) {
  Sentry.init({
    dsn: 'https://8b4f5490b22e40369f9a4c096d308098@sentry.io/1460960',
    environment: window.VITEC.ENV,
    release: version,
    debug: process.env.NODE_ENV === 'development',
    integrations: [
      new Integrations.Vue({
        Vue,
        attachProps: true,
      }),
    ],
  })
}

Vue.config.errorHandler = function errorHandler(err) {
  console.log('====== Vue capture an Error =======')
  isProd ? Sentry.captureException(err) : console.error(err)
}

export const setUserInfo = ({
  id, username, token, belong, project
}) => isProd && Sentry.configureScope((scope) => {
  scope.setUser({ id, username })
  scope.setExtra('token', token)
  scope.setExtra('belong', belong)
  scope.setExtra('project', project)
})

export default Sentry
