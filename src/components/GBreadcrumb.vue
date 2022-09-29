<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(route, i) in breadcrumbList" :key="i">
            <span v-if="breadcrumbList.length - 1 === i">{{ route.meta.title }}</span>
            <router-link v-else :to="route">{{ route.meta.title }}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    name: 'GBreadcrumb',
    // v3
    computed:{
        breadcrumbList(){
            return this.$route.matched.filter(route => route.meta.title);
        }
    },
    // data() {
    //     return {
    //         breadcrumbList: []
    //     }
    // },
    // created(){
    //    this.breadcrumbList = this.$route.matched.filter(route => route?.meta?.title);
    // },  
    // watch: { // 监视里有
    //     $route: {
    //         deep: true,
    //         handler() {
    //             console.log(this.$route.matched, 'this.$route.matched')
    //             this.breadcrumbList = this.$route.matched.filter(route => route?.meta?.title);
    //         },
    //         immediate:true,  // v2 去掉created
    //     }
    // },

}
</script>
<style scoped>
</style>