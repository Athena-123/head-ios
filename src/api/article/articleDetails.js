import request from '@/utils/request.js'

export const articleDetailsData = (article_id)=>{
  return request({
    method:'GET',
    url:`/v1_0/articles/${article_id}`
  })
}

