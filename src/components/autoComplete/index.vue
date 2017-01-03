<template>
<div class="autoC"
			@keyup.up="upIndex"
			@keyup.down="downIndex"
			@keyup.enter="mychoice">
	<input type="text" placeholder="请输入"
					v-model="key"
					@input="getOptions($event)">
<!-- 	<transition	name="custom-classes-transition"
					    enter-active-class="animated tada"
					    leave-active-class="animated bounceOutRight"> -->	
	<transition	name="demo">
		<ul class="searchRes"
				v-show="options.length && isShowOptions">
			<li v-for="(option, index) in options"
					:class="{'hover': index === nowIndex}"
					@click="mychoice($event, index)">{{option}}</li>
			<!-- <li>2</li> -->
		</ul>
	</transition>
</div>
</template>
<script>
import $ from 'jQuery'
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
				console.log(this.options)
				// this.nowIndex = -1;
			}
		}
	},
	methods: {
		getOptions (e) {
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
	},
	mounted () {
		var self = this;
		// $('body').on('click', function(event) {
		// 	event.preventDefault();
		// 	$(self.$el).
		// });
		document.addEventListener("click", function(){
		  self.isShowOptions = false;
		});
	}
}
</script>

<style >
@import '../../../static/css/index.css';
.autoC{display: inline-block; width: 160px; position: relative;}
.autoC input{width: 160px;}
.searchRes{position: absolute; left: 0; right: 0; border: 1px solid #dfdfdf; border-radius: 4px; box-shadow: 0 0 4px rgba(0,0,0,.1);}
.searchRes li{    
	display: block;
  padding: 5px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.42857143;
  color: #333;
  font-size: 13px;
  cursor: pointer;
  transition: all .2s ease;
 }
.searchRes li:hover, .searchRes li.hover{color: #fff; background-color: #41cac0;}
/*.demo-enter{height: 0;opacity: 0;}
.demo-active-enter{height: auto; opacity: 1;}
.demo-leave{height: auto; opacity: 1;}
.demo-leave-active{height: 0; opacity: 0;}*/
/*.demo{transition: all 0.8s ease;}*/
.demo-enter-active, .demo-leave-active {
  transition: all .4s ease;
  transform: translateY(0);
  opacity: 1;
}
/*.demo-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  transition: all .8s ease;
  height: auto;
  opacity: 1;
}*/
.demo-enter, .demo-leave-active {
  transform: translateY(-10px);
  opacity: 0;
}
</style>