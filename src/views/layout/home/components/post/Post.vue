<template>
  <div class="comment-post">
    <van-field class="post-field" v-model.trim="message" rows="2" autosize type="textarea" maxlength="50"
      placeholder="请输入留言" show-word-limit />
    <van-button class="post-btn" @click="post" :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
  export default {
    name: 'Post',
    data() {
      return {
        message: '',
      }
    },
    components: {
    },
    methods: {
      post() {
        this.$emit('publish',this.message)
        this.message=''
      }
    },

  }
</script>
<style lang='css' scoped>
  .comment-post {
    display: flex;
    align-items: center;
    padding: 32px 0 32px 32px;
  }

  .comment-post .post-field {
    background-color: #f5f7f9;
    height: 200px;
  }

  .comment-post .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
  }
</style>