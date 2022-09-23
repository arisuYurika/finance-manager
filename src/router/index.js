import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { whiteUrlList } from '@/conf'
import { checkLogin } from '@/utils'
import store from '@/store'
import Axios from 'axios'
import Layout from '@/layouts/Layout.vue'
import { pretty } from '@/services/axios'

Vue.use(VueRouter)

const constantRoutes = [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/404',
        name: 'NotFound',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/404.vue')
    }, {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Login.vue')
    }, {
        path: '/401',
        name: 'Reject',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/401.vue')
    }
    // 前面的 * 会优先匹配 异步路由会被挡住无法匹配到
]

const router = new VueRouter({
    routes: constantRoutes
})

function asyncRoutesHandler(routes) {
    return routes.map(value => {
        if (value.component === 'Layout') {
            value.component = Layout;
        } else {
            const filePath = value.component;
            value.component = () =>
                import (`../views/${filePath}.vue`)
        }
        if (!!value.children) {
            value.children = asyncRoutesHandler(value.children);
        }
        return value;
    })
}

async function loadMenus(next, to) {
    // 不要用实例直接去请求菜单数据（？），因为实例请求会走代理
    let [res, err] = await pretty(Axios.get('http://localhost:8080/menus.json', {
        responseType: 'json'
    }));
    if (err) {
        throw new Error('动态菜单加载出错' + err.message)
    }
    // 加入 vuex 中 之后渲染动态菜单栏
    store.commit('user/changeUserMenus', res.data);
    // 处理过 component 的路由数组
    let asyncRoutes = asyncRoutesHandler(res.data);
    // 将全局404放在最后
    asyncRoutes.push({
            path: '*',
            redirect: { name: 'NotFound' }
        })
        // 循环router.addRoute()
    asyncRoutes.forEach(element => {
        router.addRoute(element)
    });
    // 使用了addRoute后，需重新指定前往的路由
    // 将to展成新对象，replace替换当前访问的路径
    next({...to, replace: true });
}

router.beforeEach((to, from, next) => {
    // 1.login/register=>白名单放行
    if (whiteUrlList.includes(to.path)) {
        return next();
    }
    // 2. 2.1是否登录
    const userInfo = checkLogin();
    if (userInfo) {
        // 判断刷新后 vuex内的数据是否存在
        if (!store.getters['user/getIsLogin']) {
            store.commit('user/changeIsLogin', true)
            store.commit('user/changeUserInfo', {
                username: userInfo.account
            })
        }
        // 判断刷新后 Vuex内的userMenus动态路由是否存在
        if (!store.getters['user/userMenus']) {
            // 需要重新加载菜单 并且跳转
            loadMenus(next, to)
        }
        return next();
    } else {
        alert('请登录！')
        return next('/login?redirect=' + to.path)
    }
    //  2.2token中解码获取
    //  2.3登陆了，是否有角色菜单（动态路由）
    // 3.如果没有登录 => 去login登录
})

export default router