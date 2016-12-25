<template>
<div class="autoC"
			@keyup.up="upIndex"
			@keyup.down="downIndex"
			@keyup.enter="mychoice">
	<input type="text" placeholder="请输入"
					v-model="key"
					@keyup="getOptions($event)">
	<ul class="searchRes"
			v-show="options.length && isShowOptions">
		<li v-for="(option, index) in options"
				:class="{'hover': index === nowIndex}"
				@click="mychoice($event, index)">{{option}}</li>
		<!-- <li>2</li> -->
	</ul>
</div>
</template>
<script>
export default {
	props: {
		options: {
			type: Array
		},

	},
	data () {
		return {
			key: '',
			nowIndex: -1,
			isShowOptions: true
		}
	},
	watch: {
		// key: {
		// 	handler: function () {
		// 		this.getOptions();
		// 	}
		// },
		options: {
			handler: function () {
				console.log('---')
				// this.nowIndex = -1;
			}
		}
	},
	methods: {
		getOptions (e) {
			// console.log(e)
			this.isShowOptions = true;
			this.$emit('get-options', this.key);
		},
		upIndex () {
			this.nowIndex = this.nowIndex <= 0 ? this.options.length - 1 : this.nowIndex - 1;
			// console.log(this.nowIndex)
		},
		downIndex () {
			this.nowIndex = this.nowIndex >= this.options.length - 1 ? 0 : this.nowIndex + 1;
			// console.log(this.nowIndex)
		},
		mychoice (e, index) {
			var index = !!index ? index : this.nowIndex;
			this.key = this.options[index];
			// console.log(this.key)
			this.$emit('hit', this.options[index]);
			// if (e.which === 13) {
				this.isShowOptions = false;
			// }
		}
	}
}
</script>
<style >
.autoC{display: inline-block; width: 160px; position: relative;}
.autoC input{width: 160px;}
.searchRes{position: absolute; left: 0; right: 0; border: 1px solid #ccc;}
.searchRes li:hover, .searchRes li.hover{background-color: #ccc;}

</style>