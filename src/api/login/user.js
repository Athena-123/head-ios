import request from '@/utils/request.js'
import store from '@/store'


export const logins = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data,
  })
}

// 发起验证码请求
export const onSendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`,
    data:mobile,
  })
}
 
export const getUserData = () => {
  return request({
    method:'GET',
    url:"/v1_0/user",
    // 发起请求头参数,不在这里配置，放在拦截器里配置
  })
}

export const UserData = (target) => {
  return request({
    method:'GET',
    url:"/v1_0/user/profile",
    data:{
      target
    }
  })
}


// 获取用户频道列表
export const getTabDatas = () => {
  return request({
    method:'GET',
    url:"/v1_0/user/channels",
    // 发起请求头参数,不在这里配置，放在拦截器里配置
  })
}

// 获取用户文章列表
export const getArticlesDatas = params => {
  return request({
    method:'GET',
    url:"/v1_1/articles",
    params,
    // 发起请求头参数,不在这里配置，放在拦截器里配置
  })
}