<template>
  <div id='detail'>
    <detail-nav-bar ref="detailNav" class="detail-nav" @titleitemclick="titleitemclick"></detail-nav-bar>
    <scroll ref='scroll' class="content" :probeType="3" :pullUpLoad='true' @scroll-position="scrollPosition">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCar="addToCar"></detail-bottom-bar>
    <!-- native用于监听组件原生事件时 -->
    <back-top  @click.native="backclick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :isShow='toastshow'></toast> -->
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import Scroll from '@/components/common/scroll/Scroll'
// import Toast from '@/components/common/toast/Toast'

import GoodsList from '@/components/content/goods/GoodsList'
// import BackTop from '@/components/content/backTop/BackTop'

import DetailNavBar from './childComponents/DetailNavBar';
import DetailSwiper from './childComponents/DetailSwiper';
import DetailBaseInfo from './childComponents/DetailBaseInfo';
import DetailShopInfo from './childComponents/DetailShopInfo';
import DetailGoodsInfo from './childComponents/DetailGoodsInfo';
import DetailParamInfo from './childComponents/DetailParamInfo';
import DetailCommentInfo from './childComponents/DetailCommentInfo';
import DetailBottomBar from './childComponents/DetailBottomBar';

import {mapActions} from 'vuex'
import {getDetail,getRecommend,Goods,Shop,GoodsParam} from '@/network/detail'
import {debounce} from '@/common/utils'
import {itemImgListenerMixin,backTopMixin} from '@/common/mixin'


export default {
  name:'Detail',
  // import引入的组件需要注入到对象中才能使用
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // BackTop,//在混入中导入了
    // Toast,
  },
  props:{
  },
  // 在mounted中混入
  mixins: [itemImgListenerMixin,backTopMixin],
  data () {
  // 这里存放数据
    return {
      iid:null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      itemImgListener:null,
      navBarY:[],
      getNavBarY:null,
      navCurrentIndex:0,
      // isShowBackTop:false,
      // message:'',
      // toastshow:false,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ...mapActions(['addcar']),
    //1.将商品添加到购物车
    addToCar(){
      // console.log("添加到购物车");
      //1.获取购物车需要展示的信息
      const product = {};
      product.iid = this.iid;
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      // console.log(product);
      // 2.将商品添加到购物车
      // 使用Mutations
      // this.$store.commit('addcar',product);
      // 使用Actions
      // this.$store.dispatch('addcar', product).then(res => 
      //   console.log(res)
      //   );

      // 使用mapActions 加入购物车之后Toast显示提示信息
      this.addcar(product).then(res => {
        // this.toastshow = true;
        // this.message = res;
        // setTimeout(() =>{
        //   this.message = '';
        //   this.toastshow = false;
        // },1500)
        
        this.$toast.show(res,1500)

        });
    },
    //2.scroll滚动监听事件与NavBar结合
    scrollPosition(position){
      // console.log(position);
      // 1.获取当前滚动位置的Y值
      const positionY = Math.abs(position.y);
      // 2.postionY与NavBar中title中的值进行对比[0, 5463, 6140, 6491]
      for(let i = 0; i < this.navBarY.length-1;i++){
        //let i in this.navBarY 中i是str类型
        // console.log(i);
        // 简便做法：
        if(this.navCurrentIndex !== i && (positionY >= this.navBarY[i] && positionY < this.navBarY[i+1])){
          this.navCurrentIndex = i;
          this.$refs.detailNav.currentindex = this.navCurrentIndex;
        }
        // 普通做法：
        // if(this.navCurrentIndex !== i && ((i < this.navBarY.length-1 && positionY >= this.navBarY[i] && positionY < this.navBarY[i+1])
        //   ||(i === this.navBarY.length - 1 && positionY >= this.navBarY[i]))){
        //   this.navCurrentIndex = i;
        //   // console.log(this.navCurrentIndex);
        //   // 将NavBar中的currentindex 赋值为当前滚动区域对应的navCurrentIndex
        //   this.$refs.detailNav.currentindex = this.navCurrentIndex;
        // }
        //在Mixin中 BackTop在滚动到什么位置时进行显示
        this.BackTopPostion(position);
      }
    },
    //3.nav-bar点击事件
    titleitemclick(index){
       this.$refs.scroll.scrollTo(0,-this.navBarY[index],500);
    },
    //4.图片加载完成事件
    imageLoad(){
      // this.$refs.scroll.refresh();
      // newRefresh在Mixin中
      this.newRefresh();
      // 获取NavBar中每个title的具体位置
      this.getNavBarY();
    },
    // 网络请求函数
    getDetail(iid){
      getDetail(iid).then(res =>{
        // console.log(res);
        const data = res.result;
        // 1。获取轮播图信息
        this.topImages= data.itemInfo.topImages;
        // console.log(this.topImages);
        // 2.获取Goods信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
        // 3.获取店铺信息
        this.shop = new Shop(data.shopInfo);
         // 4.商品详细信息
        this.detailInfo = data.detailInfo;
        // console.log(this.detailInfo);
        // 5.获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
        // 6.获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];
        }
        // 第一次获取，值不对，原因：this.$refs.param.$el组件未被渲染
        // this.navBarY = [];
        // this.navBarY.push(0);
        // this.navBarY.push(this.$refs.param.$el.offsetTop)
        // this.navBarY.push(this.$refs.comment.$el.offsetTop)
        // this.navBarY.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.navBarY)
         // 接收到数据，渲染完成后才执行nextTick
        // this.$nextTick(function () {
        //   // 第二次获取，值不对，原因：图片未计算在内
        //   this.navBarY = [];
        //   this.navBarY.push(0);
        //   this.navBarY.push(this.$refs.param.$el.offsetTop)
        //   this.navBarY.push(this.$refs.comment.$el.offsetTop)
        //   this.navBarY.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.navBarY)
        // });
      })
    },
    // 请求推荐数据
    getRecommend(){
      getRecommend().then(res =>{
        // console.log(res);
        this.recommends = res.data.list;
      })
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    //1. 获取当前页面商品的ID
    this.iid = this.$route.params.iid;
    // console.log(this.iid);
    // 2.根据商品ID请求数据
    this.getDetail(this.iid);
    // 3.获取推荐数据
    this.getRecommend();
    // 4.获取NavBar各title位置
    this.getNavBarY = debounce(() => {
      this.navBarY = [];
      this.navBarY.push(0);
      this.navBarY.push(this.$refs.param.$el.offsetTop)
      this.navBarY.push(this.$refs.comment.$el.offsetTop)
      this.navBarY.push(this.$refs.recommend.$el.offsetTop)
      this.navBarY.push(Number.MAX_VALUE)
      // console.log(this.navBarY)
    },50)

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // console.log('mounted')
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {
    // this.navBarY = [];
    // this.navBarY.push(0);
    // this.navBarY.push(this.$refs.param.$el.offsetTop)
    // this.navBarY.push(this.$refs.comment.$el.offsetTop)
    // this.navBarY.push(this.$refs.recommend.$el.offsetTop)
  }, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {
     // 1.取消图片加载事件监听
    this.$bus.$off('itemimageload',this.itemImgListener)
  }, // 生命周期 - 销毁完成
  activated () {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  deactivated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
/* @import url(); 引入公共css类 */
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
/* .content{
  height: calc(100%-44px);
} */
.content{
  /* height: 500px; */
  overflow: hidden;
  /* scroll固定高度方法一： */
  /* margin-top: 44px;
  height: calc(100%-93px); */
  /*  scroll固定高度方法二： */
  position: absolute;
  top: 44px;
  bottom: 52px;
  left: 0;
  right: 0;
}
</style>
