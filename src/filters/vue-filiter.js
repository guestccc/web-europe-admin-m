import Vue from 'vue'
import env from '../configs/env'

const { imgDomain } = env
Vue.filter('imgMapper', value => imgDomain + value)
