<template lang="">
  <div class="layout-container">
    <router-view></router-view>

    <!-- 底部导航 -->
    <van-tabbar class="tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="text" v-if="$store.state.user">我的</span>
        <span class="text" v-else>未登录</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  export default {
    name: 'Layout',
    data() {
      return {
        
      }
    }
  }
</script>
<style lang="css">
  .layout-container .tabbar i.iconfont {
    font-size: 40px;
  }

  .layout-container .tabbar span.text {
    font-size: 20px
  }
</style>