<template>
<div class="dy-cascader">
	<input type="text" readonly autocomplete="off" 
					v-model="cascader"
					@click.stop="showDropdown">
	<transition	name="demo">
	<div class="dropdown"
				v-show="isShowCascader">
		<tree :tree-data="treeData"
					@get-choice="getChoice"
					:choice="defaultChoice"></tree>
	</div>
	</transition>
</div>
</template>
<script>
import $ from 'jQuery'
import tree from './tree.vue'
export default {
	props: {
		treeData: {
			type: Array
		}
	},
	data () {
		return {
			choice: ['台湾', '垦丁', '美女'],
			// choice: ['台湾', '台北', '中山区', '蚵仔煎'],
			count: 0,
			flag: false,
			defaultChoice: [],
			isShowCascader: true
		}
	},
	methods: {
		getChoice (val) {
			// console.log(val);
			this.flag = true;
			this.getActive(this.treeData, val);
		},
		getActive (data, val) {
			if (this.flag === true) {
				this.choice = [];
				this.flag = false;
			}
			var res = data.find(function (el) {
				return el.active;
			});
			this.choice.push(res.parent);
			// console.log()
			res.parent !== val && this.getActive(res.children, val);
			// if (res.parent !== val) {
			// 	this.getActive(res.children, val);
			// }
		},
		showDropdown () {
			this.isShowCascader = true;
		},
		addKey (data) {
			var self = this;
			// self.count++;
			// debugger
			data.forEach(function (el, i) {
				var bool = el.parent === self.defaultChoice[self.count] ? true : false; 
				el = Object.assign({}, el, {'active': bool});
				data.splice(i, 1, el);
				if (el.children) {
					// if (bool) {
					// 	self.count++;
					// }
					self.addKey(el.children);
					bool && self.count++;
				}
			});

		}
	},
	mounted () {
		var self = this;
		if (self.choice.length) {
			// self.isShowCascader = true;
			for (let i = 0, len = self.choice.length; i < len; i++) {
				self.defaultChoice[i] = self.choice[i];
			}
			self.addKey(self.treeData);
		}
		$('html, body').click(function(e) {
			self.isShowCascader = false;
		});
	},
	computed: {
		cascader: {
			get: function () {
				return this.choice.join('/');
			}
		},
		// defaultChoice: {
		// 	get: function () {
		// 		return this.choice.reverse();
		// 	}
		// }
	},
	components: {
		tree
	}
}
</script>
<style>
.dy-cascader{position: relative; width: 130px;}
.demo-enter-active, .demo-leave-active {
  transition: all .4s ease;
  transform: translateY(0);
  opacity: 1;
}
.demo-enter, .demo-leave-active {
  transform: translateY(-10px);
  opacity: 0;
}
</style>