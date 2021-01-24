<template lang="">
  <div class="Channel-container">
    <van-cell :border="false">
      <div slot="title" class="title">我的频道</div>
      <div slot="right-icon">
        <van-button plain type="danger" round size="mini" class="edit-btn" @click="editChannel">{{channelText}}
        </van-button>
      </div>
    </van-cell>
    <!-- 我的频道 -->
    <van-grid :border="false" :gutter="10">
      <van-grid-item v-for="(item,index) in channel" :key="index" class="title-text">
        <van-icon name="clear" v-if="index==0 ? '' : clearBtnShow" @click="clearBtn(item,index)" slot="icon" />
        <div slot="text" :class="{active: index === active}">{{item.name}}</div>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title">频道推荐</div>
    </van-cell>
    <van-grid :border="false" class="pindaotuijian" :gutter="10">
      <van-grid-item v-for="(item,index) in returnChannel" :key="index" :text="item.name" class="title-text" icon="plus"
        @click="recommendBtn(item,index)" />
    </van-grid>
  </div>
</template>
<script>
  import { getChannelList } from '@/api/channel/channelPopup.js'
  import { deleteChannel, addChannel } from '@/api/delete/delete.js'
  import { getItem, setItem } from '@/utils/local.js'

  export default {
    name: "ChannelPopup",
    data() {
      return {
        getAllChannel: [],
        channelText: '编辑',
        clearBtnShow: false,
      }
    },
    props: {
      channel: {
        type: Array,
        required: true
      },
      active: {
        type: Number,
        required: true,
      }
    },
    created() {
      this.getAllChannelData()
      console.log(this.getAllChannel);
    },
    computed: {
      returnChannel() {
        var getNewChannel = [];
        this.getAllChannel.forEach(item => {
          const res = this.channel.find(myitem => {
            return myitem.id === item.id
          })
          if (!res) {
            getNewChannel.push(item)
          }
        });
        return getNewChannel
      }
    },
    methods: {
      async getAllChannelData() {
        try {
          const { data } = await getChannelList()
          console.log(data);
          this.getAllChannel = data.data.channels
        } catch (error) {
          console.log('获取全部频道失败', error);
        }
      },
      // 编辑按钮
      editChannel() {
        this.channelText = this.channelText == '编辑' ? '完成' : '编辑';
        this.clearBtnShow = !this.clearBtnShow;
      },

      // 清除我的频道按钮
      async clearBtn(item, index) {
        // 判断高亮频道
        if (index <= this.active) {
          this.$emit('activeChange', (this.active - 1))
        }
        var res = null;
        res = this.channel.splice(index, 1)

        // 用户登录已登录
        if (this.$store.state.user) {
          const data = await deleteChannel(item.id)
        } else {
          //  未登录  做本地存储
          setItem('visitor', this.channel)
        }

      },
      // 添加频道按钮
      async recommendBtn(item, index) {
        this.channel.push(item)
        // 已登录
        try {
          if (this.$store.state.user) {
            const data = await addChannel({
              channels: [
                {
                  id: item.id,
                  seq: index,
                }
              ]
            })
          } else {
            //  未登录  做本地存储
            setItem('visitor', this.channel)
          }
        }
        catch (err) {
          this.$toast('添加频道列表失败')
        }
      }
    },
  }
</script>
<style lang="css" scoped>
  .Channel-container {
    padding-top: 96px;
    box-sizing: border-box;
  }

  /* .Channel-container .van-popup {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  } */
  .Channel-container .van-cell {
    line-height: normal;
  }

  .Channel-container .pindao {
    display: flex;
  }

  .Channel-container .title {
    margin-top: 8px;
    font-size: 32px;
  }

  .Channel-container .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f86262;
  }

  .Channel-container /deep/ .van-grid .van-grid-item .van-grid-item__content {
    display: flex;
    flex-direction: row;
    font-size: 28px;
    height: 86px;
    background-color: #f4f5f6;
    color: #222;
    border-radius: 10px;
  }

  .Channel-container /deep/ .van-grid .van-grid-item .active {
    color: red;
  }

  .Channel-container /deep/ .van-grid .van-icon {
    font-size: 24px;
  }

  .Channel-container /deep/ .van-grid-item__icon+.van-grid-item__text {
    margin-top: 0;
    margin-left: 6px;
  }

  .Channel-container /deep/ .van-icon-clear {
    position: absolute;
    right: -116px;
    top: -56px;
    font-size: 36px;
    color: #ccc;
  }
</style>