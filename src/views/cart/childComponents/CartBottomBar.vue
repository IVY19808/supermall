<template>
  <div class='cart-bottom-bar'>
    <div class="check-content">
      <CheckButton class="check-button" :isChecked="isCheckedAll" @click.native="checkclick"></CheckButton>
      <span>全选</span>
    </div>
    <div class="totalprice">
      合计:{{totalprice}}
    </div>
    <div class="settlement" @click="settlementclick">
      结算({{checkedgoods}})
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import CheckButton from '@/components/content/checkButton/CheckButton'
export default {
  // import引入的组件需要注入到对象中才能使用
  name:'CartBottomBar',
  components: {
    CheckButton,
  },
  data () {
  // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {
    // 全选按钮状态
    isCheckedAll(){
      if (this.$store.state.carList.length === 0) {
        return false
      }else {
        //未选中的商品数量
        // console.log(this.$store.state.carList.filter(item => !item.checked).length)
        return !(this.$store.state.carList.filter(item => !item.checked).length)
        // return !this.$store.state.carList.find(item => !item.checked)
      }

      // 遍历商品
      // for (let item of this.cartList){
      //   if (!item.isChecked){
      //     return false;
      //   }
      // }
      // return true;
    },
    // 选中的商品总价
    totalprice(){
      return '￥' + this.$store.state.carList.filter(item =>
       {return item.checked}).reduce((preValue,item) =>{
         return preValue + item.price * item.count
       },0).toFixed(2)
    },
    // 选中的商品数量
    checkedgoods(){
      return this.$store.state.carList.filter(item => {return item.checked}).length;
    },
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 全选按钮点击事件
    checkclick(){
      if(this.isCheckedAll){
        // 全部选中
        this.$store.state.carList.forEach(item => item.checked = false)
      }else{
        // 有部分或全部不选中
        this.$store.state.carList.forEach(item => item.checked = true)
      }
      //  不能简化成下面代码，因为在改变item.checked时isCheckedAll也会改变
      // this.$store.state.carList.forEach(item => item.checked = !this.isCheckedAll)
    },
    // 结算按钮点击显示提示信息
    settlementclick(){
      if(!this.isCheckedAll){
        this.$toast.show('请选择购买的商品',1500);
      }
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
/* @import url(); 引入公共css类 */
.cart-bottom-bar{
  position: relative;
  display: flex;
  background-color: #eee;
  height: 40px;
  line-height: 40px;
}
.check-content{
  margin-left: 10px;
  display: flex;
  align-items: center;
  width: 60px;
}
.check-button{
  width: 18px;
  height: 18px;
  line-height: 18px;
  margin-right: 6px;
}
.totalprice{
  margin-left: 50px;
  flex: 1;
}
.settlement{
  width: 90px;
  background-color: #f00;
  color: #fff;
  text-align: center;
}
</style>
