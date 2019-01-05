import Vue from 'vue'
import { imgDomain } from '../configs/env'

Vue.filter('imgMapper', value => imgDomain + value)
