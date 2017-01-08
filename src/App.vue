<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <hello></hello> -->
    <div id="cascader">
      <!--<dy-cascader :tree-data="treeData"
                   @get-result="outputCascaderResult"></dy-cascader>  -->
      <dy-cascader :tree-data="treeData"
                   :default-choice="defaultChoice"
                   @get-result="outputCascaderResult"></dy-cascader>  
      <p>级联选择器,可指定默认值</p>    
    </div>
    <div id="tags-select">
      <tags-select :options="options"
                    @get-options="getOptions"
                    @get-result="outputTagsSelectResutl"></tags-select>  
      <p>select2多选,可随意输入的内容</p>        
    </div>
    <div id="auto-complete">
      <auto-complete :options="list"
                      @get-options="getList"
                      @hit="outputAutoCompleteResult"></auto-complete>
      <p>自动完成/联想输入</p>        
    </div>
  </div>
</template>

<script>
// import $ from 'jQuery'
// import Hello from './components/Hello'
import tagsSelect from './components/tags-select'
import dyCascader from './components/dy-cascader'
import autoComplete from './components/auto-complete'
var ando = 'ando'
export default {
  name: 'app',
  components: {
    tagsSelect,
    dyCascader,
    autoComplete
  },
  data () {
    return {
      /*模拟select2和autoComplete的后台数据*/
      dataList: ['abc', 'cba', 'aaa', 'absent', 'banana', 'apple', 'ball', 'Canada', 'chinese', 'love', 'America'],
      /*tags-select数据*/
      options: ['abc', 'cba', 'aaa', 'absent', 'banana', 'apple', 'ball', 'Canada', 'chinese', 'love', 'America'], 
      /*auto-complete数据  */
      list: [],
      /*级联选择器cascader数据*/
			defaultChoice: ['台湾', '垦丁', '美女'],
			// defaultChoice: [],

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
        disabled: true,
        children: [{
          parent: '九龙'
        }, {
          parent: '深水埗'
        }]
      }]   
    }
  },
  methods: {
    getOptions (val) {
      // if (!val) {
      //   this.options = [];
      //   return;
      // }
      // console.log(val)
      this.options = this.dataList.filter(function (el) {
        return el.indexOf(val) > -1;
      });
      // if (!this.options.length) {
      //   this.options = ['无搜索结果'];
      // }
    },
    getList (val) {
      var self = this;
      // this.list = this.dataList.filter(function (el) {
      //   return el.indexOf(val) > -1;
      // });
      self.list = [];
      setTimeout(function () {
        for (let i=0; i<self.dataList.length; i++) {
          if (self.dataList[i].indexOf(val) > -1) {
            self.list.push(self.dataList[i]);
          }
        }
      }, 400);
    },
    outputAutoCompleteResult (val) {
      console.log('autoComplete组件结果: ', val);
    },
    outputCascaderResult (val) {
      console.log('cascader组件结果: ', val);
    },
    outputTagsSelectResutl (val) {
      console.log('tagsSelect组件结果: ', val);
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
  margin-top: 10px;
}
*{margin: 0; padding: 0; box-sizing: border-box;}
ul, li{list-style-type: none; text-align: left;}

#cascader{position: relative; width: 400px; height: 200px; padding: 20px; margin: 0 auto 20px; border: 1px solid #ececec; border-radius: 2px;
  -webkit-transition: box-shadow .6s ease;
  -o-transition: box-shadow .6s ease;
  transition: box-shadow .6s ease;
}
#cascader:hover{box-shadow: 2px 2px 8px rgba(0,0,0,.2);}
#cascader p{position: absolute;left: 0; bottom: 0; right: 0; background-color: #f5f5f5; line-height: 3; border-top: 1px solid #f5f5f5;}

#auto-complete{position: relative; width: 400px; height: 200px; padding: 20px; margin: 0 auto 20px; border: 1px solid #ececec; border-radius: 2px;
  -webkit-transition: box-shadow .6s ease;
  -o-transition: box-shadow .6s ease;
  transition: box-shadow .6s ease;
}
#auto-complete:hover{box-shadow: 2px 2px 8px rgba(0,0,0,.2);}
#auto-complete p{position: absolute;left: 0; bottom: 0; right: 0; background-color: #f5f5f5; line-height: 3; border-top: 1px solid #f5f5f5;}


#tags-select{position: relative; width: 400px; height: 200px; padding: 20px; margin: 0 auto 20px; border: 1px solid #ececec; border-radius: 2px;
  -webkit-transition: box-shadow .6s ease;
  -o-transition: box-shadow .6s ease;
  transition: box-shadow .6s ease;}
#tags-select:hover{box-shadow: 2px 2px 8px rgba(0,0,0,.2);}
#tags-select p{position: absolute;left: 0; bottom: 0; right: 0; background-color: #f5f5f5; line-height: 3; border-top: 1px solid #f5f5f5;}

</style>
