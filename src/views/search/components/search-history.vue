<template>
  <div>
    <van-cell title="搜索历史">

      <van-icon @click="delBtn" slot="right-icon" name="delete" style="display: flex; align-items: center;"
        v-if="isdelBtnShow"></van-icon>
      <van-icon slot="extra" v-else>
        <span @click="delAllBtn">全部删除</span>
        <span @click="isdelBtnShow=true">完成</span>
      </van-icon>
    </van-cell>
    <van-cell v-for="(item,index) in historyArr" :key="index">
      <div slot="title" @click="historyItem(item)">{{item}}</div>
      <van-icon slot="right-icon" name="clear" v-if="!isdelBtnShow" @click="delItemBtn(index)"></van-icon>
    </van-cell>
  </div>
</template>

<script>
  import {searchHistory} from '@/api/search/search.js';

  export default {
    name: 'search-history',
    data() {
      return {
        isdelBtnShow: true,
      }
    },
    props: {
      historyArr: {
        type: Array,
        default: () => []
      }
    },
    created() {
       this.getHistoty()
    },
    methods: {
      async getHistoty(){
        const {data} = await searchHistory()
        this.historyArr.concat(data.data.keywords)
        // console.log(data,11111);
      },
      delBtn() {
        this.isdelBtnShow = false;
      },
      delItemBtn(index) {
        this.$emit('delItemBtn', index)
      },
      delAllBtn() {
        this.$emit('delAllBtn')
        this.isdelBtnShow = true;
      },
       historyItem(item){
        this.$emit('inputValUpdata', item)
      }
    },
  }
</script>
<style lang='css' scoped>

</style>