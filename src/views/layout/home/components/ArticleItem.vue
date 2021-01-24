<template lang="">
  <div class="articleItem-container">
    <van-cell @click="acticle" v-if="isdetailsShow">
      <div slot="title" class="title an-multi-ellipsis--l2">{{articleItem.title}}</div>
      <div>{{articleItem.art_id}}</div>
      <div slot="label">
        <div v-if="articleItem.cover.type===3" class="three">
          <div v-for="(item,index) in articleItem.cover.images" :key="index" class="threeImg">
            <van-image :src="item" fit="cover" class="threeImgItem"/>
          </div>
        </div>
        <div class="label-info-wrap">
          <span>{{articleItem.aut_name}}</span>
          <span>{{articleItem.comm_count}} 评论</span>
          <span>{{articleItem.pubdate | relativeTime}}</span>
        </div>
      </div>
      <div v-if="articleItem.cover.type===1" slot="default" class="oneslot">
        <van-image :src="articleItem.cover.images[0]" class="oneImg" fit="cover"/>
      </div>
    </van-cell>
    <article-details v-else ></article-details>
  </div>
</template>
<script>
  import ArticleDetails from '@/views/layout/home/components/ArticleDetails.vue'
  export default {
    name: "ArticleItem",
    data() {
      return {
        isdetailsShow:true
      }
    },
    props: {
      articleItem: {
        type: Object,
        required: true,
      }
    },
    methods: {
      acticle(){
        this.isdetailsShow = false;
        this.$router.push(`/${this.articleItem.art_id}`)
      }
    },
    components:{
      ArticleDetails,
    }
  }
</script>
<style lang="css" scoped>
  .articleItem-container /deep/ .van-cell-value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .articleItem-container .oneImg {
    width: 232px;
    height: 146px;
  }

  .articleItem-container .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .articleItem-container .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .articleItem-container .three {
    display: flex;
    padding: 30px 0;
  }

  .articleItem-container .three .threeImg {
    flex: 1;
    height: 146px;
  }

  .articleItem-container .three .threeImg .threeImgItem {
    width: 100%;
    height: 146px;
  }

  .articleItem-container .three .threeImg:not(:last-child) {
    padding-right: 4px;
  }
</style>