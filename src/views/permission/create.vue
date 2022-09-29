<template>
    <GFormCreator ref="createForm" :conf="createConf">
        <!-- 自定义的按钮 -->
        <!-- <template #default="data">
            <div class="left">
                <el-button @click="doCreate" type="primary">创建管理员</el-button>
                <el-button @click="doReset">{{data}}</el-button>
            </div>
        </template> -->
    </GFormCreator>

</template>

<script>
import createConf from './createFormConf'
export default {
    methods: {
        doCreate() {
            // 调用submit
            this.$refs.createForm.submit(data => {
                if (data) {
                    console.log('验证成功', data);
                } else {
                    console.log('验证失败')
                }
            })
        },
        doReset() {
            this.$refs.createForm.reset();
        }
    },
    data() {
        return {
            createConf
        }
    }
}
</script>

<style>
</style>