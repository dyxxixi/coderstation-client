import request from './request'

// 关于评论相关api

// 通过id获取问答评论
export function getIssueCommentByIdApi(id, params) {
  return request({
    url: `/api/comment/issuecomment/${id}`,
    method: 'GET',
    params: {
      ...params
    }
  })
}

// 提交评论
export function addCommentApi(newComment) {
  return request({
    url: '/api/comment',
    method: 'POST',
    data: newComment
  })
}
