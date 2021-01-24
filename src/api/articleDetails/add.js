import request from '@/utils/request.js'

// 关注用户
export const attentionFollowed = (target)=>{
  return request({
    method:'POST',
    url:`/v1_0/user/followings`,
    data:{
      target:target
    }
  })
}
// 文章点赞
export const attentionAttitude = (target)=>{
  return request({
    method:'POST',
    url:`/v1_0/article/likings`,
    data:{
      target:target
    }
  })
}

// 收藏文章
export const attentionCollection = (target)=>{
  return request({
    method:'POST',
    url:`/v1_0/article/collections`,
    data:{
      target:target
    }
  })
}
