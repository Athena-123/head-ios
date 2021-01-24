<template>
  <div class="gender-container">
    <div>
      <van-picker title="标题" show-toolbar :columns="columns" @change="onChange" @cancel="$emit('genderShows')"
        @confirm="onConfirm" :default-index="genders"/>
    </div>
  </div>
</template>

<script>
  import { getCurrentGender } from '@/api/message/user.js'
  import { UserData } from '@/api/login/user.js'

  // import { Toast } from 'vant';

  export default {
    name: 'Gender',
    data() {
      return {
        columns: ["男", "女"],
        index:''
      };
    },
    props:['genders'],
    methods: {
      // 监听内容改变
      onChange(value,index) {
        if(index=='男') {
          this.index = 0
        } else {
          this.index = 1
        }
      },
      // 确定按钮
      async onConfirm(){
        const {data:res} = await getCurrentGender(this.index)
        this.$emit('index',res.data.gender)
        const {data} = await UserData(this.$store.state.user)
        console.log(data,99999);
        this.$emit('genderShows')
      }
    }

  }
</script>
<style lang='css' scoped>

</style>