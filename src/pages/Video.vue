<template>
  <div class="VideoDetail">
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
  </div>
</template>

<script>
import router from '../router'

  export default {
    name: "VideoDetail",
    data() {
      return {
        viCover: '',
        is_play: false,
        viId: this.getUrlParam('id')
      }
    },
    mounted() {
    },
    created() {
        this.viId = this.getUrlParam('id');
        this.getVideo()
        console.log(this.viId)
    },
    watch: {
    },
    methods: {
        play () {
            this.is_play = true
        },
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
        getVideo () {
            this.api.http('get', 'getVideo', {id: this.viId}, (result) => {
                let data = result.data;
                this.video_title = data.viTitle;
                this.viCover = this.api.img + data.viCover;
                let date = new Date(Number(data.viUploaddate));
                this.viUploaddate = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
                this.viContent = data.viContent;
                this.init(data.viVideoid)
            }, (error) => {
                this.$toast.center(error.response.statusText);
            })
        },
        init (viVideoid) {
            var player = new YKU.Player('youkuplayer',{
                styleid: '0',
                client_id: '1b63c938636b6ee3',
                vid: viVideoid,
                newPlayer: true
            });
        }
    },
  }
</script>

<style lang="scss" scoped>

.youkuplayer_box {
    background: -webkit-linear-gradient(#f5f5f5, #fff);
    width: 100%;
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
</style>
