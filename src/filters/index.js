import Vue from 'vue'
Vue.filter('chinesize', function (val) {
  let map = {
    0: '零',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
    10: '十'
  }
  return map[val]
})