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
        <div id="youkuplayer">
            <div v-if="!is_play"  class="cover_box">
                <img class="viCover" :src="viCover" alt="">
            </div>
            <div v-if="!is_play" @click="play" class="cover_gray">
                <img class="play_btn" src="../assets/play.png" alt="">
            </div>
        </div>
    </div>
    <div class="video_info">
        <div class="title_view">
            <div class="video_title_2">{{video_title}}</div>
            <div class="view_box">
                <div class="view_eye">
                    <img src="../assets/view_gray.png" style="width:100%;height:100%;display:block;" alt="">
                </div>
                <span class="view_num">{{viView}}</span>
            </div>
        </div>
        <div class="describe">{{viContent}}</div>
        <div class="upload_time">上传时间: {{viUploaddate}}</div>
    </div>
    <div class="related_videos">
        <div class="related_title">相关视频</div>
        <div :class="[no_video?'': 'video_container']">
            <div v-if="!no_video" v-for="(item, index) in list" :key="index" class="video_item">
                <div @click="getViDetail(item)" class="cover_images">
                <img class="img_item" :src="api.img + item.viCover" style="width:100%;height:100%;" alt="">
                <div class="view_box_2">
                    <div class="view">
                        <img src="../assets/view.png" style="width:100%;height:100%;cursor:pointer;" alt="">
                    </div>
                    <div class="view_num">{{item.viView}}</div>
                </div>
                </div>
                <div class="viTitle">{{item.viTitle}}</div>
            </div>
            <div v-if="no_video" class="no_video">暂无相关视频</div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "VideoDetail",
    data() {
      return {
        no_video: false,
        viCover: '',
        is_play: false,
        list: [],
        viVideoid: '',
        viContent: '',
        viId: '',
        viUploaddate: '',
        viView: '',
        modelId: '',
        video_title: ''
      }
    },
    mounted() {
    },
    created() {
        this.viId = sessionStorage.getItem('viId') || this.getUrlParam('id');
        console.log(this.viId);
        this.getVideo(this.viId);
    },
    methods: {
          /**获取url中的参数**/
        getUrlParam (name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            let r = window.location.hash.split('=')[1]; //匹配目标参数
            if(r != null){
                return unescape(r);
            }else{
                return null; //返回参数值
            }
        },
        play () {
            this.is_play = true
        },
        search (modelId) {
            let that = this
            let obj = {
                pageIndex: 1,
                pageSize: 10,
                modelId: modelId
            }
            this.api.http("get", 'search', obj, (result) => {
                this.total = result.data.total
                let data = result.data.data;
                console.log(data);
                if (data.length > 0) {
                    for (let i = 0; i < data.length;i++) {
                        that.list.push(data[i])
                    } 
                } else {
                    that.list.length = 0;
                    that.no_video = true
                }
                that.is_show_load = false
                that.open = true
            }, (error) => {
                this.$toast.center(error.msg);
            })
        },
        getVideo (viId) {
            this.api.http('get', 'getVideo', {id: viId}, (result) => {
                let data = result.data;
                this.viVideoid = data.viVideoid;
                this.viView = data.viView;
                this.video_title = data.viTitle;
                this.viCover = this.api.img + data.viCover;
                let date = new Date(Number(data.viUploaddate));
                this.viUploaddate = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
                this.viContent = data.viContent;
                this.init(this.viVideoid)
                this.search(data.pmId)
            }, (error) => {
                this.$toast.center(error.msg);
            })
        },
        init (viVideoid) {
            var player = new YKU.Player('youkuplayer',{
                styleid: '0',
                client_id: '1b63c938636b6ee3',
                vid: viVideoid,
                newPlayer: true
            });
        },
        share () {
            let link = location.href;
            var Url2 = link;
            var oInput = document.createElement('input');
            oInput.value = Url2;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            oInput.className = 'oInput';
            oInput.style.display='none';
            this.$toast.bottom('复制成功');
        },
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
    .no_video {
        width: inherit;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        padding-bottom: 20px;
    }
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
        height: 8rem;
        .view_box_2 {
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
            max-height: 8rem;
            object-fit: cover;
            background: #e6e6e6;
            background-size: cover !important;
            background-position: center !important;
        }
    }
    .video_item {
        width:100%;
        text-align: left;
        .viTitle {
            width: 12rem;
            margin-top:5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            }
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
        font-size:14px;
        line-height: 22px;
    }
    .upload_time {
        float: left;
        font-family: MicrosoftYaHeiUI;
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 16px;
    }
    .title_view {
        display: inline-block;
        width: 100%;
        position: relative;
        .video_title_2 {
            float: left;
            font-family: MicrosoftYaHeiUI-Bold;
            font-size: 16px;
            color: #333333;
            letter-spacing: 0;
            font-weight: bold;
            text-align: left;
            width:100%;
            word-break:break-all;
        }
        .view_box {
            position: absolute;
            right: 15px;
            bottom: 0;
            float: left;
            margin-left: 10px;
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
    height: 167px;
    max-height: 167px;
    position: relative;
    #youkuplayer {
        position: relative;
        width: inherit;
        height: inherit;
        .cover_img {
            position: absolute;
            top: 0px;
            left: 0;
            width: inherit;
            height: inherit;
            z-index: 99;
            background: rgba(0,0,0,0.50);
        }
    }
    .cover_box {
        width: inherit;
        height: inherit;
        position: absolute;
        z-index: 99;
        .viCover {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .cover_gray {
        background: rgba(0,0,0,0.50);
        position: absolute;
        top: 0;
        left: 0;
        width: inherit;
        height: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99;
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
        width: calc(100% - 50px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .back {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
    .share {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
}
</style>
