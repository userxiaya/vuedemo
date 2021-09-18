import request from '../utils/request'

export const getTableList = ({ page = 1, pageSize = 10, keyword = '', asin = '', checkType = '' }) => {
  return request({
    url: '/checkByWord',
    type: 'GET',
    params: {
      page,
      qty: pageSize,
      asin,
      keyword,
      checkType
    }
  })
}
