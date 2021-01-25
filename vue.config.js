// 会与公共的配置文件进行合并
module.exports={
  configureWebpack:{
    resolve:{
      alias:{
        // '@':'src',
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  }
}