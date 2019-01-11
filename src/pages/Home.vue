<template>
  <div ref="viewBox" class="home">

    <div class="top_bar">
       <div class="search-bar">
        <img @click="searchEnterFun" src="../assets/search.png" />
        <input @blur="blurInput" @focus="focusInput" type="text" placeholder="输入您想看的维修视频教程" maxlength="30" v-model="searchValue" @keyup.enter="searchEnterFun">
      </div>
      <div @click="showMenu" class='video_filter'>
        <img src="../assets/menu.png" alt="">
        导航
      </div>
    </div>

    <!-- <div v-if="show_swiper" class="swiper-container"> -->
      <!-- <div class="swiper-wrapper">
        <div v-for="(item, index) in swiper_list" :key="index" class="swiper-slide">
          <img :src="api.img + item.rCover" alt="">
        </div>
      </div>
      <div class="swiper-pagination" id="swiper-pagination"></div> -->
      <swiper v-if="show_swiper" :options="swiperOption">
        <swiper-slide v-for="(slide, index) in swiper_list" :key="index">
          <img @click="getViDetail(slide)" :src="api.img + slide.rCover" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    <!-- </div> -->

    <div class="line_2"></div>
    <div ref="myscroller" class="wrap_container">
      <div :class="[is_show_load?'mar_botm':'', 'video_container']">
      <div v-for="(item, index) in list" :key="index" class="video_item">
        <div @click="getViDetail(item)" class="cover_images">
          <!-- <img class="img_item" :src="api.img + item.viCover" style="width:100%;height:100%;" alt=""> -->
          <div class="img_item" v-lazy:background-image="api.img + item.viCover"></div>
          <div class="view_box">
            <div class="view">
              <img src="../assets/view.png" style="width:100%;height:100%;cursor:pointer;" alt="">
            </div>
            <div class="view_num">{{item.viView}}</div>
          </div>
        </div>
        <div class="viTitle">{{item.viTitle}}</div>
      </div>
    </div>
    </div>

    <div v-if="is_show_load" class="bottom_box">
      <span style="width:20px;height:20px;display:inline-block;">
         <img src="../assets/load.png" style='width:100%;height:100%;' alt="">
      </span>
      加载中...
    </div>
    <div v-if="no_data" class="no_data">暂无更多数据</div>

    <div ref='filter_slide' v-if="show_menu" class="filter_slide">
      <div @click.stop.prevent="cancel" class="small_bar"></div>
      <div class='modal'>
        <div class="menu_title">导航</div>

        <div class="type_box">
          <div class="type_head">
            <div class="type_title">类型</div>
            <div class="line"></div>
          </div>
          <div class="type_wraper">
            <div @click="checkType(item)" :class="[item.clicked?'active':'type_item']" v-for="(item, index) in type_list" :key="index">
              {{item.ptName}}
              <div v-if="item.clicked" class="item_clicked">
                  <img src="../assets/clicked.png" alt="">
              </div>
            </div>
          </div>
        </div>

         <div class="brand_box">
          <div class="type_head">
            <div class="type_title">品牌</div>
            <div class="line"></div>
          </div>
          <div class="type_wraper">
            <div @click="checkBrand(item)" :class="[item.clicked?'active':'type_item']" v-for="(item, index) in brand_list" :key="index">
              {{item.pbName}}
               <div v-if="item.clicked" class="item_clicked">
                  <img src="../assets/clicked.png" alt="">
              </div>
            </div>
          </div>
        </div>

        <div v-if="checked.pbId !== '' && model_list.length > 0" class="model_box">
          <div class="type_head">
            <div class="type_title">型号</div>
            <div class="line"></div>
          </div>
          <div class="type_wraper">
            <div @click="checkModel(item)" :class="[item.clicked?'active':'type_item']" v-for="(item, index) in model_list" :key="index">
              {{item.pmName}}
              <div v-if="item.clicked" class="item_clicked">
                  <img src="../assets/clicked.png" alt="">
              </div>
            </div>
          </div>
        </div>

        <div class="confirm_bar">
          <div @click="cancel" class="cancel">返回</div>
          <div @click="confirm" class="confirm">确定</div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'home',
   components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        loop:true,
        autoplay: true,
        speed: 1000,
        pagination: {
          el: '.swiper-pagination',
          clickable :true
        }
      },
      // swiperSlides: [1, 2, 3, 4, 5, 6],
      show_swiper: true,
      title: '',
      swiper_list: [],
      no_data: false,
      total: '',
      open: false,
      show_menu: false,
      type_list: [],
      brand_list: [],
      model_list: [],
      checked: {
        ptId: '',
        pmId: '',
        pbId: ''
      },
      is_show_load: false,
      count: 1,
      list: [],
      scrollTo: '',
      searchValue: ''
    }
  },
  mounted() {
    this.remove()
    this.getRecommend()
    this.getPhoneType()
    this.getPhoneBrand()
    this.search(this.checked)
    this.getList()
  },
  ready () {
  },
  watch: {
    '$route': function(to, from) {
      if (from.name === 'detail') {
        this.$refs.viewBox.scrollTop = this.scrollTo
      }
    }
  },
  methods: {
    remove () {
      if (sessionStorage.getItem('viId')) {
        sessionStorage.removeItem('viId')
      }
    },
    getViDetail (item) {
      this.scrollTo = this.$refs.viewBox.scrollTop;
      this.$store.dispatch('setViId', item.viId || item.rLink)
      sessionStorage.setItem('viId', item.viId || item.rLink)
      this.$router.push({
        path: "/index/detail",
        query: {
          id: item.viId || item.rLink
        }
      })
    },
    getRecommend () {
      let that = this
      this.api.http("get", 'getRecommend', {}, (result) => {
        let data = result.data;
        if (data.length > 0) {
          for (let i = 0; i < data.length;i++) {
            that.swiper_list.push(data[i])
          } 
        } else {
          that.swiper_list = []
        }
      }, (error) => {
        this.$toast.center(error.msg);
      })
    },
    showMenu () {
      this.show_menu = true;
      this.checked.ptId = ''
      this.checked.pbId = ''
      this.checked.pmId = ''
      this.type_list.forEach(item => {
        item.clicked = false
      });
      this.brand_list.forEach(item => {
        item.clicked = false
      });
      this.model_list.forEach(item => {
        item.clicked = false
      });
      // console.log(this.$refs.filter_slide);
      // document.getElementsByClassName("filter_slide").style.transform = "translateX(0px)";
    },
    cancel () {
      this.show_menu = false;
    },
    confirm () {
      if (this.checked.ptId == '') {
        this.$toast.center('请选择类型');
        return
      } else if (this.checked.pbId == '') {
        this.$toast.center('请选择品牌');
        return
      } else if (this.checked.pmId == '' && this.model_list.length > 0) {
        this.$toast.center('请选择型号');
        return
      }
      this.show_menu = false;
      this.show_swiper = false;
      this.search(this.checked)
    },
     getList () {
      let that = this;
      this.box = this.$refs.viewBox
      this.box.addEventListener('scroll', () => {
        let scrollTop = this.$refs.viewBox.scrollTop
        let clientHeight = parseInt(document.body.clientHeight)
        let scrollHeight = document.getElementsByClassName('home')[0].scrollHeight
        // console.log('scrollHeight ', scrollHeight)
        // console.log('clientHeight ', clientHeight)
        // console.log('scrollTop ', scrollTop)
        // if (scrollTop >= scrollHeight-clientHeight) {
        if (scrollHeight-clientHeight-scrollTop <= 0) {
          // that.open = false
          if (that.open) {
            that.is_show_load = true
            setTimeout(function() {
              that.count++;
              if (that.list.length < that.total) {
                that.search(that.checked);
              } else {
                that.is_show_load = false
                that.no_data = true
              }
            }, 300);
            that.open = false
          }
          console.log('count', that.count);
        }
      }, true)
    },
    search (item) {
      let that = this
      let obj = {
        brandId: item.pbId,
        typeId: item.ptId,
        modelId: item.pmId,
        pageIndex: this.count,
        pageSize: 20,
        title: this.searchValue
      }
      this.api.http("get", 'search', obj, (result) => {
        this.total = result.data.total
        let data = result.data.data
        that.is_show_load = false
        if (data.length > 0) {
          for (let i = 0; i < data.length;i++) {
            that.list.push(data[i])
          } 
        } else {
          that.list = []
          that.no_data = true
        }
        that.open = true
      }, (error) => {
        this.$toast.center(error.msg);
      })
    },
    updated() {
    },
    checkModel (item) {
      this.model_list.forEach(it => {
        it.clicked = false
      })
      item.clicked = true;
      this.checked.pmId = item.pmId;
    },
    getPhoneModel (brandId) {
      this.api.http("get", 'getPhoneModel', {brandId: brandId}, (result) => {
        let data = result.data;
        this.model_list.length = 0;
        if (data.length > 0) {
           for (let i in data) {
            data[i].clicked = false;
            this.model_list.push(data[i])
          }
        } else {
          this.model_list = []
        }
      }, (error) => {
        this.$toast.center(error.msg);
      })
    },
    checkBrand (item) {
      this.brand_list.forEach(it => {
        it.clicked = false
      })
      item.clicked = true;
      this.checked.pbId = item.pbId;
      this.getPhoneModel(item.pbId)
    },
    getPhoneBrand () {
       this.api.http("get", 'getPhoneBrand', {}, (result) => {
        let data = result.data;
        for (let i in data) {
          data[i].clicked = false;
          this.brand_list.push(data[i])
        }
      }, (error) => {
        this.$toast.center(error.msg);
      })
    },
    checkType (item) {
      this.type_list.forEach(it => {
        it.clicked = false
      })
      item.clicked = true;
      this.checked.ptId = item.ptId;
    },
    getPhoneType () {
      this.api.http("get", 'getPhoneType', {}, (result) => {
        let data = result.data;
        for (let i in data) {
          data[i].clicked = false;
          this.type_list.push(data[i])
        }
      }, (error) => {
        this.$toast.center(error.msg);
      })
    },
    blurInput () {
       if (this.searchValue === '') {
        this.show_swiper = true;
        this.checked.brandId = ''
        this.checked.typeId = ''
        this.checked.modelId = ''
        this.count = 1
        this.search(this.checked)
      }
    },
    focusInput () {
    },
    searchEnterFun () {
      this.show_swiper = false
      this.search(this.checked)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mar_botm {
  margin-bottom: 50px;
}
.line_2 {
  width: 100%;
  height: 1px;
  background: #eee;
  padding-left: 20px;
  margin-left: -10px;
  overflow: hidden;
}
.swiper-container {
  // max-height: 130px;
  height: 169px;
  margin-bottom: 9px;
}
 #swiper-pagination{
    width: 100%;
    height: 10px;
    bottom: 10px;
  }
  #swiper-pagination>.swiper-pagination-bullet-active{
    background-color: #FFC23B;
  }
/*********filter_slide***********/
.filter_slide {
  // transform:translateX(5px);
  position: fixed;
  overflow: hidden;
  z-index: 9;
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  .small_bar {
    height: 100%;
    float: left;
    width: 20%;
    background:rgba(0,0,0,.2);
  }
  .modal {
    float: left;
    overflow-y: auto;
    position: absolute;
    right: 0;
    width: 80%;
    background: #fff;
    transition: all 0.2s ease-in;
    transition:width 0.1s ease-in;
　　-moz-transition:width 0.1s ease-in; /* Firefox 4 */
　　-webkit-transition:width 0.1s ease-in; /* Safari and Chrome */
　　-o-transition:width 0.1s ease-in; /* Opera */

    height: 100%;
    .confirm_bar {
      position: fixed;
      bottom:0;
      width: 80%;
      height: 60px;
      background: #FFFFFF;
      display: grid;
      grid-gap: 15px;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: center;
      box-shadow: 0 -4px 8px 0 rgba(0,0,0,0.10);
      .cancel{
        padding: 10px 0;
        margin-left:15px;
        border: 1px solid #EEEEEE;
        color: #999999;
        font-size: 16px;
      }
      .confirm {
        color: #fff;
        font-size: 16px;
        padding: 10px 0;
        margin-right:15px;
        background-image: linear-gradient(-90deg, #FFC23B 0%, #F6AA00 100%);
      }
    }
    .brand_box, .model_box {
      margin-top:10px;
    }
    .type_box, .brand_box, .model_box {
      width: calc(100% - 15px);
      padding-left:15px;
       float: left;
       .type_wraper {
         width: calc(100% - 15px);
         justify-content: center;
         align-items: center;
         padding-right: 15px;
         margin-top: 10px;
         display: grid;
         grid-template-columns: 1fr 1fr 1fr;
         grid-gap: 15px;
         .type_item{
           position: relative;
           font-size: 14px;
           background: #eee;
           height: 35px;
           line-height: 35px;
           width: 100%;
           height: 100%;
           cursor: pointer;
         }
         .item_clicked {
          position: absolute;
          width: 20px;
          height: 20px;
          display: inline-block;
          bottom: 0;
          right: 0;
           img {
            display: block;
            width: 100%;
            height: 100%;
           }
         }
         .active {
          font-size: 14px;
          height: 35px;
          line-height: 35px;
          width: 100%;
          height: 100%;
          background: #FFF8E8;
          color: #F6AA00;
          position: relative;
         }
       }
      .type_head {
        display: flex;
        flex-direction:row;
        align-items: center;
        // grid-template-columns: 1fr 3fr;
        .type_title {
          width: 32px;
          color: #666;
          font-size: 16px;
          padding-right: 15px;
        }
        .line{
          width: calc(100% - 52px);
          height: 1px;
          background: #eee;
          // width:800px;height:1px;
          margin:0px auto;padding:0px;
          overflow:hidden;
        }
      }
    }
    .model_box .type_wraper{
      grid-template-columns: 1fr 1fr;
    }
    .model_box {
      margin-bottom: 75px;
    }
    .menu_title {
      color: #666;
      font-size: 16px;
      padding-top:10px;
    }
  }
}

/*********filter_slide*******/
.bottom_box {
  position: relative;
  line-height: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-top: 1px solid #eaeaea;
  width: 100%;
  margin-right: -10px;
  margin-left:-10px;
  position: fixed;
  bottom: 0;
  background: #fff;
}
.no_data {
  width: 100%;
  text-align: center;
  position: relative;
  top: -20px;
}
.video_filter {
  border:none;
  outline: none;
  background: none;
  color: #666666;
  border: none;
  outline: none;
  background: none;
  width: 2rem;
  margin-top: 10px;
  margin-left: 10px;
  cursor: pointer;
}
.video_container {
  margin-bottom: 50px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  padding-top: 12px;
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
      height: inherit;
      max-height: 6.8rem;
      object-fit: cover;
      background: #e6e6e6;
      background-size: cover !important;
      background-position: center !important;
    }
  }
  .video_item {
    text-align: left;
    .viTitle {
      margin-top:5px;
    }
  }
}
.top_bar {
  // position: sticky;
  display: grid;
  padding-top: 10px;
  grid-template-columns: 2fr 0.3fr;
  .video_filter {
    // color: red;
  }
}
.home {
  width: calc(100% - 20px);
  // position: relative;
  padding: 0 10px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
}
.search-bar {
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  background: transparent;
  img {
    width: calc(34px / 2);
    height: calc(34px / 2);
    position: absolute;
    right: 12px;
    padding-left: 12px;
    border-left: 1px solid #eee;
    right: 12px;
  }
  input {
    width: 100%;
    height: 2.9rem;
    font-size: 14px;
    line-height: 40px;
    border:none;
    padding-left: 15px;
    box-sizing: border-box;
    outline: none;
    padding-right: 15px;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    font-family: MicrosoftYaHeiUI;
    font-size: 14px/1.5;
    color: #999999;
    letter-spacing: 0;
    // text-align: center;
  }
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
