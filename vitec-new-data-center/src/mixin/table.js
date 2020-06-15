
import { getToday } from '@/utils/formdate.js'

const tableMixin = {
  methods: {
    getRowStyle({ rowIndex}) {
      let str = '';
      // 表格行颜色改变
      if (rowIndex % 2) {
        str += 'background:#192538;'
      } else {
        str += 'background:transparent;'
      }
      return str
    },
    getCellStyle({row, columnIndex}) {
      let str = ''
      if (columnIndex == 0) {
        str +='padding-left: 16px;'
      } 
      if (columnIndex == 4 && row.deadline < getToday()) {
        str += 'color: #FA5C5C;'
      } else if (columnIndex == 4 && row.deadline > getToday()) {
        str += 'color: #3581FB;'
      } else {
        str += 'color: #fff;'
      }
      return str
    },
    getSmallTableRowStyle() {
      return 'borderBottom: none;color:#fff;'
    },
    getHeadCellStyle({columnIndex}) {
      if (columnIndex == 0) {
        return 'height: 39px;padding-left: 16px;padding-right: 0px;color:#fff;background:#192538;border-bottom:1px solid #3A4C68;'
      }
      return 'height: 39px;padding-right: 0px;background:#192538;color:#fff;border-bottom: 1px solid #3a4c68;'
    }
  }
}

export default tableMixin
