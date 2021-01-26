<template>
  <!-- <h2>首页</h2> -->
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners='banners'></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import HomeSwiper from './childComponents/HomeSwiper'
import RecommendView from './childComponents/RecommendView.vue'
import {getHomeMultidata} from '@/network/home'
  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data() {
      return {
        banners:[],
        recommends:[]
      }
    },
    // 组件创建完成后请求数据
    created() {
      // 请求多个数据
      // getHomeMultidata()返回值是request(),request()返回值是Promise
      getHomeMultidata().then(res =>{
        console.log(res);
        // 存储请求到的数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        })
    },
  }
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
