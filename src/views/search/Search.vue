<template>
  <div>
    <form action="/">
      <van-search v-model.trim="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel"
        background="#439ffc" @focus="onFocus" @input="valChange(value)" />
    </form>
    <search-result v-if="isResultShow" :resultArr="resultArr"></search-result>
    <search-suggest v-else-if="value" :suggestArr="suggestArr" @inputValUpdata="inputValUpdata" :value="value">
    </search-suggest>
    <search-history v-else :historyArr="historyArr" @delItemBtn="delItemBtn" @delAllBtn="delAllBtn"
      @inputValUpdata="inputValUpdata"></search-history>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  import searchHistory from '@/views/search/components/search-history.vue';
  import searchSuggest from '@/views/search/components/search-suggest.vue';
  import searchResult from '@/views/search/components/search-result.vue';

  import { searchHistoryItem } from '@/api/search/search.js';
  import { searchResultItem } from '@/api/search/search.js';

  import { setItem, getItem } from '@/utils/local.js';


  export default {
    name: 'Search',
    data() {
      return {
        value: '',
        historyArr: getItem('historyData') || [],
        isResultShow: false,
        suggestArr: [],
        params: {
          page: 1,
          per_page: 10,
        },
        resultArr: [],
      };
    },
    methods: {
      // 点击回车时触发
      onSearch(val) {
        this.isResultShow = true;
        this.historyArr.push(val)
        setItem('historyData', this.historyArr)
      },

      // 表单获得焦点时
      onFocus() {
        this.isResultShow = false;
      },
      // 删除每项历史数据时
      delItemBtn(index) {
        this.historyArr.splice(index, 1);
        setItem('historyData', this.historyArr)
      },
      // 删除所有的历史数据时
      delAllBtn() {
        this.historyArr = [];
        setItem('historyData', this.historyArr)
      },
      // 表单内容发生改变时,获取联想建议（自动补全）
      async valChange(value) {
        if(value==''){
          return;
        }
        const { data: res } = await searchHistoryItem(value)
        // console.log(res,11111111111111);
        this.suggestArr = res.data.options
        // console.log(res.data.options);
      },
      async inputValUpdata(item) {
        this.value = item
        this.onSearch(this.value)
        const { data: res } = await searchResultItem({ ...this.params, q: this.value })
        this.resultArr = res.data.results
        console.log(res.data.results);
      }, onCancel() {
        Toast('取消');
        this.$router.push('/')
      }
    },
    components: {
      searchHistory,
      searchSuggest,
      searchResult
    }
  };
</script>
<style lang='css' scoped>

</style>