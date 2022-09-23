<template>
  <div>
    <!-- 无子菜单 -->
    <el-menu-item v-if="!item.children" :index="item.path">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.meta.title}}</span>
    </el-menu-item>
    <!-- 有子菜单 -->
    <el-submenu v-else :index="item.path">
        <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.meta.title}}</span>
        </template>
        <GAsideMenu v-for="(it,i) in item.children" :key="i" :item="it"/>
    </el-submenu>
  </div>
</template>

<script>
export default {
    name:'GAsideMenu',
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