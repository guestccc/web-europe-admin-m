/**
 * 全局过滤器
 */

import PermissionMapper from '../configs/permission-mapper';

const CryptoJS = require('crypto-js');

// eslint-disable-next-line import/prefer-default-export
export const pms2MenuList = (permissionList) => {
  const sideMemuList = []

  permissionList.forEach((value) => {
    console.log(value, '*-*-*-*-*/*/*/*/*/*/+/+/+/')
    const menuItem = PermissionMapper.get(value.name)
    if (value.children && Array.isArray(value.children) && value.children.length) {
      const { children } = value
      menuItem.children = []
      children.forEach((subValue) => {
        const item = PermissionMapper.get(subValue.name)
        if (item) {
          menuItem.children.push(item)
        }
      })
    }
    if (menuItem) {
      sideMemuList.push(menuItem)
    }
  })
  return sideMemuList
}

export const encrypt = (data, secret = 'Danakl123') => CryptoJS.AES.encrypt(data, secret)

export const decrypt = (encryptedData, secret = 'Danakl123') => {
  const bytes = CryptoJS.AES.decrypt(encryptedData.toString(), secret);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return plaintext
}

export const getOperationByName = (moduleName, operationList) => {
// eslint-disable-next-line consistent-return
  operationList.forEach((value, index) => {
    console.log(index)
    if (value.name === moduleName) {
      return value.operations
    }
  })
}
