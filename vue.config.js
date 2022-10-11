const path = require('path');

module.exports = {
    devServer: {
        port: 8080,
        hot: true,
        open: false,
        proxy: 'http://localhost:5002'
    },
    chainWebpack: config => {
        config.resolve.alias.set('@core', path.join(__dirname, 'src', 'core'));
        config.resolve.alias.set('@api', path.join(__dirname, 'src', 'core', 'api'));
        config.resolve.alias.set('@store', path.join(__dirname, 'src', 'core', 'store'));
    },
    productionSourceMap: false
}
