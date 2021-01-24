<template lang="">
  <div class="my-container">
    <!-- 登录成功页面 -->
    <div class="header user-info" v-if="$store.state.user">
      <!-- 头像信息 -->
      <div class="user">
        <div class="left">
          <van-image :src="layoutData.photo" fit="cover" round />
          <span>{{layoutData.name}}</span>
        </div>

        <div class="right">
          <van-button round size="mini" @click="editData">编辑资料</van-button>
        </div>
      </div>
      <!-- 信息状态 -->
      <div class="user-stats">
        <div class="mesItem">
          <div>{{layoutData.art_count}}</div>
          <span>头条</span>
        </div>
        <div class="mesItem">
          <div>{{layoutData.follow_count}}</div>
          <span>关注</span>
        </div>
        <div class="mesItem">
          <div>{{layoutData.fans_count}}</div>
          <span>粉丝</span>
        </div>
        <div class="mesItem">
          <div>{{layoutData.like_count}}</div>
          <span>获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录页面显示 -->
    <div class="header not-login" v-else>
      <div class="mobile" @click="$router.push('/login')">
        <img src="@/assets/img/mobile.png" alt="">
        <span>登录 / 注册</span>
      </div>
    </div>


    <!-- 收藏历史区 -->
    <div class="shouli">
      <div class="shouliItem">
        <van-icon name="star-o" />
        <span>收藏</span>
      </div>
      <div class="shouliItem">
        <van-icon name="clock-o" />
        <span>历史</span>
      </div>
    </div>

    <!-- 消息通知 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link class="xiaozhi" />

    <!-- 退出登录 -->
    <van-cell title="退出登录" class="out" v-if="$store.state.user" clickable @click="onLoginOut" />


    <!-- 弹出层 -->
    <van-popup v-model:show="editDataShow" position="bottom" :style="{ height: '100%' }">
      <edit-message @popupShow="popupShow" :reUser="layoutData.name" @UserEdits="UserEdits" :data="data" @editImage="editImage" :userPhoto="layoutData.photo"></edit-message>
    </van-popup>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { getUserData , UserData } from '@/api/login/user.js'
  import EditMessage from '@/views/layout/my/edit/EditMessage'

  export default {
    name: 'My',
    data() {
      return {
        layoutData: {},
        editDataShow: false,
        data:'',
      }
    },
    computed: {
      ...mapState(['user'])
    },
    created() {
      if (this.user) {
        this.getData()
      }
    },
    components: {
      EditMessage,
    },
    methods: {
      onLoginOut() {
        // 在script中使用组件时，需要使用this.$dialog 来调用
        this.$dialog.confirm({
          title: '是否确认退出！',
        })
          .then(() => {
            // on confirm
            this.$store.commit('setData', null)
          })
          .catch(() => {
            // on cancel
          });
      },
      async getData() {
        try {
          const { data: res } = await getUserData()
          this.layoutData = res.data
          const {data} = await UserData(this.$store.state.user)
          this.data = data
        } catch (err) {
          this.$toast('获取用户数据失败，请稍后再试！')
        }
      },
      // 编辑资料
      editData() {
        this.editDataShow = true;
      },
      popupShow() {
        this.editDataShow = false;
      },
      UserEdits(Users) {
        this.layoutData.name = Users
      },
      editImage(image) {
        this.layoutData.photo = image
      }
    },
  }
</script>
<style lang="css">
  .my-container .header {
    height: 361px;
    background: url('~@/assets/img/banner.png');
  }

  .my-container .header.not-login {
    background-size: cover;
    display: flex;
    justify-content: center;
  }

  .my-container .not-login .mobile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .my-container .not-login .mobile img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }

  .my-container .not-login .mobile span {
    font-size: 28px;
    color: #fff;
  }

  .my-container .header.user-info .user {
    display: flex;
    padding: 76px 32px 24px;
    justify-content: space-between;
    height: 231px;
    box-sizing: border-box;
  }

  .my-container .header.user-info .user .left {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .my-container .header.user-info .user img {
    width: 132px;
    height: 132px;
  }

  .my-container .header.user-info .user .left span {
    margin-left: 22px;
    font-size: 30px;
    color: #fff;
  }

  .my-container .header.user-info .user .right {
    display: flex;
    font-size: 20px;
    align-items: center;
  }

  .my-container .header.user-info .user-stats {
    height: 130px;
    display: flex;
    justify-content: space-around;
  }

  .my-container .header.user-info .user-stats .mesItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  .my-container .header.user-info .user-stats .mesItem div {
    font-size: 36px;
  }

  .my-container .header.user-info .user-stats .mesItem span {
    font-size: 23px;
  }

  .my-container .shouli {
    display: flex;
    justify-content: space-around;
    margin-bottom: 9px;
    height: 141px;
    background-color: #fff;
  }

  .my-container .shouli .shouliItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .my-container .shouli .shouliItem:nth-child(1) .van-icon {
    margin-bottom: 15px;
    color: #eb5253;
  }

  .my-container .shouli .shouliItem:nth-child(2) .van-icon {
    margin-bottom: 15px;
    color: #ff9d1d;
  }

  .my-container .shouli .shouliItem span {
    font-size: 28px;
  }

  .my-container .message {
    margin-bottom: 2px;
  }


  .my-container .message .van-icon,
  .my-container .xiaozhi .van-icon {
    color: #9f9f9f;
  }

  .my-container .out {
    margin-top: 9px;
    text-align: center;
    color: #d86262;
    font-size: 30px;
  }
</style>