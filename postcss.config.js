// 目的将 px 转换为 rem 
module.exports = {
  plugins: {
    // 内部已经有该配置，不需再写
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // 如果是vant样式，使用37.5 
      // 如果是我们自己的样式，使用75
      rootValue(file){
        return file.file.includes('vant') ? 37.5 : 75
      },

      // 解构赋值
      // rootValue({ file }) {
      //   return file.includes('vant') ? 37.5 : 75
      // },
      propList: ['*']
    }
  }
}
