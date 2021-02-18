<template>
  <div class='goods-list-item' @click='goodsItemClick'>
      <!-- <a :href="goodsItem.link"> -->
        <img :src="showImage" @load="imageload" :key='showImage'>
        <div class="goodsinfo">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.itemMarks}}</span>
        </div>
      <!-- </a> -->
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {};
      }
    }
  },
  data () {
  // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {
    showImage(){
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 图片加载完成后执行函数
    imageload(){
      // 方法一 此时所有组件都会接收到该事件，但是若没有在当前组件时可以取消该事件的监听
      this.$bus.$emit('itemimageload');
      // console.log('图片加载完成');
      // 方法二
      // if(this.$route.path.indexOf('/home')){
      //   // 将图片加载完成函数发射到事件总线上
      //   this.$bus.$emit('itemimageload'); 
      // }else if(this.$route.path.indexOf('/detail')){
      //   this.$bus.$emit('detailimageload')
      // }
    },
    goodsItemClick(){
      // console.log('详情页')；
      // 点击商品路由跳转到详情页
      this.$router.push('/detail/'+this.goodsItem.iid);
      // this.$router.push({
      //   path:'/detail',
      //   query:{}
      // })
    }
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
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
/* // @import url(); 引入公共css类 */
  .goods-list-item{
    padding-bottom: 40px;
    position: relative;
    width:48%;
  }
  .goods-list-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goodsinfo{
    font-size: 12px;
    position:absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goodsinfo p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    margin-bottom: 3px;
  }
  .goodsinfo .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goodsinfo .collect{
    position: relative;
  }
  .goodsinfo .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background:url('../../../assets/img/common/collect.svg') 0 0/14px 14px;
  }
</style>
