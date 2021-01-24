import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文包
import 'dayjs/locale/zh-cn'  
// dayjs默认是英文的 ，，设置为 中文
dayjs.locale('zh-cn')

// 加载处理时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)


Vue.filter('relativeTime', (data) => {
 return dayjs(data).fromNow()   // 显示多少时间之前
})


