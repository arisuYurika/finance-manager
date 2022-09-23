import Vue from 'vue'
import Vuex from 'vuex'
// import user from './modules/user' 非动态引用

Vue.use(Vuex)

//动态引入modules下方的模块文件，作为module模块声明
//require.context() 引用上下文
const modulesFn = require.context('./modules', true, /\.js$/);
const modules = {}
const regex = /.*\/(.*)\.js$/
    // keys(): modules下所有的路径(如./user.js等)
modulesFn.keys().forEach(filePath => {
    // 通过正则将 ./user.js 变为 数组
    let moduleName = regex.exec(filePath);
    // 拿到数组里的 user
    if (moduleName !== null) { moduleName = moduleName[1] }
    // 通过 modulesFn(filePath) 拿到模块对象
    const moduleObj = modulesFn(filePath);
    modules[moduleName] = {
        namespaced: true,
        // 对应export default {}
        ...moduleObj.default
    }
});


export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules
})