<template>
    <el-container>
        <el-aside width="240px">
            <el-menu router default-active="2" class="el-menu-vertical-demo" background-color="#545c64"
                text-color="#fff" active-text-color="#ffd04b">
                <GAsideMenu v-for="(item, i) in menus" :key="i" :item="item" />
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <div class="left">
                    <GBreadcrumb />
                </div>
                <div class="right">
                    <GDropdown @command="doCommand" :title="'admin'" :items="[{ key: 'logout', label: '退出' }]" />
                </div>

            </el-header>
            <el-main>
                <router-view />
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>

</template> 

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
    methods: {
        ...mapActions({
            doLogout:'user/doLogout'
        }),
        async doCommand(e) {
            if (e === 'logout') {
               let [res,err] = await this.doLogout();
               // 外部没有依赖里面的值
               // 依赖的是执行顺序
               window.location.reload();
            }
        }
    },
    computed: {
        ...mapGetters({
            menus: 'user/getUserMenus'
        })
    },
    name: 'Layout'
}
</script>

<style scoped>
.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

.el-container {
    height: 100%;
}
.el-menu-vertical-demo {
    border:none;
}
</style>