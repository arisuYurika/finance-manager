<template>
    <div>
        <div class="container">
            <el-form ref="LoginForm" :rules="LoginRules" :model="LoginFormData" label-width="80xp">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="LoginFormData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input status-icon type="password" v-model="LoginFormData.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click = "submitForm">登陆</el-button>
                    <el-button type="primary"  @click = "resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import { doLogin } from "@/services/api/user";
  //验证规则
  let validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else if(value.length<6){
      callback(new Error('密码不能小于6位数'));
    }else{
      callback();
    }
  };
  export default {
    data() {
      return {
        LoginFormData: {
          username: 'admin',
          password: 'approve123456.'
        },
        //验证器
        LoginRules: {
          username: [
            { required:true, trigger: 'blur' ,message:'请输入用户名'}
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };

    },
    methods: {
      ...mapMutations({
        changeLogin:'user/changeIsLogin',
        changeUserInfo:'user/changeUserInfo'
      }),
      //异步登陆方法
      async doLogin({username,password}){
        console.log(`${username} 和 ${password}`);
        let [res,err] = await doLogin({username,password})
        if (err) {
          this.$message.error('请求异常:'+ err.message);
        }
        console.log("res",res);
        if(res.data.code === 20000){
          console.log(res);
          // 保存用户状态
          this.changeLogin(true);
          // 保存用户信息
          this.changeUserInfo({
            username:username
          });
          // 跳转到输入的地址或者主页
          this.$router.push(this.$route.query.redirect||"/");
        }else{
          console.log('登录失败的:'+res);
          alert("登录失败");
        }
      },
      //表单提交方法
      submitForm() {
        //通过this.$refs拿到表单的DOM
        this.$refs['LoginForm'].validate((valid) => {
          if (valid) {
            this.doLogin(this.LoginFormData)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs['LoginForm'].resetFields();
      }
    }
  }
</script>
<style lang="sass" scoped>

</style>