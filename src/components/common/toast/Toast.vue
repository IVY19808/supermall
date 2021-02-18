<template>
  <div class='toast'  v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  name:'Toast',
  components: {},
  props:{
    // message:{
    //   type:String,
    //   default:''
    // },
    // isShow:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data () {
  // 这里存放数据
    return {
      message:'',
      isShow:false,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    show(message='默认文字',duration = 1500){
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.message = '';
        this.isShow = false;
      }, duration);
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
/*@import url(); 引入公共css类 */
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0,0,0,.3);
  z-index: 999;
}
</style>
