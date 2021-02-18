// 混入
import {debounce} from '@/common/utils'
import BackTop from '@/components/content/backTop/BackTop';
export const itemImgListenerMixin = {
  data(){
    return {
      itemImgListener:null,
      newRefresh:null,
    }
  },
  mounted(){
    // 防抖函数debounce从外部导入的
      // 此方法必须在mounted中执行，不然有可能获取不到this.$refs.scroll
      this.newRefresh = debounce(this.$refs.scroll.refresh,200);
      this.itemImgListener = () =>{
        this.newRefresh();
      }
      // 图片加载完成后scroll进行刷新，因为刷新后scrollerHeight的高度才可以重新计算
      this.$bus.$on('itemimageload',this.itemImgListener);
      // console.log('我是混入的');
  }
}
export const backTopMixin={
  components:{
    BackTop,
  },
  data(){
    return {
      isShowBackTop:false,
    }
  },
  methods: {
     //回到首页上方点击事件
    backclick(){
      // 获取scroll组件，使用该组件内部的的scrollTo方法
      this.$refs.scroll.scrollTo(0,0,500);
    },
     //BackTop在滚动到什么位置时进行显示 当前屏幕位置大于1000时才显示backtop
    BackTopPostion(position){
      this.isShowBackTop = Math.abs(position.y) > 1000 ? true : false;
    },
  },
}