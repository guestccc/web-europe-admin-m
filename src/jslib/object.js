/* eslint-disable */
/**
 *
 * @param {*} obj 被检查对象
 */
const isEmpty = obj => {
  if (typeof obj !== 'object') return false;

  const keys = Object.keys(obj);
  return keys.length ? true : false;
};

/**
 *
 * @param {*} obj 被检查对象
 * @param {*} prototypes 用于校验的属性数组
 */
const isComplete = (obj, prototypes) => {
  const keys = Object.keys(obj);

  let status = true;

  prototypes.forEach(element => {
    if (!keys.includes(element)) status = false;
  });

  return status;
};

export default {
  isComplete,
  isEmpty,
};
