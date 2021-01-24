import request from '@/utils/request.js'

// 获取搜索联想
export const searchHistoryItem = q => {
  return request({
    method: "GET",
    url: '/v1_0/suggestion',
    params: {
      q,
    }
  })
}

// 获取搜索历史
export const searchHistory = ()=> {
  return request({
    method: "GET",
    url: '/v1_0/search/histories',
  })
}

// 获取搜索结果
export const searchResultItem = params => {
  return request({
    method: "GET",
    url: '/v1_0/search',
    params,
  })
}
