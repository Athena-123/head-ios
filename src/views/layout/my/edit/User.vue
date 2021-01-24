<template>
  <div class="user-container">
    <!--  导航区域 -->
    <van-nav-bar title="设置昵称" left-text="取消" right-text="完成" @click-left="$emit('UserShows',reUser)"
      @click-right="onClickRight" />
    <!-- /导航区域 -->

    <van-field class="post-field" v-model.trim="message" rows="2" autosize type="textarea" maxlength="7"
      placeholder="请输入昵称" show-word-limit />
  </div>
</template>

<script>
  import { getCurrentUser } from '@/api/message/user.js'
  export default {
    name: 'User',
    data() {
      return {
        message:''
      }
    },
    created() {
      this.message = this.reUser;
    },
    props: ['reUser'],
    methods: {
      async onClickRight() {
        this.$emit('UserShows', this.message)
        const data = await getCurrentUser(this.message)
        console.log(data, 8888);
      }
    },
  }
</script>
<style lang='css' scoped>
  .user-container .van-nav-bar {
    background-color: #fff;
  }

  .user-container /deep/ .van-nav-bar .van-nav-bar__content .van-nav-bar__title {
    color: #333;
  }
</style>