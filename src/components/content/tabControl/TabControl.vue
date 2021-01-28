<template>
  <div class='tab-control'>
    <div class="tab-control-item" 
         v-for="(item,index) in titles"
         :class='{active:index === currentindex}'
         @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
  // 这里存放数据
    return {
      currentindex:0,
    }
  },
  methods: {
    itemclick(index){
      this.currentindex = index;
      this.$emit('tabclick', index);
    }
  },
}
</script>
<style scoped>
/*  @import url(); 引入公共css类 */
 .tab-control{
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    text-align: center;
    background-color: #fff;
 }
 .tab-control-item{
    flex: 1;
 }
 .tab-control-item span{
   padding: 3px;
 }
 /* 点击其中某个item时的css */
 .active{
    color:var(--color-high-text);
 }
 .active span{
    border-bottom: 3px solid var(--color-high-text);
 }
</style>
