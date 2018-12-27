/* eslint-disable import/prefer-default-export */
import { UPDATE_USER_NAME } from './mutation-types';

export const upadteNameAsync = ({ commit }, name) => {
  setTimeout(() => {
    commit(UPDATE_USER_NAME, name)
  }, 1000)
}
