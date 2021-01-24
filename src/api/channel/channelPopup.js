import request from '@/utils/request.js'

export const getChannelList = ()=>{
  return request({
    method:'GET',
    url:'v1_0/channels'
  })
}
