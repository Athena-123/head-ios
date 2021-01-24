<template>
  <div class="image-container">
    <img :src="src" ref="image" alt="" class="img">
    <div class="toolbar">
      <div class="cancel" @click="$emit('imageShows')">取消</div>
      <div class="confirm" @click="confirm">确定</div>
    </div>
  </div>

</template>

<script>
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.css'
  import { getCurrentImage } from '@/api/message/user.js'


  export default {
    name: 'ImageEdit',
    data() {
      return {
        myCropper: ''
      }
    },
    mounted() {
      this.init()
    },
    props: ['src'],
    created() {
      console.log(this.src,22222222222)
    },
    methods: {
      init() {
        console.log(this.$refs.image,8888);
        this.myCropper = new Cropper(this.$refs.image, {
          viewMode: 1, // 裁剪区域限制,默认是 0 
          dragMode: 'move',  // 拖动模式，move表示图片可以移动
          // initialAspectRatio: 1,
          aspectRatio: 1,
          background: false,
          autoCropArea: 0.6,
          cropBoxMovable: false,
          cropBoxResizable: false,  // 截图区别是否可以缩放
          movable: true,  // 背景图像、画布是否允许拖动
          // zoomOnWheel: false,
        })
      },
      confirm() {
        console.log(this.myCropper.getData()); // 这是基于服务端的裁剪
        console.log(this.myCropper.getCroppedCanvas());  // 基于客户端的裁剪 <canvas width="170" height="170">
        this.myCropper.getCroppedCanvas().toBlob(async (blob) => {

          console.log(blob);   // 裁剪图片的信息

          const formData = new FormData();

          // Pass the image file name as the third parameter if necessary.

          formData.append('photo', blob/*, 'example.png' */);
          const {data} = await getCurrentImage(formData)
          this.$emit('editImage',data.data.photo)
          console.log(data);
        })

        this.$emit('imageShows')
      }
    }
  }
</script>
<style lang="css" scoped>
  .image-container {
    background-color: #000;
    height: 100%;
  }

  .image-container .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
  }

  .image-container .cancel,
  .image-container .confirm {
    width: 90px;
    height: 90px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  .image-container .img {
    display: block;
    max-width: 100%;
  }
</style>