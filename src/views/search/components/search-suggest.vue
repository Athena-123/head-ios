<template>
  <div>
    <van-cell title="搜索历史">
      <van-icon slot="icon" name="search" style="display: flex; align-items: center;"></van-icon>
    </van-cell>
    <van-cell v-for="(item,index) in suggestArr" :key="index">
      <div slot="title" @click="getCellVal(item)" v-html="regMatch(item)"></div>
    </van-cell>
  </div>
</template>

<script>
  export default {
    name: 'search-suggest',
    props: {
      suggestArr: {
        type: Array,
        default: () => []
      },
      value: {
        type: String,
      }
    },
    methods: {
      getCellVal(item) {
        this.$emit('inputValUpdata', item)
      },
      regMatch(str) {
        var reg = new RegExp(this.value, 'gi')
        var newStr = str.replace(reg, `<span style="color:red">${this.value}</span>`)
        return newStr
      }
    },
  }
</script>
<style lang='css' scoped>

</style>