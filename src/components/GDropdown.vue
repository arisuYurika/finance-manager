<template>
    <el-dropdown @command="$emit('command',$event)">
        <span class="el-dropdown-link">
            {{title}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,i) in items" :command="item.key">{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>

</template>
<script>
export default {
    name:'GDropdown',
    // methods:{
    //     xx(e){
    //         this.$emit('command',e);
    //     }
    // },
    props: {
        title: {
            required: true,
            type: String
        },
        items: {
            type: Array,
            required: true,
        }
    }
}
</script>
<style>
</style>