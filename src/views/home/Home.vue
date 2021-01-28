<template>
  <!-- <h2>首页</h2> -->
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners='banners'></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view/>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabclick='tabclick'></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li>
      <li>列表51</li>
      <li>列表52</li>
      <li>列表53</li>
      <li>列表54</li>
      <li>列表55</li>
      <li>列表56</li>
      <li>列表57</li>
      <li>列表58</li>
      <li>列表59</li>
      <li>列表60</li>
      <li>列表61</li>
      <li>列表62</li>
      <li>列表63</li>
      <li>列表64</li>
      <li>列表65</li>
      <li>列表66</li>
      <li>列表67</li>
      <li>列表68</li>
      <li>列表69</li>
      <li>列表70</li>
      <li>列表71</li>
      <li>列表72</li>
      <li>列表73</li>
      <li>列表74</li>
      <li>列表75</li>
      <li>列表76</li>
      <li>列表77</li>
      <li>列表78</li>
      <li>列表79</li>
      <li>列表80</li>
      <li>列表81</li>
      <li>列表82</li>
      <li>列表83</li>
      <li>列表84</li>
      <li>列表85</li>
      <li>列表86</li>
      <li>列表87</li>
      <li>列表88</li>
      <li>列表89</li>
      <li>列表90</li>
      <li>列表91</li>
      <li>列表92</li>
      <li>列表93</li>
      <li>列表94</li>
      <li>列表95</li>
      <li>列表96</li>
      <li>列表97</li>
      <li>列表98</li>
      <li>列表99</li>
      <li>列表100</li>
    </ul>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'

import HomeSwiper from './childComponents/HomeSwiper'
import RecommendView from './childComponents/RecommendView'
import FeatureView from './childComponents/FeatureView'

import {getHomeMultidata,getHomeGoods} from '@/network/home'


  export default {
    name: "Home",
    components:{
      NavBar,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
    },
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
      methods: {
        // 事件监听方法
        tabclick(index){
          console.log(index);
          switch(index){
            case 0:
              this.currentType = 'pop';
            case 1:
              this.currentType = 'new';
            case 2:
              this.currentType = 'sell'
          }
        },
        //网络请求相关方法
        getHomeMultidata(){
          getHomeMultidata().then(res =>{
            console.log(res);
            // 存储请求到的数据
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
            })
        },

        getHomeGoods(type){
          const page = this.goods[type].page+1;
          getHomeGoods(type,page).then(res =>{
            console.log(res);
            // this.goods[type].page = res.data.page;
            this.goods[type].page += 1;
            // 不能直接赋值，不然会覆盖之前的数据，需要向数组中往里加
            this.goods[type].list.push(...res.data.list);
          })
        }
      },
  }
</script>

<style scoped>
/* 解决轮播图与nav之间重叠 */
#home{
  padding-top: 44px;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
/* 使nav固定不动 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
/* 用于让tab-control下面内容滚动时此部分处于固定 */
.tab-control{
  /* 没有达到该组建之前position属性为sticky，当移动到该组件时position为fixed */
  /* 该属性很多浏览器并不支持 */
  position:sticky;
  top: 44px;
  z-index: 9;

}
</style>
