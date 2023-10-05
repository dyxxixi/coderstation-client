import request from './request'

// 编写类型相关的api

// 获取所有类型
export function getTypesApi() {
  return request({
    url: '/api/type',
    method: 'GET'
  })
}


