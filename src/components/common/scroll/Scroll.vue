<template>
  <div class='wrapper' ref='wrapper'>
     <div class="content">
       <slot></slot>
     </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import BScroll from 'better-scroll'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false,
    }
  },
  data () {
  // 这里存放数据
    return {
      scroll:null
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // 若DOM树中有多个class为wrapper通过documents.querySelector会获取默认获取到第一个
    // 传入的DOM元素通过ref获取到的是唯一的
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad,
      click:true,
    }); 
    // 2.监听滚动位置
    this.scroll.on('scroll',(position) =>{
      //  console.log(position);
      this.$emit('scroll-position', position);
    });
    // 3.监听上拉加载更多
    this.scroll.on('pullingUp',() =>{
      // console.log('上拉加载');
      this.$emit('pullingUp');
    });
  },
  methods: {
    scrollTo(x,y,time=500){
      // 首先判断scroll对象是否已挂载
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    finishPullUp(){
      this.scroll.finishPullUp();
    },
    refresh(){
       // 首先判断scroll对象是否已挂载
      //  console.log('----')
      this.scroll && this.scroll.refresh();
    }
  },
}
</script>
<style scoped>
/*@import url(); 引入公共css类 */

</style>
