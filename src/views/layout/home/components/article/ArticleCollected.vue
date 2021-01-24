<template>
  <div class="articlecollected-container">
    <!-- 收藏按钮 -->
    <van-icon name="star-o" v-if="!collected" @click="is_collectedShow" />
    <van-icon name="star" v-else @click="is_collectedHide" />
  </div>
</template>

<script>
    import { attentionCollection } from '@/api/articleDetails/add.js'
  import { cancelCollection } from '@/api/articleDetails/cancel.js'
  export default {
    name: 'ArticleCollected',
    data() {
      return {
      }
    },
    props: {
      collected: {
        type: Boolean,
        default: false,
      },
      collectedId:{}
    },
    methods: {
      async is_collectedShow() {
        if(this.$store.state.user) {
          this.$emit('collected',this.collected)
          const data = await attentionCollection(this.collectedId)
          
        } else {
          this.$router.push('/login')
        }
      },
      async is_collectedHide() {
        this.$emit('collected',this.collected)
        const data = await cancelCollection(this.collectedId)
      }
    },

  }
</script>
<style lang='css' scoped>

</style>