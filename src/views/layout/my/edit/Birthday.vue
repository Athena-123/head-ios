<template>
  <div class="birthday-container">
    <!--  导航区域 -->
    <!-- <van-nav-bar left-text="取消" right-text="确认" @click-left="$emit('UserShows')" @click-right="onClickRight" /> -->
    <!-- /导航区域 -->

    <van-datetime-picker type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" v-model="currentDate"
      @cancel="$emit('birthShows')" @confirm="onConfirm" />
  </div>
  </div>
</template>

<script>
  import { getBirth } from '@/api/message/user.js'

  export default {
    data() {
      return {
        minDate: new Date(1987, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
      };
    },
    methods: {
      getTime(t) {
        var y = t.getFullYear();
        var m = t.getMonth() + 1;
        var d = t.getDate();
        return `${y}-${m}-${d}`;
      },
      async onConfirm() {
        console.log(this.getTime(this.currentDate), 299999);
        const { data: res } = await getBirth(this.getTime(this.currentDate))
        this.$emit('birthEdit',res.data.birthday)
        this.$emit('birthShows')
      },

    },
  };
</script>
<style lang='css' scoped>

</style>