import Vue from 'vue'
import Router from 'vue-router'


const Home = () => import('@/pages/Home')
const Index = () => import('@/pages/Index')
const VideoDetail = () => import('@/pages/VideoDetail')
const Video = () => import('@/pages/Video')

Vue.use(Router)

const routers = new Router({
  routes: [
    { path: '/', redirect: "/index/home" },
    {
      path: '/index',
      name: 'index',
      redirect: "/index/home",
      component: Index,
      children: [
        { path: 'home', name: 'home', component: Home, meta: { title: "千机网技术中心", keepAlive: true} },
        { path: 'detail', name: 'detail', component: VideoDetail, meta: { title: "千机网技术中心" } },
        { path: 'video', name: 'video', component: Video, meta: { title: "千机网技术中心" } }
      ]
    }
  ]
})


export default routers