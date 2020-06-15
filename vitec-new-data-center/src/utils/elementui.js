import Vue from 'vue'

import {
  Col,
  Row,

  DatePicker,

  Dialog,
  Message,

  Table,
  TableColumn,

  Select,
  Option,

  Loading,

  Progress
} from 'element-ui'

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service

Vue.use(Col)
Vue.use(Row)

Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Select)
Vue.use(Option)

Vue.use(Dialog)

Vue.use(DatePicker)

Vue.use(Progress)


Vue.prototype.$message = Message