<template>
  <div id="car">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{carLength}})</div>
    </nav-bar>
    <!-- 购物车商品列表 -->
    <cart-list></cart-list>
    <!-- 底部工具栏 -->
    <cart-bottom-bar class="bottom-bar"></cart-bottom-bar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import NavBar from '@/components/common/navbar/NavBar.vue'
import CartList from './childComponents/CartList.vue'
import CartBottomBar from './childComponents/CartBottomBar.vue'
  export default {
  name: "Cart",
  components: { 
    NavBar,
    CartList, 
    CartBottomBar,
    },
  computed:{
    // 使用较多时可直接封装Vuex中的Getter
    // carLength(){
    //   return this.$store.getters.length;
    // }
    ...mapGetters([
      'carLength',
    ])
  }
  }
</script>

<style scoped>
#car{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
.bottom-bar{
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
