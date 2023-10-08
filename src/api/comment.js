import request from './request'

// 关于评论相关api

// 通过issueId获取问答评论
export function getIssueCommentByIdApi(id, params) {
  return request({
    url: `/api/comment/issuecomment/${id}`,
    method: 'GET',
    params: {
      ...params
    }
  })
}

// 根据bookId获取该书籍所对应的评论
export function getBookCommentByIdApi(id, params) {
  return request({
    url: `/api/comment/bookcomment/${id}`,
    method: "GET",
    params: {
      ...params,
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

