<template>
  <div class="index">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    /*页面切换效果*/
    beforeRouteUpdate(to, from, next) {
      if (to.name == "home") {
        this.transitionName = 'opacity';
      }
      else {
        let isBack = this.$router.isBack;
        if (isBack) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
        this.$router.isBack = false;
      }
      next()
    },
  }
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
  .child-view {
    height: 100%;
    transition: all .3s cubic-bezier(.55, 0, .1, 1);
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }

  .opacity-enter,
  .opacity-leave-active {
    opacity: 0;
  }

  .opacity-leave-active,
  .opacity-enter {
    opacity: 0;
  }
</style>
