import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

const loadimage = require('~/assets/images/spinner.svg')
const errorimage = require('~/assets/images/404.jpg')

Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: errorimage,
	loading: loadimage,
	attempt: 1,
	listenEvents: ['scroll']
})
