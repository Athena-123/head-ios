<template lang="">
  <div class="login-container">
    <!-- 导航部分 -->
    <van-nav-bar title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()"/>
    </van-nav-bar>

    <!-- 输入框 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field name="mobile" placeholder="请输入手机号" v-model="user.mobile" :rules="rulesForm.mobile" maxLength="11">
        <i slot="left-icon" class="iconfont icon-shouji icon"></i>
      </van-field>
      <van-field placeholder="请输入验证码" v-model="user.code" name="code" :rules="rulesForm.code" maxLength="6">
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <!-- 倒计时组件 -->
          <van-count-down :time="time" format="ss s" v-if="countDownShow" @finish="countDownShow = true" />
          <van-button size="small" class="send-btn" native-type="button" @click="sendSms" v-else>获取验证码</van-button>
        </template>
      </van-field>
      <div class="van-btn">
        <van-button block type="info" native-type="submit" class="commit-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
  // 引入登录注册页面数据的接口 
  import { logins, onSendSms } from '@/api/login/user.js'


  export default {
    name: 'Login',
    data() {
      return {
        user: {
          mobile: '',
          code: '',
        },
        rulesForm: {
          mobile: [{
            required: true, message: '手机号格式错误'
          }, {
            pattern: /^1[3/5/7/8]\d{9}$/,
            message: '请输入正确的手机号',
          }],
          code: [{
            required: true, message: '验证码错误'
          }, {
            pattern: /^\d{6}$/,
            message: '请输入正确的验证码'
          }]
        },
        time: 1000 * 60,
        // 倒计时显示与隐藏
        countDownShow: false,
      };
    },
    methods: {
      async onSubmit() {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        });

        // // 获取登录注册页面的数据
        try {
          const {data} = await logins(this.user)
          // 将获取到的token保存到本地存储
          this.$store.commit('setData',data.data)
          this.$toast.success('登录成功！');
          this.$router.back()
        } catch (err) {
          console.log(err);
          if (err.response.status == 400) {
            this.$toast.fail('手机号或验证码错误！')
          }
          this.$toast.fail('登录失败，请稍后登录')
        }
      },
      // 发送验证码
      async sendSms() {
        // 验证手机号的合法性
        try {
          await this.$refs.loginForm.validate('mobile')
        } catch (err) {
          this.$toast('手机格式错误', err)
        }
        // 倒计时效果
        this.countDownShow = true;
        // 接收验证码
        try {
          const res = await onSendSms(this.user.mobile)
          console.log(res);
        } catch (err) {
          this.$toast('发送失败', err)
        }
      },
    },
  }
</script>
<style lang="css">
  .login-container .iconfont {
    font-size: 37px;
    vertical-align: middle;
  }

  .login-container .send-btn {
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
  }

  .login-container .van-field__button .van-button--small {
    color: #666666;
    font-size: 22px;
    border-radius: 20px;
  }

  .login-container .commit-btn {
    /* margin-top: 53px; */
    background-color: #6db4fb;
    border: none;
    border-radius: 10px;
  }

  .van-btn {
    margin: 53px 28px;
  }
</style>