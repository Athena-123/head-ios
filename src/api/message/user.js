import request from '@/utils/request.js'

export const getCurrentUser = (name)=>{
  return request({
    method:'PATCH',
    url:`/v1_0/user/profile`,
    data:{
      name,
    }
  })
}

export const getCurrentGender = (gender)=>{
  return request({
    method:'PATCH',
    url:`/v1_0/user/profile`,
    data:{
      gender,
    }
  })
}

export const getBirth = (birthday)=>{
  return request({
    method:'PATCH',
    url:`/v1_0/user/profile`,
    data:{
      birthday,
    }
  })
}

export const getCurrentImage = (data)=>{
  return request({
    method:'PATCH',
    url:`/v1_0/user/photo`,
    data,
  })
}
