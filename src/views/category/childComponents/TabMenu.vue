<template>
  <div class="tabmenu">
    <scroll ref="scroll" id="tab-menu-content" :probeType="3" :pullUpLoad='true'>
      <div class="menu">
        <div v-for="(item,index) in childcategories"
            class="menu-item"
            :key="index"
            :class="{active:index === currentIndex}"
            @click="menuClick(index)">{{item.title}}
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  data(){
    return{
      currentIndex: 0
    }
  },
  props: {
    childcategories:{
      type: Array,
      default(){
        return[]
      }
    }
  },
  methods: {
    menuClick(index){
      this.currentIndex = index;
      this.$emit('selectItem', index);
      this.$refs.scroll.refresh();
    }
  }
}
</script>

<style scoped>
/* .tabmenu{
  position: relative;
} */
#tab-menu-content{
  height: 600px;
  width: 100px;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow: hidden;
}
.menu-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 17px;
}
.active{
  background-color: #ffff;
  color: #ff8198;
  font-weight: bold;
}
</style>


