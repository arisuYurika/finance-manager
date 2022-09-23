const path = require('path');

module.exports = {
    configureWebpack: config => {
        Object.assign(config, {
            resolve: {
                extensions: ['.js', '.vue', '.json'],
                alias: {
                    'vue$': 'vue/dist/vue.esm.js',
                    '@': path.resolve('src'),
                    'styles': path.resolve('src/assets/styles')
                }
            }
        })
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://1.116.64.64:5004/', // 开发
                changeOrigin: true,
            },
        },
    }
}