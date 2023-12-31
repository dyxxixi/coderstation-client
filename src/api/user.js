import request from './request'

// 编写用户相关的api

// 获取验证码
export function getCaptchaApi() {
  return request({
    url: '/res/captcha',
    method: 'GET'
  })
}

// 查询用户是否存在
export function userIsExitApi(loginId) {
  return request({
    url: `/api/user/userIsExist/${loginId}`,
    method: 'GET'
  })
}

// 注册用户
export function registerUserApi(newUserInfo) {
  return request({
    url: '/api/user',
    method: 'POST',
    data: newUserInfo
  })
}

// 用户登录
export function loginApi(loginInfo) {
  return request({
    url: '/api/user/login',
    method: "POST",
    data: loginInfo
  })
}

// 根据id查找用户
export function getUserByIdApi(id) {
  return request({
    url: `/api/user/${id}`,
    method: 'GET'
  })
}

// 恢复登录状态
export function getInfoApi() {
  return request({
    url: '/api/user/whoami',
    method: 'GET'
  })
}

// 获取积分前十用户
export function getPointsRankApi() {
  return request({
    url: '/api/user/pointsrank',
    method: 'GET'
  })
}

// 根据id修改用户信息
export function editUserApi(userId, newUserInfo) {
  return request({
    url: `/api/user/${userId}`,
    method: 'PATCH',
    data: newUserInfo
  })
}

/**
 * 根据用户 id 确认密码是否正确
 */

export function checkPasswordIsRight(userId, loginPwd) {
  return request("/api/user/passwordcheck", {
    method: "POST",
    data: {
      userId,
      loginPwd,
    },
  });
}
