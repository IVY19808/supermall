import {
  ADD_COUNTER,
  ADD_TO_CAR
} from "./mutations-types"
export default {
  addcar(context,payload){
    // payload是添加的商品
   return new Promise((resolve,reject) =>{
      // 1.查找之前数组中是否有该商品
    let oldProduct = context.state.carList.find(item => item.iid === payload.iid)
    // 2.判断oldProduct
    if(oldProduct){
      // 商品已存在
      // oldProduct.count += 1;
      context.commit(ADD_COUNTER,oldProduct);
      resolve('商品数量+1');
    }else{
      // 商品不存在
      payload.count = 1;
      // context.state.carList.push(payload);
      context.commit(ADD_TO_CAR,payload);
      resolve('商品加入购物车');
    }
   })
  }
}