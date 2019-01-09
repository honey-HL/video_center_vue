<template>
  <div class="VideoDetail">
    <div class="header">
        <div @click="back" class="back">
            <img src="../assets/back.png" alt="">
        </div>
        <div class="video_title">{{video_title}}</div>
        <div @click="share" class="share">
            <img src="../assets/share.png" alt="">
        </div>
    </div>
    <div class="youkuplayer_box">
        <!-- <div id="youkuplayer"></div> -->
        <div class="cover_gray">
            <img class="play_btn" src="../assets/play.png" alt="">
        </div>
    </div>
    <div class="video_info">
        <div class="title_view">
            <div class="video_title_2">{{video_title}}</div>
            <div class="view_box">
                <div class="view_eye">
                    <img src="../assets/view_gray.png" style="width:100%;height:100%;display:block;" alt="">
                </div>
                <span class="view_num">{{view_num}}</span>
            </div>
        </div>
        <div class="describe">{{describe}}</div>
        <div class="upload_time">上传时间: {{upload_time}}</div>
    </div>
    <div class="related_videos">
        <div class="related_title">相关视频</div>
        <div class="video_container">
            <div v-for="(item, index) in list" :key="index" class="video_item">
                <div @click="getViDetail(item)" class="cover_images">
                <img class="img_item" :src="api.img + item.viCover" style="width:100%;height:100%;" alt="">
                <div class="view_box">
                    <div class="view">
                        <img src="../assets/view.png" style="width:100%;height:100%;" alt="">
                    </div>
                    <div class="view_num">{{item.viView}}</div>
                </div>
                </div>
                <div class="viTitle">{{item.viTitle}}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "VideoDetail",
    data() {
      return {
          list: [
            {
                viView: 0,
                viTitle: 'iPhone 6系列更换屏幕总成教程iPhone'
            },
            {
                viView: 0,
                viTitle: 'iPhone 6系列更换屏幕总成教程iPhone'
            }
          ],
          upload_time: '2019-01-8',
          describe: 'iPhone 6系列更换屏幕总成教程iPhone 6系列更换屏幕总成教程iPhone 6系列更换屏幕总成教程',
          viId: '',
          view_num: 121,
          video_title: 'iPhone 7屏幕更换教程'
      }
    },
    mounted() {
        this.video_title = this.$route.query.video_title;
        this.viId = this.$route.query.viId;
        this.init()
        // this.getVideo()
    },
    methods: {
        getVideo () {
            this.api.http('get', 'getVideo', {id: this.viId}, (result) => {

            }, (error) => {
                this.$toast.center(error.msg);
            })
        },
        init () {
            var player = new YKU.Player('youkuplayer',{
                styleid: '0',
                client_id: '1b63c938636b6ee3',
                vid: '替换成优酷视频ID',
                newPlayer: true
            });
        },
        share () {},
        back () {
            this.$router.go(-1);
        }
    },
  }
</script>

<style lang="scss" scoped>
.related_videos {
    padding: 0 15px;
    margin-top:10px;
    width: calc(100% - 30px);
    height: auto;
    background: #fff;
    margin-bottom: 10px;
    .related_title {
        font-family: MicrosoftYaHeiUI;
        font-size: 16px;
        color: #666666;
        letter-spacing: 0;
        padding: 15px 0;
        text-align: left;
    }
    .video_container {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;
        // padding-top: 12px;
        padding-bottom: 10px;
    .cover_images {
        position: relative;
        width: 100%;
        height: 6.8rem;
        .view_box {
        max-width: 60px;
        height: 15px;
        position: absolute;
        bottom: 8px;
        right: 6px;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        color: #fff;
        .view {
            float: left;
            width: 15px;
            height: 11px;
        }
        .view_num {
            float: left;
            margin-left: 5px;
        }
        }
        .img_item {
        width: 100%;
        height: auto;
        max-height: 6.8rem;
        object-fit: cover;
        background: #e6e6e6;
        background-size: cover !important;
        background-position: center !important;
        }
    }
    .video_item {
        text-align: left;
    }
    }
}
.video_info {
    background: #fff;
    width: calc(100% - 30px);
    height: auto;
    overflow: hidden;
    padding: 0 15px;
    .describe {
        text-align: left;
    }
    .upload_time {
        float: left;
        font-family: MicrosoftYaHeiUI;
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        text-align: center;
        padding-top: 5px;
        padding-bottom: 10px;
    }
    .title_view {
        display: inline-block;
        width: 100%;
        // line-height: 22px;
        // height: 22px;
        display: flex;
        .video_title_2 {
            float: left;
            font-family: MicrosoftYaHeiUI-Bold;
            font-size: 16px;
            color: #333333;
            letter-spacing: 0;
            font-weight: bold;
        }
        .view_box {
           float: left;
            margin-left: 10px;
            display: inline-block;
            // background: red;
            align-items: center;
            display: flex;
            .view_eye {
                display: inline-block;
                width: 15px;
                height: 11px;
            }
            .view_num {
                font-family: MicrosoftYaHeiUI;
                font-size: 12px;
                color: #999999;
                letter-spacing: 0;
                line-height: 15px;
                display: inline-block;
                margin-left: 5px;
            }
        }
    }
}
.youkuplayer_box {
    background: -webkit-linear-gradient(#f5f5f5, #fff);
    width: calc(100% - 30px);
    padding: 0 15px 10px;
    margin-top: 15px;
    height: 200px;
    position: relative;
    .cover_gray {
        background: rgba(0,0,0,0.50);
        position: absolute;
        top: 0;
        left: 15px;
        width: inherit;
        height: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        .play_btn {
            z-index: 9;
        }
    }
    #youkuplayer {
        width: 100%;
        height: 100%;
    }
}
.header {
    width: calc(100% - 30px);
    padding: 0 15px;
    height: 44px;
    background: #FFFFFF;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.10);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .video_title {
        flex-flow: 1;
        font-family: MicrosoftYaHeiUI;
        font-size: 16px;
        color: #666666;
        letter-spacing: 0;
    }
    .back {
        width: 16px;
        height: 16px;
    }
    .share {
        width: 16px;
        height: 16px;
    }
}
</style>
