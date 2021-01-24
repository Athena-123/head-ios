import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const key = 'TOKEN_KEY'

import {setItem,getItem} from '@/utils/local.js'


export default new Vuex.Store({
  state: {
    user: getItem(key)
  },
  mutations: {
    setData(state, val) {
      state.user = val;
      // 将获取到的token保存到本地存储
      setItem(key,state.user)
    },
  },
  actions: {
    
  },
  modules: {
  }
})
