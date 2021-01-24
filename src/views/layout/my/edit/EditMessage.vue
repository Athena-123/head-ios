<template>
  <div class="edit-container">
    <!--  导航区域 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$emit('popupShow')" />
    <!-- /导航区域 -->

    <van-cell-group>
      <input type="file" ref="image" v-show @change="onChange">
      <van-cell title="头像" is-link value="内容" @click="imageCon">
        <img style="width:35px;height:35px;border-radius:50%" :src="userPhoto" alt="" />
      </van-cell>
      <van-cell title="昵称" is-link @click="user" :value="reUser" />
      <van-cell title="性别" is-link @click="gender" :value="genders==1 ? '女': '男'" />
      <van-cell title="生日" is-link @click="birth" :value="births" />
    </van-cell-group>


    <!-- 昵称弹出层 -->
    <van-popup v-model:show="UserShow" position="bottom" :style="{ height: '100%' }">
      <user @UserShows="UserShows" :reUser="reUser"></user>
    </van-popup>

    <!-- 性别弹出层 -->
    <van-popup v-model:show="genderShow" position="bottom" :style="{ height: '50%' }">
      <gender @genderShows="genderShows" :genders="genders" @index="index"></gender>
    </van-popup>

    <!-- 生日弹出层 -->
    <van-popup v-model:show="birthShow" position="bottom" :style="{ height: '50%' }">
      <birthday @birthShows="birthShows" @birthEdit="birthEdit"></birthday>
    </van-popup>

    <!-- 头像弹出层 -->
    <van-popup v-model:show="imageShow" position="bottom" :style="{ height: '100%' }">
      <image-edit v-if="imageShow" :src="src" @imageShows="imageShows" @editImage="editImage"></image-edit>
    </van-popup>
  </div>
</template>

<script>
  import User from '@/views/layout/my/edit/User.vue'
  import Gender from '@/views/layout/my/edit/Gender.vue'
  import Birthday from '@/views/layout/my/edit/Birthday.vue'
  import ImageEdit from '@/views/layout/my/edit/ImageEdit.vue'


  export default {
    name: 'EditMessage',
    data() {
      return {
        UserShow: false,
        genderShow: false,
        birthShow: false,
        imageShow: false,
        births: this.data.data.birthday,
        genders: this.data.data.gender,
        src:'',
      }
    },
    props: ['reUser', 'data','userPhoto'],
    methods: {
      user() {
        this.UserShow = true
      },
      gender() {
        this.genderShow = true
      },
      birth() {
        this.birthShow = true
      },
      UserShows(editUser) {
        this.UserShow = false
        this.birthShow = false
        this.$emit('UserEdits', editUser)
      },
      genderShows() {
        this.genderShow = false
      },
      birthShows() {
        this.birthShow = false
      },
      birthEdit(birth) {
        this.births = birth;
      },
      index(index) {
        this.genders = index
      },
      imageCon() {
        this.$refs.image.click()
      },
      onChange() {
        console.log(22);
        // console.log(this.$refs.image.files[0]);
        var src = window.URL.createObjectURL(this.$refs.image.files[0])
        this.src = src;
        this.imageShow = true;
        console.log(src);
      },
      imageShows(){
        this.imageShow = false;
      },
      editImage(image){
        this.$emit('editImage',image)
      }
    },
    components: {
      User,
      Gender,
      Birthday,
      ImageEdit
    }
  }
</script>
<style lang='css' scoped>

</style>