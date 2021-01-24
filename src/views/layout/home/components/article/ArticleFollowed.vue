<template>
  <div class="articlefollowed-container">
    <van-button class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" v-if="!followed"
      @click="is_followedShow">关注</van-button>
    <van-button class="follow-btn" round size="small" v-else @click="is_followedHide">已关注</van-button>
  </div>
</template>

<script>
  import jsonBig from 'json-bigint'
  import { attentionFollowed } from '@/api/articleDetails/add.js'
  import { cancelFollowed } from '@/api/articleDetails/cancel.js'
  export default {
    name: 'ArticleFollowed',
    data() {
      return {
        
      }
    },
    props: {
      followed: {
        type: Boolean,
        default: false,
      },
      followedId: {
        // type: [Number, String, Object],
        // requierd: true,
      }
    },
    methods: {
      async is_followedShow() {
        if (this.$store.state.user) {
          this.$emit('followed',this.followed )
          const data = await attentionFollowed(this.followedId)
        } else {
          this.$router.push('/login')
        }
      },
      async is_followedHide() {
        this.$emit('followed',this.followed)
        const data = await  cancelFollowed(this.followedId)
      },
    },
  }
</script>
<style lang='css' scoped>
  .articlefollowed-container .follow-btn {
    width: 200px;
  }
</style>