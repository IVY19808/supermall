<template>
  <div class='detailnavbar'>
    <nav-bar>
      <div slot="left" class="back" @click="backclick">
        <img src="@/assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div class="title-item" 
        v-for='(item,index) in titles'
        @click="titleitemclick(index)"
        :class="{active:index === currentindex}">
        {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name:'DetailNavBar',
  // import引入的组件需要注入到对象中才能使用
  components: {
    NavBar,
    },
  data () {
  // 这里存放数据
    return {
      titles:['商品','参数','评论','推荐'],
      currentindex:0,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    titleitemclick(index){
      this.currentindex = index;
      this.$emit('titleitemclick', index);
    },
    backclick(){
      this.$router.go(-1);
      // this.$router.back();
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
.back img{
  margin-top: 12px;
}
.title{
  display: flex;
}
.title-item{
  flex:1
}
.active{
  color:var(--color-high-text);
}
</style>
