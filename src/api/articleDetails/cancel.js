import request from '@/utils/request.js'

// 取消关注用户
export const cancelFollowed = (target)=>{
  return request({
    method:'DELETE',
    url:`/v1_0/user/followings/${target}`
  })
}
// 取消文章点赞
export const cancelAttitude = (target)=>{
  return request({
    method:'DELETE',
    url:`/v1_0/article/likings/${target}`
  })
}

// 取消收藏文章
export const cancelCollection = (target)=>{
  return request({
    method:'DELETE',
    url:`/v1_0/article/collections/${target}`
  })
}

