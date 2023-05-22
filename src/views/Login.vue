<template>
  <div style="width: 100%;height: 100vh;background-color: #786e6e;overflow: hidden">
    <div style="width: 400px;margin: 150px auto">
      <div style="color: #cccccc;font-size: 30px;text-align: center;padding: 30px">
        欢迎登录
      </div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-search" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import {createRouter as $router} from "vue-router";

export default {
  name: "Login",
  data(){
    return{
      form:{},
      rules:{
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },

        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  methods:{
    login(){
      this.$refs['form'].validate((valid) =>{
        if(valid){
          request.post("/user/login",this.form).then(res => {
            if(res.code === '0'){
              this.$message({
                type: "success",
                message: "登录成功"
              })
              sessionStorage.setItem("user",JSON.stringify(res.data)),
              this.$router.push("/user")
            }else {
              this.$message({
                type: "error",
                message: res.msg
              })
            }
          })
        }
      })

    }
  }
}
</script>

<style scoped>

</style>