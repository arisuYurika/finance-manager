<template>
  <div class="login-box">
    <div class="login-input-box center">
      <h1>信贷管理系统</h1>
      <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item prop="pass">
          <el-input
            prefix-icon="el-icon-s-order"
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex"
import { doLogin } from "@/apis/user";

export default {
  data() {
    var validatePass = function(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码不能小于6位数"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "admin",
        pass: "approve123456."
      },
      rules: {
        pass: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        username: [{ required: true, trigger: "blur", message: "请输入用户名" }]
      }
    };
  },
  methods: {
    ...mapMutations({
      changeLogin: "user/changeIsLogin",
      changeUserInfo: "user/changeUserInfo"
    }),
    // 登录方法
    async doLogin(form) {
      const [res,err] = await doLogin(form);
      if (err) {
        this.$message.error('请求异常:'+ err.message);
      }
      if (res.data.code === 20000) {
        if (res?.data?.data?.token) {
          // 改变用户信息
          this.changeUserInfo({
            username: form.username
          });
        }
        // 改变登录状态
        this.changeLogin(true);
        this.$router.push(this.$route.query.redirect || "/");
      } else {
         this.$message.error('登录失败!!!');
      }
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 登录流程
          this.doLogin(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.login-input-box {
  width: 650px;
  height: 320px;
  background: #fff;
  text-align: center;
  padding: 40px 40px 12px 12px;
}
.login-box {
  height: 100%;
  background: url(../assets/bg2.jpg);
  background-size: cover;
}
.el-button {
  width: 600px;
}
.el-input {
  width: 600px;
  margin-bottom: 16px;
}
::v-deep .el-input__inner {
  background: #e5e5e5;
}
</style>