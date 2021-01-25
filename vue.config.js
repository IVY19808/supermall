// 会与公共的配置文件进行合并
module.export={
  configwebpack:{
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