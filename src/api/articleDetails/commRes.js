import request from '@/utils/request.js'

// 评论回复
export const getCommRes = (params)=>{
  return request({
    method:'GET',
    url:`/v1_0/comments`,
    params,
  })
}