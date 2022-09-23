<template>
  <div>
    <el-breadcrumb separator="/">   
        <el-breadcrumb-item v-for="(route,i) in breadcrumbList" :key="i">
            <span v-if="breadcrumbList.length - 1 === i">{{route.meta.title}}</span>
            <router-link v-else :to="route">{{route.meta.title}}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    name:'GBreadcrumb',
    computed:{
        breadcrumbList(){
            return this.$route.matched.filter(route=>route.meta.title)
        }
    }
    // data(){
    //     return {
    //         breadcrumbList:[]
    //     }
    // },
    // watch:{ //监视路由
    //     $route:{
    //         deep:true,
    //         handle(){
    //             this.breadcrumbList = 
    //         }
    //     }
    // }
}
</script>

<style scoped>

</style>