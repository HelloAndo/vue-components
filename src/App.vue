<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <hello></hello> -->
    <auto-complete :options="options"
                    @get-options="getOptions"
                    @hit="getChoice"></auto-complete>

    <!-- <div> -->
    <dy-cascader :tree-data="treeData"></dy-cascader>      
    <!-- </div> -->

  </div>
</template>

<script>
// import $ from 'jQuery'
import Hello from './components/Hello'
import autoComplete from './components/autoComplete'
import dyCascader from './components/dy-cascader'
var ando = 'ando'
export default {
  name: 'app',
  components: {
    Hello,
    autoComplete,
    dyCascader
  },
  data () {
    return {
      options: [],
      dataList: ['abc', 'cba', 'aaa', 'absent', 'banana', 'apple', 'ball', 'Canada', 'chinese', 'love', 'America'],   
      treeData: [{
        parent: '广东',
        children: [{
          parent: '广州',
          children: [{
            parent: '天河区',
            children: [{
              parent: '体育西'
            }, {
              parent: '天河南'
            }, {
              parent: '上社'
            }]
          }, {
            parent: '萝岗区',
            children: [{
              parent: '多益'
            }, {
              parent: '顺丰'
            }]
          }]
        }]
      }, {
        parent: '台湾',
        children: [{
          parent: '台北',
          children: [{
            parent: '中正区',
            children: [{
              parent: '芋圆'
            }, {
              parent: '鸡排'
            }]
          }, {
            parent: '中山区',
            children: [{
              parent: '蚵仔煎'
            }]
          }]
        }, {
          parent: '垦丁',
          children: [{
            parent: '阳光'
          }, {
            parent: '沙滩'
          }, {
            parent: '美女'
          }]
        }]
      }, {
        parent: '香港',
        disabled: true
      }]   
    }
  },
  methods: {
    getOptions (val) {
      if (!val) {
        this.options = [];
        return;
      }
      this.options = this.dataList.filter(function (el) {
        return el.indexOf(val) > -1;
      });
      if (!this.options.length) {
        this.options = ['无搜索结果'];
      }
    },
    getChoice (val) {
      console.log(val);
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*{margin: 0; padding: 0; box-sizing: border-box;}
ul, li{list-style-type: none; text-align: left;}
</style>
