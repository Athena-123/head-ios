<template lang="">
  <div class="home-container">
    <!-- 导航部分 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button slot="title" type="info" size="small" icon="search" round class="search-btn"
        @click="$router.push('/search')">
        搜索
      </van-button>
    </van-nav-bar>

    <!-- 标签栏部分 -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in tabDataList" :key="item.id">
        <article-list :channel="item"></article-list>
      </van-tab>
      <div slot="nav-right" class="replacehander"></div>
      <div slot="nav-right" class="hmg" @click="ChannelShow">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!-- // 弹出层 -->
    <van-popup v-model:show="isChannelShow" position="bottom" :style="{ height: '100%' }" closeable close-icon="close">
      <channel-popup :active="active" :channel="tabDataList" @activeChange="activeChange"></channel-popup>
    </van-popup>
  </div>
</template>
<script>
  import { getTabDatas } from '@/api/login/user.js'
  import ArticleList from './components/Article.vue'
  import ChannelPopup from './components/ChannelPopup.vue'
  import {getItem,setItem} from '@/utils/local.js'
  export default {
    name: 'Home',
    data() {
      return {
        active: 0,
        tabDataList: {},
        isChannelShow: false,
      }
    },
    created() {
      this.getTabData()
    },
    methods: {
      async getTabData() {
        // 根据判断用户是否登录
        // 用户登录
        if (this.$store.state.user) {
          const { data } = await getTabDatas()
          // 获取推荐栏列表
          this.tabDataList = data.data.channels;
        }
        // 游客登录
        else {
          // 判断游客是否是第一次还是非第一次登录
          if (getItem('visitor')) {
            this.tabDataList = getItem('visitor')
          }
          else {
            const { data } = await getTabDatas()
            // 获取推荐栏列表
            this.tabDataList = data.data.channels;
            // setItem('visitor', this.tabDataList)
          }
        }
      },
      ChannelShow() {
        this.isChannelShow = true
      },
      // 子组件修改高亮频道后将修改后的值赋值给父组件， 与父组件的高亮频道双向绑定
      activeChange(index) {
        this.active = index;
      }
    },
    components: {
      ArticleList,
      ChannelPopup,
    }
  }
</script>
<style lang="css" scoped>
  .home-container {
    padding-top: 180px;
    padding-bottom: 100px;
  }

  .home-container .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    font-size: 28px;
    border: none;
  }

  .home-container /deep/ .van-nav-bar__title {
    max-width: unset;
  }

  .home-container .van-icon {
    font-size: 32px;
  }

  .home-container /deep/ .van-tabs__wrap .van-tab {
    width: 190px;
    height: 80px;
    border-right: 1px solid #edeff3;
    font-size: 30px;
    color: #777;
  }

  .home-container /deep/ .van-tabs--line .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 2;
    width: 100%;
    height: 80px;
  }

  .home-container /deep/ .van-tabs__wrap .van-tab--active {
    color: #333;
  }

  .home-container /deep/ .van-tabs__nav {
    padding-bottom: 0;
  }

  .home-container /deep/ .van-tabs__wrap .van-tabs__line {
    width: 31px;
    height: 6px;
    background-color: #3296fa;
    bottom: 8px;
  }

  .home-container .hmg {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 67px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
  }

  .home-container .hmg i.iconfont {
    font-size: 33px;
  }

  .home-container .hmg::before {
    position: absolute;
    left: 0;
    top: 13px;
    content: '';
    width: 1px;
    height: 58px;
    background: url('~@/assets/img/gradient-gray-line.png');
    background-size: contain;
  }

  .home-container .replacehander {
    /* 这里由于之前的标签已经将父盒子的宽度平分了，所以这里再设置宽度，不会起效果，，可以通过 flex-shrink:0 来设置不占用父盒子宽度 */
    flex-shrink: 0;
    width: 67px;
    height: 82px;
  }
</style>