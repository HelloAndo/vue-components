<template>
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
					if (data.children[i].children) {
						this.recursion(data.children[i].children);
					}
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
.list {position: absolute; width: 60px; border: 1px solid #ccc;}
.list .list{left: 100%; top: 0;}
.list li{color: #000; cursor: pointer;}
.list li.active{color: #fff; background-color: #aaa;}
.list li.disabled{color: #ddd; }
</style>