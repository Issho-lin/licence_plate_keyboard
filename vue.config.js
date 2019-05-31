const px2rem = require('postcss-px2rem')
const postcss = px2rem({
    remUnit: 100   //基准大小 baseSize，需要和rem.js中相同
  })
module.exports = {
    publicPath: './', //基本路径，解决打包空白问题
    devServer: {
        proxy: {
            '/clife': {
                target: 'http://10.8.20.22:8181',
                changeOrigin: true
            }
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    postcss
                ]
            }
        }
    }
}