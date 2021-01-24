import request from '@/utils/request.js'

// 获取所有的评论
export const comments = (params)=>{
  return request({
    method:'GET',
    url:`/v1_0/comments`,
    params,
  })
}

// 添加评论
export const addComment = (data)=>{
  return request({
    method:'POST',
    url:`/v1_0/comments`,
    data,
  })
}
