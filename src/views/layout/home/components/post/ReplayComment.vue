<template>
  <div class="Replay-container">
    <!-- 导航部分 -->
    <van-nav-bar title="回复">
      <div slot="left">
        <van-icon name="cross" @click="onClickLeft" />
      </div>
    </van-nav-bar>
    <!-- 当前回复 -->
    <!-- 用户信息 -->
    <!-- {{items.aut_name}}======== -->
    <van-cell class="user-info" center :border="false">
      <van-image class="avatar" slot="icon" round fit="cover" :src="items.aut_photo" />
      <div slot="title" class="user-name">{{ items.aut_name }}</div>
      <div slot="label">{{items.content}}</div>
      <div slot="label" class="publish-date">
        <span>{{ items.pubdate | relativeTime }}</span>
        <van-button type="default" size="small" round>回复 {{items.reply_count}}</van-button>
      </div>
      <van-icon name="good-job-o">
        <span class="like-count">{{items.like_count}}</span>
      </van-icon>
    </van-cell>

    <!-- 全部回复 -->
    <div>全部回复</div>

    <user-replay v-for="(item,index) in userReplayList" :key="index" :items="item"></user-replay>

    <!-- 底部导航栏 -->
    <div class="article-bottom">
      <van-button slot="title" size="small" round class="comment-btn" @click="commentPopup">
        写评论
      </van-button>
    </div>
    <!-- /底部导航栏 -->


    <!-- 回复评论弹出层 -->
    <van-popup v-model="commentShow" closeable close-icon="close" position="bottom" :style="{ height: '20%' }">
      <post @publish="publish"></post>
    </van-popup>
  </div>
</template>

<script>
  import Post from '@/views/layout/home/components/post/Post.vue'
  import UserReplay from '@/views/layout/home/components/post/UserReplay.vue'

  import { addComment } from '@/api/comments/comments.js'
  import { getCommRes } from '@/api/articleDetails/commRes.js'
  import { getUserData } from '@/api/login/user.js'

  export default {
    name: 'ReplayComment',
    data() {
      return {
        params: {
          type: 'c',
          source: this.items.com_id.toString(),
        },
        userReplayList: [],
        commentShow: false,
      }
    },
    components: {
      UserReplay,
      Post,
    },
    props: {
      contents: {
        type: Object,
      },
      items: {
        type: Object,
      }
    },
    created() {
      this.getComRes()
    },
    methods: {
      async getComRes() {
        const { data: res } = await getCommRes(this.params)
        this.userReplayList.push(...res.data.results)
        console.log(this.userReplayList, 8848);
      },
      onClickLeft() {
        this.$emit('replayClose')
      },
      commentPopup() {
        this.commentShow = true;
      }
      ,
      async publish(msg) {
        this.commentShow = false;
        if (this.$store.state.user) {
          const { data: res } = await getUserData()
          this.contents.aut_name = res.data.name;
          this.contents.aut_photo = res.data.photo;
          this.contents.content = msg
          this.userReplayList.unshift(this.contents)
          var num = 0;
          this.userReplayList.forEach(item => {
            num++;
            return num
          })
          this.$emit('replayCountChange',num)
          const { data } = await addComment({
            target: this.items.com_id,
            content: this.contents.content,
            art_id: this.$route.params.id
          })

        } else {
          this.$router.push('/login')
        }

      }
    },
  }
</script>
<style lang='css' scoped>
  .Replay-container .avatar {
    width: 100px;
    margin-right: 20px;
  }

  .Replay-container .van-nav-bar {
    background-color: #fff;
  }

  .Replay-container /deep/ .van-nav-bar .van-nav-bar__title {
    color: #000;
  }

  .Replay-container .van-nav-bar .van-icon {
    color: skyblue;
  }

  .Replay-container .publish-date {
    display: flex;
  }

  .Replay-container .van-button {
    margin-left: 20px;
    width: 120px;
    height: 40px;
    color: #c7c4c7;
  }

  .Replay-container .article-bottom .van-button {
    margin-left: 20px;
    width: 420px;
    height: 50px;
    color: #666;
  }

  .Replay-container .article-bottom {
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
</style>