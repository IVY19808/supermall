<template>
  <!-- <h2>首页</h2> -->
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" 
                   :titles="['流行','新款','精选']" 
                   @tabclick='tabclick' 
                   ref='tabcontrol1'
                   v-show="isTabFixed"></tab-control>
    <!-- 父组件给子组件传递数据时，需要使用:,不然会默认传递的数据为字符串类型 -->
     <!--    -->
    <scroll class="content" ref='scroll' 
            :probeType='3' 
            :pullUpLoad='true'
            @pullingUp='loadmore'
            @scroll-position='currentposition'>
      <home-swiper :banners='banners' @swiperimageLoad='swiperimageLoad'></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" 
                   @tabclick='tabclick' 
                   ref='tabcontrol2'></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- native用于监听组件原生事件时 -->
    <back-top @click.native="backclick" v-show='isShowBackTop'></back-top>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'
import Scroll from '@/components/common/scroll/Scroll'
// import BackTop from '@/components/content/backTop/BackTop.vue'

import HomeSwiper from './childComponents/HomeSwiper'
import RecommendView from './childComponents/RecommendView'
import FeatureView from './childComponents/FeatureView'

import {getHomeMultidata,getHomeGoods} from '@/network/home'
import {debounce} from '@/common/utils'
import {itemImgListenerMixin,backTopMixin} from '@/common/mixin'

  export default {
    name: "Home",
    components:{
      NavBar,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      Scroll,
      // BackTop,
    },
    // 混入
    mixins: [itemImgListenerMixin,backTopMixin],
    data() {
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        // isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        SaveScrollY:0,
        itemImgListener:null,
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    // 组件创建完成后请求数据
    created() {
      // 1.请求多个数据
      // getHomeMultidata()返回值是request(),request()返回值是Promise
      this.getHomeMultidata(),
         // 2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
      },
    mounted() {
      // console.log('mounted')
    },
    destroyed() {
      console.log('home destroyed')
    },
    methods: {
      // 事件监听方法
      //1.tabcontrol点击事件(选择流行，新款，爆款数据)
      tabclick(index){
        // console.log(index);
        switch(index){
          case 0:
            this.currentType = 'pop';
          case 1:
            this.currentType = 'new';
          case 2:
            this.currentType = 'sell'
        }
        // 为了让两个tabcontrol显示的选项保持一致
        this.$refs.tabcontrol1.currentindex = index;
        this.$refs.tabcontrol2.currentindex = index;
      },
      //2.回到首页上方点击事件
      backclick(){
        // 获取scroll组件，使用该组件内部的的scrollTo方法
        this.$refs.scroll.scrollTo(0,0,500);
        // 获取scroll组件中的scroll对象，使用该对象的scrollto方法
      //   this.$refs.scroll.scroll.scrollto(0,0,500);
      },
      // 3.页面滑到一定位置时backtop按钮何时出现
      currentposition(position){
        // console.log(position);
        //在Mixin中 BackTop在滚动到什么位置时进行显示 
        this.BackTopPostion(position);
        // 判断当前滑动位置是否到达该组件，到达时显示tabcontrol1,反之不显示
        this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop ? true : false; 
      },
      // 4.上拉加载更多数据
      loadmore(){
        // console.log('上拉加载');
        // 请求当前所处type的下一页数据
        this.getHomeGoods(this.currentType);

        // // 刷新可滚动区域
        // this.$refs.scroll.refresh();

      },
      // 5.获取轮播图加载完成后tabcontrol距离顶端高度
      swiperimageLoad(){
        // console.log(this.$refs.tabcontrol2.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
      },
      //网络请求相关方法
      // 1.请求轮播图，推荐相关数据
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          // console.log(res);
          // 存储请求到的数据
          this.banners = res.data.banner.list;
          // console.log(this.banners);
          this.recommends = res.data.recommend.list;
          })
      },
      // 2.请求商品相关数据
      getHomeGoods(type){
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res =>{
          // console.log(res);
          // this.goods[type].page = res.data.page;
          this.goods[type].page += 1;
          // 不能直接赋值，不然会覆盖之前的数据，需要向数组中往里加
          this.goods[type].list.push(...res.data.list);
          // 完成上拉下载更多后进行finishPullUp后才能再一次上拉加载更多
          this.$refs.scroll.finishPullUp();
        })
      }
    },
    activated() {
      // 跳转到离开时Y的位置
      this.$refs.scroll.scrollTo(0,this.SaveScrollY,0);
      // 重新刷新scroll,计算可滚动高度
      this.$refs.scroll.refresh();
    },
    deactivated() {
      // 1.获取离开页面时Y的位置
      this.SaveScrollY = this.$refs.scroll.getScrollY();
      // console.log(this.SaveScrollY)
      // 2.取消图片加载事件监听
      this.$bus.$off('itemimageload',this.itemImgListener)
    },
  }
</script>

<style scoped>
/* 解决轮播图与nav之间重叠 */
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
/* 使用浏览器原生滚动时，nav固定不动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* 用于让tab-control下面内容滚动时此部分处于固定 */
/* .tab-control{
  没有达到该组建之前position属性为sticky，当移动到该组件时position为fixed 
     该属性很多浏览器并不支持 
  position:sticky;
  top: 44px;
  z-index: 9;
}*/
.tab-control{
  position: relative;
  z-index: 9;
}
.content{
  /* height: 500px; */
  overflow: hidden;
  /* scroll固定高度方法一： */
  /* margin-top: 44px;
  height: calc(100%-93px); */
  /*  scroll固定高度方法二： */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
