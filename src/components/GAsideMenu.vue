<template>
    <el-menu-item v-if="!item.children" :index="item.path">
        <!-- <i class="el-icon-document"></i> 可以通过配置传递icon -->
        <span slot="title">{{item.meta.title}}</span>
    </el-menu-item>
    <el-submenu v-else :index="item.path">
        <template #title>{{item.meta.title}}</template>
            <GAsideMenu v-for="(it,i) in item.children" :key="i" :item="it"/>
    </el-submenu>
</template>
<script>
export default {
    name:'GAsideMenu', // 递归组件的核心
    props:{
        item:{
            type:Object,
            required:true
        }
    }
}
</script>
<style scoped>

</style>