<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name:'RecommendView',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props:{
    recommends:{
      type:Array,
      default(){
        return [];
      }
    }
  },
}
</script>
<style scope>
 /* @import url(); 引入公共css类 */
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 5px;
  }
</style>
