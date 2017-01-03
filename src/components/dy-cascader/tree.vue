<template>
<!-- <transition	name="demo"> -->
<ul class="list">
	<li v-for="(val, index) in treeData"
			:class="{active: val.active, disabled: val.disabled}"
			@click.stop="mychoice($event, index)">
		<span v-if="val.parent">{{val.parent}}</span>
		<tree v-if="val.children && val.children.length"
					:tree-data="val.children"
					:choice="choice"
					v-show="val.active"
					@get-choice="getChoice"></tree>
	</li>
</ul>
<!-- </transition> -->
</template>
<script>
// import tree from './tree.vue'
import $ from 'jQuery'
export default {
	name: 'tree',
	props: {
		treeData: {
			type: Array
		},
		choice: {
			type: Array
		}
	},
	data () {
		return {

		}
	},
	computed: {

	},
	methods: {
		mychoice (e, index) {
			// console.log(e)
			if ($(e.currentTarget).hasClass('disabled')) {
				console.log($(e.currentTarget))
				return;
			}
			this.treeData.forEach(function (el) {
				el.active = false;
			});
			this.treeData[index].active = true;
			// 把下级的所有选择状态重置
			this.recursion(this.treeData[index]);
			this.$emit('get-choice', this.treeData[index].parent);
		},
		getChoice (val) {
			this.$emit('get-choice', val);
		},
		recursion (data) {
			if (data.children) {
				for (let i = 0, len = data.children.length; i < len; i++) {
					data.children[i].active = false;
					data.children[i].children && this.recursion(data.children[i].children);
					// if (data.children[i].children) {
					// 	this.recursion(data.children[i].children);
					// }
				}
			}
		}
	},
	mounted () {
		// var self = this;
		// if (this.treeData && this.treeData.length) {
		// 	this.treeData.forEach(function (el, i) {
		// 		el = Object.assign({}, el, {'active': false});
		// 		self.treeData.splice(i, 1, el);
		// 	});
		// }
		// console.log(this.choice)
		// if (this.choice.length) {
		// 	let res = this.choice.splice(0, 1)[0];
		// 	console.log(res)
		// 	for (let i = 0, len = this.treeData.length; i < len; i++) {
		// 		// debugger;
		// 		if (this.treeData[i].parent === res) {
		// 			console.log(this.treeData[i].parent)
		// 			this.treeData[i].active = true;
		// 			break;
		// 		}
		// 	}
		// }
	},
	components: {
		// tree
	}
}
</script>
<style>
@import '../../../static/css/index.css';
.list {position: absolute; width: 60px;font-size: 14px; border: 1px solid #dfdfdf; border-radius: 4px; box-shadow: 0 0 4px rgba(0,0,0,.1);}
.list .list{left: 100%; top: -1px;}
.list li{color: #000; cursor: pointer;	display: block;
  padding: 2px 0px 2px 4px;
  clear: both;
  font-weight: normal;
  line-height: 1.42857143;
  color: #333;
  cursor: pointer;
  transition: all .2s ease;
}
.list li:hover{ background-color: #f0f0f0;}
.list li.active{color: #fff; background-color: #41cac0;}
.list li.disabled{color: #ddd; cursor: not-allowed;}
/*.demo-enter-active, .demo-leave-active {
  transition: all .4s ease;
  transform: translateY(0);
  opacity: 1;
}
.demo-enter, .demo-leave-active {
  transform: translateY(-10px);
  opacity: 0;
}*/
</style>
