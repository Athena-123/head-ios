<template>
    <div>
      <van-cell title="搜索历史">
        <van-icon></van-icon>
      </van-cell>
      <van-cell v-for="(item,index) in resultArr" :key="index">{{item.title}}</van-cell>
    </div>
</template>
           
<script>
export default{
    name:'search-result',
    props:{
      resultArr:{
        type:Array,
        default:()=>[]
      }
    }         
}
</script>
<style lang='css'  scoped>
 
</style>