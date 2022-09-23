export default {
    state: {
        // 是否登陆
        isLogin: false,
        // 用户信息 顶部导航栏使用
        userInfo: null,
        // 用户菜单
        userMenus: null
    },
    getters: {
        // 获取登陆状态
        getIsLogin(state) {
            return state.isLogin;
        },
        // 获取登陆信息
        getUserInfo(state) {
            return state.userInfo;
        },
        // 获取用户菜单信息
        getUserMenus(state) {
            return state.userMenus;
        }
    },
    mutations: { // commit触发
        changeIsLogin(state, payload) {
            state.isLogin = payload;
        },
        changeUserInfo(state, payload) {
            state.userInfo = payload;
        },
        changeUserMenus(state, payload) {
            state.userMenus = payload;
        },
    },
    actions: { // patch触发

    }
    // 异步的行为放在action里
}