/**
 *
 * @param {*} tableData 表格数组
 * @param {*} offset 表格当前页码
 * @param {*} limit 表格页条数
 * @description 算出当前页每条id--是总数据中的第几条
 * @since 2018/7/12
 * @author guestCcc
 */
/* eslint-disable */
export const setId = (tableData, offset, limit) => {
  for (var index in tableData) {
    tableData[index].idd = (offset - 1) * limit + 1 + Number(index)
  }
  return tableData
}
