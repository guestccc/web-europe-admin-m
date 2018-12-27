import { UPDATE_USER_NAME, SET_OPERATIONS_MAP } from './mutation-types';

export default {
  [UPDATE_USER_NAME](state, name) {
    state.name = name
  },
  [SET_OPERATIONS_MAP](state, map) {
    state.operationMap = map
  },
}
