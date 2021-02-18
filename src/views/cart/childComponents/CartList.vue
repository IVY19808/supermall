<template>
  <div class='cart-list'>
    <scroll ref="scroll" class="content" :probeType="3" :pullUpLoad='true'>
      <cart-list-item v-for="(item,index) in carList" :itemInfo="item" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import {mapGetters} from 'vuex'
import Scroll from '@/components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'
export default {
  // import引入的组件需要注入到对象中才能使用
  name:'CartList',
  components: {
    Scroll,
    CartListItem,
    },
  data () {
  // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters([
      'carList',
    ])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {
    this.$refs.scroll.refresh();
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
/*@import url(); 引入公共css类 */
.cart-list{
  /* position: relative; */
  height: calc(100% - 44px - 49px - 40px);
}
.content{
  overflow: hidden;
  height: 100%;
}
</style>
