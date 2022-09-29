<script>
export default {
    name: 'GFormCreator',
    props: {
        conf: {
            type: Object,
            required: true
        }
    },
    methods: {
        submit() {
            return '假数据'
        },
        reset() {
            console.log('执行假的重置')
        },
        renderItem(){
            return <el-input></el-input>
        },
        renderColums(rowArr) {
            return rowArr.map(item=>{
                return <el-col 
                        xl={item.colspan} lg={item.colspan}
                        md={12} sm={24} xs={24}>
                            <el-form-item label={ item.label }>
                                { this.renderItem(item) }
                            </el-form-item>
                        </el-col>
            })
        },
        renderRows(rows) {
            return rows.map(rowArr=>{
                return <el-row> {  this.renderColums(rowArr)  }  </el-row>
            })
        }
    },
    render(h) {
        // 疯狂解构
        const { title, items } = this.conf;
        const data = "是misaka哦!"

        // jsx
        return (
            <div class="form-box">
                <h1>{title}</h1>
                {title && <hr />}

                {/* 表单区域  */}
                <el-form label-width="80px">
                    {this.renderRows(items)}
                </el-form>

                {/*btns按钮*/}
                <div class="btns clear-fix">
                    {/*this.$slots.default*/}
                    { this.$slots.default?this.$slots.default:(
                        <div>
                            <el-button type="primary" onClick={e => this.Submit()}>提交</el-button>
                            <el-button onClick={e => this.reset()}>重置</el-button>
                        </div>
                    )
                    }

                </div>
            </div>


        )
    }
}
</script>

<style scoped>
.btns {
    text-align: center;
}
</style>