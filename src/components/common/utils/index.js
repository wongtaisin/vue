export default {
  deepCopy(data) {
    return window.JSON.parse(window.JSON.stringify(data))
  },
  /** 弹框提示 start */
  tipMessageFlag: null,
  tipMessageRemove() {
    const _commonTipMsg = document.getElementById('commonTipMsg')
    if (_commonTipMsg != null) _commonTipMsg.parentNode.removeChild(_commonTipMsg)
  },
  tipMessage(message, callBack) {
    if (this.tipMessageFlag) clearTimeout(this.tipMessageFlag)
    this.tipMessageRemove()
    const html = `<div class="common-tip-msg" id="commonTipMsg">
                        <div class="tip-box">
                            ${message}
                        </div>
                    </div> `
    document.getElementById('init').insertAdjacentHTML('afterend', html)
    this.tipMessageFlag = setTimeout(() => {
      this.tipMessageRemove()
      if (callBack) callBack()
    }, 2000)
  },
  /** 错误弹框 end */
  /**
   * @Created by xiandan on 2017-10-09
   * @desc 根据时间,格式 戳返回日期
   * @param { date } - 时间戳  @param { fmt }  - 格式格式
   * @return { fmt }
   * @dome01 this._utils.dateFormat(1507513800642, 'yyyy/MM/dd hh:mm:ss')  => 2017/10/09 09:50:00
   * @dome02 this._utils.dateFormat(1507513800642, 'yyyy-MM-dd hh:mm:ss')  => 2017-10-09 09:50:00
   * @dome03 this._utils.dateFormat(1507513800642, 'yyyy.MM.dd , hh-mm-ss') => 2017.10.09 , 09-50-00
   */
  dateFormat(date, fmt) {
    if (!(date && true)) return date
    date = new Date(parseInt(date))
    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  },
  /**
   * @Created by Jun on 2018-07-26
   * @desc 根据详细时间,截取年月日获取日期
   * @param { date } - 时间
   * 无法获取2018-7-8，所以移动端无法使用
   */
  dateTime(date, type) {
    let year = date.getFullYear() // 年
    let month = date.getMonth() + 1 // 月
    let day = date.getDate() // 日
    let hour = date.getHours()
    let minute = date.getMinutes()
    if (month >= 1 && month <= 9) month = '0' + month
    if (day >= 0 && day <= 9) day = '0' + day
    if (hour >= 0 && hour <= 9) hour = '0' + hour
    if (minute >= 0 && minute <= 9) minute = '0' + minute
    if (!type) return [year, month, day].join('-')
    else return `${year}-${month}-${day} ${hour}:${minute}`
  },
  // 判断是否为微信浏览器
  isWechat() {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') return true
    else return false
  },
  // 验证价格 错误返回 true  正确返回false
  isPrice(data) {
    if (data) return !Number(data)
  },
  /**
   * 阿拉伯数字转中文数字,
   * 如果传入数字时则最多处理到21位，超过21位js会自动将数字表示成科学计数法，导致精度丢失和处理出错
   * 传入数字字符串则没有限制
   * @param {number|string} digit
   */
  toZhDigit(digit) {
    digit = typeof digit === 'number' ? String(digit) : digit
    const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const unit = ['千', '百', '十', '']
    const quot = ['万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数']

    let breakLen = Math.ceil(digit.length / 4)
    let notBreakSegment = digit.length % 4 || 4
    let segment
    let zeroFlag = []

    let allZeroFlag = []
    let result = ''

    while (breakLen > 0) {
      if (!result) { // 第一次执行
        segment = digit.slice(0, notBreakSegment)
        let segmentLen = segment.length
        for (let i = 0; i < segmentLen; i++) {
          if (segment[i] != 0) {
            if (zeroFlag.length > 0) {
              result += '零' + zh[segment[i]] + unit[4 - segmentLen + i]
              // 判断是否需要加上 quot 单位
              if (i === segmentLen - 1 && breakLen > 1) {
                result += quot[breakLen - 2]
              }
              zeroFlag.length = 0
            } else {
              result += zh[segment[i]] + unit[4 - segmentLen + i]
              if (i === segmentLen - 1 && breakLen > 1) {
                result += quot[breakLen - 2]
              }
            }
          } else {
            // 处理为 0 的情形
            if (segmentLen == 1) {
              result += zh[segment[i]]
              break
            }
            zeroFlag.push(segment[i])
            continue
          }
        }
      } else {
        segment = digit.slice(notBreakSegment, notBreakSegment + 4)
        notBreakSegment += 4

        for (let j = 0; j < segment.length; j++) {
          if (segment[j] != 0) {
            if (zeroFlag.length > 0) {
              // 第一次执行zeroFlag长度不为0，说明上一个分区最后有0待处理
              if (j === 0) {
                result += quot[breakLen - 1] + zh[segment[j]] + unit[j]
              } else {
                result += '零' + zh[segment[j]] + unit[j]
              }
              zeroFlag.length = 0
            } else {
              result += zh[segment[j]] + unit[j]
            }
            // 判断是否需要加上 quot 单位
            if (j === segment.length - 1 && breakLen > 1) {
              result += quot[breakLen - 2]
            }
          } else {
            // 第一次执行如果zeroFlag长度不为0, 且上一划分不全为0
            if (j === 0 && zeroFlag.length > 0 && allZeroFlag.length === 0) {
              result += quot[breakLen - 1]
              zeroFlag.length = 0
              zeroFlag.push(segment[j])
            } else if (allZeroFlag.length > 0) {
              // 执行到最后
              if (breakLen == 1) {
                result += ''
              } else {
                zeroFlag.length = 0
              }
            } else {
              zeroFlag.push(segment[j])
            }

            if (j === segment.length - 1 && zeroFlag.length === 4 && breakLen !== 1) {
              // 如果执行到末尾
              if (breakLen === 1) {
                allZeroFlag.length = 0
                zeroFlag.length = 0
                result += quot[breakLen - 1]
              } else {
                allZeroFlag.push(segment[j])
              }
            }
            continue
          }
        }
        --breakLen
      }
      return result
    }
  }
}
