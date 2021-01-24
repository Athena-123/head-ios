<template>
  <div class="user-replay-container">
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

  </div>
</template>
           
<script>
export default{
    name:'',
    props:{
      items:{
        type:Object,
      }
    },        
}
</script>
<style lang='css'  scoped>
 .user-replay-container .avatar {
   width: 100px;
   height: 100px;
   margin-right: 20px;
 }
 .user-replay-container  .publish-date {
    display: flex;
  }
 .user-replay-container  .van-button {
    margin-left: 20px;
    width: 120px;
    height: 40px;
    color: #c7c4c7;
  }
</style>