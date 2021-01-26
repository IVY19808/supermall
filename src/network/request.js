import axios from 'axios'

export function request(config){
  // 1.创建axios实例
  const instance = axios.create({
    baseURL:"http://152.136.185.210:7878/api/m5",
  })
  // 2.1请求拦截 
  instance.interceptors.request.use(config =>{
    return config;
  },err =>{
    console.log(err);
  })
  // 2.2响应拦截
  instance.interceptors.response.use(res =>{
    return res.data;
  },err =>{
    console.log(err);
  })
  // 3.发送网络请求  返回的是Promise对象
  return instance(config);
}