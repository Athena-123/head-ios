<template>
  <div class="articledetails-container">
    <!-- {{$route.path}} -->
    <!-- 导航部分 -->
    <van-nav-bar title="黑马头条" left-arrow @click-left="$router.back()" class="headline" />
    <h3 class="h3">{{artdata.title}}</h3>
    <!-- 用户信息 -->
    <van-cell class="user-info" center :border="false">
      <van-image class="avatar" slot="icon" round fit="cover" src="artdata.aut_photo" />
      <div slot="title" class="user-name">{{ artdata.aut_name }}</div>
      <div slot="label" class="publish-date">{{ artdata.pubdate | relativeTime }}</div>
      <article-followed :followed="artdata.is_followed" :followedId="artdata.aut_id" @followed="followed">
      </article-followed>
    </van-cell>
    <!-- /用户信息 -->
    <!-- 文章内容 -->
    <div class="article-content markdown-body" v-html="artdata.content"></div>
    <van-divider class="dividerEnd">正文结束</van-divider>

    <!-- 评论列表区 -->

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error"
      error-text="请求失败，点击重新加载" class="artcile-list">
      <comment-item v-for="(item,index) in commentsList" :key="index" :items="item" :contents="contents"></comment-item>
    </van-list>




    <!-- 底部导航栏 -->
    <div class="article-bottom">
      <van-button slot="title" size="small" round class="comment-btn" @click="commentPopup">
        写评论
      </van-button>
      <!-- 评论消息 -->
      <van-icon name="comment-o" :badge="artdata.ch_id" />
      <!-- 收藏按钮 -->
      <article-collected :collected="artdata.is_collected" :collectedId="artdata.art_id" @collected="collected">
      </article-collected>
      <!-- 点赞按钮 -->
      <article-attitude :attitude="artdata.attitude" :attitudeId="artdata.art_id" @attitude="attitude">
      </article-attitude>
      <!-- 分享链接 -->
      <van-icon name="share" class="" />
    </div>
    <!-- /底部导航栏 -->

    <van-popup v-model="commentShow" closeable close-icon="close" position="bottom" :style="{ height: '20%' }">
      <post @publish="publish"></post>
    </van-popup>

  </div>
  <!-- /加载完成-文章详情 -->
</template>

<script>
  import axios from 'axios'
  import jsonBig from 'json-bigint'

  import { articleDetailsData } from '@/api/article/articleDetails.js'
  import { comments, addComment } from '@/api/comments/comments.js'
  import { getUserData } from '@/api/login/user.js'

  import ArticleFollowed from '@/views/layout/home/components/article/ArticleFollowed.vue'
  import ArticleCollected from '@/views/layout/home/components/article/ArticleCollected.vue'
  import ArticleAttitude from '@/views/layout/home/components/article/ArticleAttitude.vue'
  import Post from '@/views/layout/home/components/post/Post.vue'
  import CommentItem from '@/views/layout/home/components/post/CommentItem.vue'


  import { ImagePreview } from 'vant';


  export default {
    name: 'ArticleDetails',
    data() {
      return {
        artdata: {},
        commentShow: false,
        params: {
          type: 'a',
          source: this.$route.params.id,
          // offset:'',
          // limit: '',
        },
        commentsList: [],
        finished: false,
        timestamp: null,
        error: false,
        loading: false,
        contents: {
          content: '',
          aut_name: '',
          aut_photo: '',
          like_count: 0,
          reply_count: 0,
        }
      }
    },
    components: {
      ArticleFollowed,
      ArticleCollected,
      ArticleAttitude,
      Post,
      CommentItem,
    },
    created() {
      this.getArticleData()
      this.onLoad()
      this.getUserData()
    },
    computed: {

    },
    methods: {
      async getArticleData() {
        const { data: res } = await articleDetailsData(jsonBig.parse(this.$route.params.id))
        this.artdata = res.data
        setTimeout(function () {
          var result = []
          var imgs = document.querySelectorAll('.article-content img')
          imgs.forEach((item, index) => {
            result.push(item.src)
            item.onclick = () => {
              ImagePreview({
                images: result,
                startPosition: index,
              });
            }
          })
        }, 1000)
      },

      commentPopup() {
        this.commentShow = true;
      },
      followed(isShow) {
        this.artdata.is_followed = !isShow;
      },
      collected(isShow) {
        this.artdata.is_collected = !isShow;
      },
      attitude(attitude) {
        this.artdata.attitude = attitude == -1 || null ? 1 : -1;
      },

      // 获取所有的评论列表
      async onLoad() {
        try {
          const { data: res } = await comments(this.params)
          this.commentsList.push(...res.data.results)
          // 本次数据加载结束后要把加载状态设置为结束
          this.loading = false;

          // 判断数据是否全部加载完成
          if (res.data.results.length) {
            this.finished = true;
            // 更新获取下一页数据的时间戳
            this.timestamp = res.data.last_id
          } else {
            this.finished = true;
          }
        }
        catch (err) {
          console.log('获取文章数据失败');
        }
      },
      async getUserData() {
        const { data: res } = await getUserData()
        this.contents.aut_name = res.data.name;
        this.contents.aut_photo = res.data.photo;
      },
      async publish(msg) {
        this.commentShow = false;
        if (this.$store.state.user) {
          this.contents.content = msg
          this.commentsList.unshift(this.contents)
          const { data } = await addComment({
            target: this.$route.params.id,
            content: this.contents.content,
          })
          console.log(data, 8888);
        } else {
          this.$router.push('/login')
        }

      }
    }
  }
</script>
<style lang='css' scoped>
  @import url('~@/assets/css/img.css');

  .articledetails-container {
    background-color: #fff;
    padding: 92px 30px 88px;
  }

  .articledetails-container .headline {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .articledetails-container .avatar {
    margin-right: 10px;
    width: 100px;
    height: 100px;
  }


  .articledetails-container .article-bottom {
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 2px solid #ccc;
    height: 88px;
    background-color: #fff;
  }

  .articledetails-container /deep/ .van-overlay {
    margin-top: 92px;
  }

  .articledetails-container .article-bottom .comment-btn {
    width: 282px;
    height: 46px;
    border: 2px solid #eeeeee;
    font-size: 30px;
    line-height: 46px;
    color: #a7a7a7;
  }

  .articledetails-container .article-bottom .van-icon {
    color: #666;
  }
</style>