<template>
  <div id='cart-list-item'>
    <div class="item-selector">
      <!-- itemInfo.checked在该数据对象中新增的属性 默认为false -->
      <CheckButton :isChecked="itemInfo.checked" @click.native="checkClick"></CheckButton>
    </div>
    <div class="item-img" @click="click">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info" @click="click">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import CheckButton from '@/components/content/checkButton/CheckButton'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    CheckButton,
  },
  props:{
    itemInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data () {
  // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    checkClick(){
      this.itemInfo.checked = !this.itemInfo.checked;
    },
    click(){
      this.$router.push('./detail/' + this.itemInfo.iid);
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
  activated () {
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
 /* @import url(); 引入公共css类 */
#cart-list-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-title, .item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.info-bottom .item-price {
  color: orangered;
}
</style>
