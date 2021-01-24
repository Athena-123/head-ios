import request from '@/utils/request.js'

export const deleteChannel = (target)=>{
  return request({
    method:'DELETE',
    url:`/v1_0/user/channels/${target}`
  })
}

export const addChannel = (data)=>{
  return request({
    method:'PATCH',
    url:`/v1_0/user/channels`,
    data
  })
}