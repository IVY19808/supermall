import {
  ADD_COUNTER,
  ADD_TO_CAR
} from "./mutations-types"
export default {
  // mutations唯一的目的就是修改state中状态
  // mutations中的每个方法尽可能完成的事件比较单一
  [ADD_COUNTER](state,payload){
    payload.count++;
  },
  [ADD_TO_CAR](state,payload){
    payload.checked = false;
    state.carList.push(payload);
  },
  // addcar(state,payload){
  //   // payload是添加的商品
  //   // 1.查找之前数组中是否有该商品
  //   let oldProduct = state.carList.find(item => item.iid === payload.iid)
  //   // 2.判断oldProduct
  //   if(oldProduct){
  //     // 商品已存在
  //     oldProduct.count += 1;
  //   }else{
  //     // 商品不存在
  //     payload.count = 1;
  //     state.carList.push(payload);
  //   }
  // },
}