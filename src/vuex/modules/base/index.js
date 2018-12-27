import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  name: 'isv',
  operationMap: new Map(),
}
export default {
  actions,
  getters,
  state,
  mutations,
}
