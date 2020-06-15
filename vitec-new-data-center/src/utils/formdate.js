export function getFirstOfMonth() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  return year + "-" + month + "-" + '01';
}

export function getToday(val) {
  val = val || false
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  let day = date.getDate();
  day = day < 10 ? '0' + day : day;
  if (val) {
    return year + '年' + month + '月' + day + '日'
  } else {
    return year + '-' + month + '-' + day;
  }
}

export function getFullMonth() {
  let arr = [];
  let month = new Date().getMonth() + 1;
  for (let i = 0; i < month; i++) {
    arr.push(i + 1 + "月份");
  }
  return arr;
}

export function formatDate(value) {
  value = new Date(value)
  let fmt = "yyyy-MM-dd"
  let o = {
    "M+": value.getMonth() + 1, //月份 
    "d+": value.getDate(), //日 
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (value.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

export function formData(value) {
  value = value.substr(0,4) + '-' + value.substr(5, 2) + '-' + value.substr(8, 2)
  return value;
}