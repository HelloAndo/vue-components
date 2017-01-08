<template>
<div class="autoC"
			@keyup.up="upIndex"
			@keyup.down="downIndex"
			@keyup.enter="mychoice">
	<input type="text" placeholder="请输入"
					v-model="key"
					@input="getOptions($event)">
	<transition name="slide">
		<ul class="searchRes" 
				v-show="isShowOptions">
			<li v-for="(option, index) in options"
					:key="option"
					class="demo" 
					:class="{'hover': index === nowIndex}"
					@click="mychoice($event, index)">{{option}}</li>
			<li style="cursor: not-allowed" key="none"
					v-show="!options.length"
					@click="clearInput">无搜索结果</li>
		</ul>
	</transition>
</div>
</template>
<script>
import $ from 'jquery'
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
		options: {
			handler: function () {
				// $('.searchRes li').removeClass('demo').addClass('demo')
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
			var index = arguments.length > 1 ? index : this.nowIndex;
			this.key = this.options[index];
			// console.log(this.key)
			this.$emit('hit', this.options[index]);
			// if (e.which === 13) {
				this.isShowOptions = false;
			// }
		},
		clearInput () {
			this.key = '';
		}
	},
	mounted () {
		var self = this;
		document.addEventListener("click", function(){
		  self.isShowOptions = false;
		});
	}
}
</script>
<style scoped>
@import '../../../static/css/index.css';
.autoC{display: inline-block; width: 100%; position: relative;}
.autoC input{width: 100%;}
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
  /*transition: all .2s ease;*/
/*  opacity: 0;
  transform: translateX(-10px);*/
 }
.searchRes li:hover, .searchRes li.hover{color: #fff; background-color: #41cac0;}
.searchRes li.demo{animation: demo .6s;}
@keyframes demo{
	0% {opacity: 0; transform: translateX(-10px);}
	100% {opacity: 1; transform: translateX(0px);}
}
/*.slide-enter{height: 0;opacity: 0;}
.slide-active-enter{height: auto; opacity: 1;}
.slide-leave{height: auto; opacity: 1;}
.slide-leave-active{height: 0; opacity: 0;}*/
/*.slide{transition: all 0.8s ease;}*/
.slide-enter-active, .slide-leave-active {
  transition: all .4s ease;
  transform: translateY(0);
  opacity: 1;
}
/*.slide-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  transition: all .8s ease;
  height: auto;
  opacity: 1;
}*/
.slide-enter, .slide-leave-active {
  transform: translateY(-10px);
  opacity: 0;
}

</style>