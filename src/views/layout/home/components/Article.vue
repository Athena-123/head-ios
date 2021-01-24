<template lang="">
  <div class="article-container">
    <van-pull-refresh :success-text="refreshSuccessText" :success-duration="1500" v-model="refreshing"
      @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error"
        error-text="请求失败，点击重新加载" class="artcile-list">
        <article-item :articleItem="item" v-for="(item,index) in list" :key="index"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
  import { getArticlesDatas } from '@/api/login/user.js'
  import ArticleItem from './ArticleItem.vue'
  export default {
    name: 'Article',
    data() {
      return {
        list: [],
        loading: false,   // 为false时，提示加载状态不显示，
        finished: false,
        timestamp: null,
        error: false,
        refreshing: false,
        refreshSuccessText: ''
      }
    },
    props: {
      channel: {
        type: Object,
        required: true,
      }
    },
    components:{
      ArticleItem,
    },
    methods: {
      async onLoad() {
        // 当触发 load事件时，会自动将 loading 切换为 true，表示显示加载提示信息；
        // 异步更新数据
        try {
          const { data } = await getArticlesDatas({
            channel_id: this.channel.id,
            timestamp: this.timestamp || Date.now(),
            with_top: 1,
          })
          const { results } = data.data;
          // results 是一个数组
          this.list.push(...results)

          // 模拟加载失败的效果
          // if(Math.random()>0.5){
          //   this.error = true
          // }

          // 3. 本次数据加载结束后要把加载状态设置为结束
          this.loading = false;

          // 4. 判断数据是否全部加载完成
          if (results.length) {
            // 更新获取下一页数据的时间戳
            this.timestamp = data.data.pre_timestamp
          } else {
            this.finished = true;
          }
        } catch (err) {
          console.log('获取文章数据失败');
        }
      },
      async onRefresh() {
        // 重新加载数据
        try {
          const { data } = await getArticlesDatas({
            channel_id: this.channel.id,
            timestamp: Date.now(),
            with_top: 1,
          })
          const { results } = data.data;
          // results 是一个数组
          this.list.unshift(...results)

          this.refreshing = false;

          // // 模拟加载失败的效果
          // if (Math.random() > 0.5) {
          //   this.error = true
          // }

          // 提示成功
          this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
        } catch (err) {
          console.log(err)
          this.refreshing = false // 关闭下拉刷新的 loading 状态
          this.$toast('刷新失败')
        }

        // 将 loading 设置为 true，表示处于加载状态
        this.loading = false;
      },

    },
  }
</script>
<style lang="css">
  .artcile-list {
    height: 79vh;
    overflow: auto;
  }
</style>