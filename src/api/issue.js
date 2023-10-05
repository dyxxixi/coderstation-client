import request from './request'

/**
 * 分页获取问答
 * @param {*} params 包含：current、pageSize、issueStatus
 */
export function getIssueByPageApi(params) {
  return request({
    url: '/api/issue',
    method: 'GET',
    params: {
      ...params
    }
  })
}

/**
 * 新增问答
 */

export function addIssueApi(newIssue) {
  return request({
    url: '/api/issue',
    method: 'POST',
    data: newIssue
  })
}

/**
 * 根据id查找问答
 */
export function getIssueByIdAPI(id) {
  return request({
    url: `/api/issue/${id}`,
    method: 'GET'
  })
}

/**
 * 更新问答
 */
export function updateIssueApi(issueId, newIssueInfo) {
  return request({
    url: `/api/issue/${issueId}`,
    method: 'PATCH',
    data: newIssueInfo
  })
}
