// 会与公共的配置文件进行合并
const path = require('path');
module.export={
  configurewebpack:{
    resolve:{
      alias:{
        // '@':'src',
        // 'assets':'@/assets',
        // 'common':'@/common',
        // 'components':'@/components',
        // 'network':'@/network',
        // 'views':'@/views'
        '@': path.resolve(__dirname, 'src'),
        assets: path.resolve(__dirname, 'src/assets'),
        common: path.resolve(__dirname, 'src/common'),
        components: path.resolve(__dirname, 'src/components'),
        network: path.resolve(__dirname, 'src/network'),
        views: path.resolve(__dirname, 'src/views')
      }
    }
  }
}