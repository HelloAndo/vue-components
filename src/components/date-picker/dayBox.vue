<template>
<div>
  <div class="tr clearfix">
    <span class="td">日</span>
    <span class="td">一</span>
    <span class="td">二</span>
    <span class="td">三</span>
    <span class="td">四</span>
    <span class="td">五</span>
    <span class="td">六</span>
  </div>
  <div class="tr clearfix" v-for="l in dateSort">
    <span class="td" v-for="r in l"
          :class="{hasWritten: r.hasWritten}">{{r.day || ''}}</span>
  </div>
</div>
</template>
<script>
import Bus from '../Bus.js'
export default {
  props: {
    date: {}
  },
  // props: ['yy', 'mm'],
  data () {
    return {
      dateSort: []
    }
  },
  methods: {
    initDatePicker () {
      this.dateSort.splice(0)
      for (let i = 1; i <= this.days; i++) {
        this.dateSort.push({day: i, hasWritten: true})
      }

      let tmp = this.firstDayOfWeek
      while (tmp--) {
        this.dateSort.unshift(0);
      }
      this.dateSort = _.chunk(this.dateSort, 7);
    },
    toPrev () {
      this.date.mm < 2 
        ? this.$emit('change-date', {yy: --this.date.yy, mm: 12})
        : this.$emit('change-date', {mm: --this.date.mm})
      this.initDatePicker()
    },
    toNext () {
      this.date.mm > 11
        ? this.$emit('change-date', {yy: ++this.date.yy, mm: 1}) 
        : this.$emit('change-date', {mm: ++this.date.mm})
      this.initDatePicker()
    }
  },
  computed: {
    days () {
      return new Date(this.date.yy, this.date.mm, 0).getDate()
    },
    firstDayOfWeek () {
      return new Date(this.date.yy, this.date.mm - 1, 1).getDay()
    }
  },
  watch: {

  },
  mounted () {
    this.initDatePicker()
    Bus.$on('demo', (val) => {
      console.log(val)
    })
  }
}
</script>
<style scoped>
.clearfix:before{display: table; clear: both; content: '';}
.table{}
.table .caption{}
.table .tr{width: 250px; margin-left: auto; margin-right: auto;}
.table .td{display: inline-block; width: 32px; min-height: 1px; float: left; text-align: right;}
.table .td.hasWritten{color: #f00;}


</style>