<template>
  <div class="articleattitude-container">
    <van-icon name="good-job-o" v-if="attitude == 1 ? false : true" @click="attitudeShow" />
    <van-icon name="good-job" v-else @click="attitudeHide" />
  </div>
</template>

<script>
  import { attentionAttitude } from '@/api/articleDetails/add.js'
  import { cancelAttitude } from '@/api/articleDetails/cancel.js'


  export default {
    name: 'ArticleAttitude',
    data() {
      return {
        // isAttitude: -1,
      }
    },
    props: {
      attitude: {
        type: [Number, String,Object],
        default: () => null
      },
      attitudeId:{

      }
    },

    methods: {
      async attitudeShow() {
        if (this.$store.state.user) {
          this.$emit('attitude',this.attitude)
          const data = await attentionAttitude(this.attitudeId)
        }
        else {
          this.$router.push('/login')
        }
      },
      async attitudeHide() {
        this.$emit('attitude',this.attitude)
        const data = await cancelAttitude(this.attitudeId)
      }
    },
  }
</script>
<style lang='css' scoped>

</style>