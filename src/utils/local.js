import axios from "axios"

// 存储数据模块
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const getItem = key => {
  const res = window.localStorage.getItem(key)
  if (res) {
    return JSON.parse(res)
  } else {
    return res
  }
}

export const removeItem = key => {
  localStorage.removeItem(key)
}

