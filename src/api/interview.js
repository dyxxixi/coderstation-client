import request from "./request";

// 面试题相关接口

// 获取所有分类对应的面试题标题
export function getInterviewTitleApi() {
  return request({
    url: '/api/interview/interviewTitle',
    method: 'GET'
  })
}

// 根据id获取面试题
export function getInterviewByIdApi(id) {
  return request({
    url: `/api/interview/${id}`,
    method: 'GET'
  })
}
