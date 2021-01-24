import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'

const instance = axios.create({
  baseURL: 'http://toutiao-app.itheima.net/',
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
  })

// 请求拦截
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  const { user } = store.state
  if (user && user.token) {
    // config 本次请求的请求配置对象
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应拦截器

export default instance;