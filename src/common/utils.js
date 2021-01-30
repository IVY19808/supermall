 // 防抖动函数，防止多频率刷新
export function debounce(func,delay){
  let timer = null;
  return function(...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args);
    },delay);
    }
}