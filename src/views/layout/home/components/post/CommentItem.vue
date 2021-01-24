<template>
  <div class="comment-container">
    <!-- 用户信息 -->
    <!-- {{items.com_id}}======== -->
    <van-cell class="user-info" center :border="false">
      <van-image class="avatar" slot="icon" round fit="cover" :src="items.aut_photo" />
      <div slot="title" class="user-name">{{ items.aut_name }}</div>
      <div slot="label">{{items.content}}</div>
      <div slot="label" class="publish-date">
        <span>{{ items.pubdate | relativeTime }}</span>
        <van-button type="default" size="small" round @click="replayCom(items.com_id)">回复 {{items.reply_count}}</van-button>
      </div>
      <van-icon name="good-job-o">
        <span class="like-count">{{items.like_count}}</span>
      </van-icon>
    </van-cell>



    <!-- 回复评论弹出层 -->
    <van-popup v-model:show="isCommentShow" position="bottom" :style="{ height: '100%' }">
      <replay-comment @replayClose="replayClose" :contents="contents" :items="items" @replayCountChange="replayCountChange"></replay-comment>
    </van-popup>

  </div>
</template>

<script>
  import ReplayComment from '@/views/layout/home/components/post/ReplayComment.vue'
  export default {
    name: 'CommentItem',
    data() {
      return {
        isCommentShow:false,
      }
    },
    props: {
      items: {
        type: [Object,String,Number]
      },
      contents:{
        type:Object,
      }
    },
    created() {
      // console.log(this.items,444444);
    },
    components:{
      ReplayComment,
    },
    methods: {
      replayCom(comId){
        this.isCommentShow = true
      },
      replayClose(){
        this.isCommentShow = false
      },
      replayCountChange(num){
        this.items.reply_count = num
      }
    },
  }
</script>
<style lang='css' scoped>
  .comment-container .avatar {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .comment-container .publish-date {
    display: flex;
  }
  .comment-container .van-button {
    margin-left: 20px;
    width: 120px;
    height: 40px;
    color: #c7c4c7;
  }
  .comment-container .like-count {
    margin-left: 10px;
  }
</style>