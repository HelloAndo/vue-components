// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import VueRouter from 'vue-router'
import dyCascader from './components/dy-cascader'
import tagsSelect from './components/tags-select'
import autoComplete from './components/auto-complete'
// Vue.use(VueRouter)
// const routes = [
//   {path: '/cascader', component: dyCascader},
//   {path: '/tagsSelect', component: tagsSelect},
//   {path: '/autoComplete', component: autoComplete}
// ];


// const router = new VueRouter({
//   routes
// })
// const router = new VueRouter()

// router.map({
//   '/cascader': {
//     component: cascader
//   },
//   '/tagsSelect': {
//     component: tagsSelect
//   }
// })
// router.redirect({
//   '*': '/cascader'
// })

// router.start(App, '#app')

/* eslint-disable no-new */
const app = new Vue({
  // router,
  template: '<App/>',
  components: {App}
}).$mount('#app')
// new Vue({
//   router,
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
