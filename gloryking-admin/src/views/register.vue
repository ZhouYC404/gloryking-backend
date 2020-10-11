<template>
<el-container class="login">
  <el-card class="card">
  <div slot="header" style="text-align:center;">
    <span>管理员注册</span>
  </div>
   <el-form @submit.native.prevent>
       <el-form-item label="账号">
           <el-input v-model="user.username"></el-input>
       </el-form-item>
       <el-form-item label="密码">
           <el-input v-model="user.password"></el-input>
       </el-form-item>
       <el-form-item>
           <el-row>
               <el-col :offset="3" :span="4">
           <el-button type="primary" @click="register">注册</el-button>
           </el-col>
            <el-col :offset="5" :span="4">
           <el-button type="primary" @click="login">登陆</el-button>
           </el-col>
           </el-row>
       </el-form-item>
   </el-form>
</el-card>
</el-container>
</template>

<script>
export default {
 data() {
     return {
         user:{}
     }
 },
 methods:{
     login(){
       this.$router.push('/login')
     },
     async register(){
          let res = await this.$http.post('/register',this.user)
          this.$message({
              type:'success',
              message:'注册成功',
              duration:600
          })
           this.$router.push('/login')
     }
 },
 created() {
     this.$message({
              type:'warning',
              message:'ZhouYC404提示你：注册完一个管理员账号后最好关闭注册页面和相关接口',
              duration:8000
          })
     if (localStorage.token) {
         this.$router.push('/login')
     }
 },
}
</script>
<style>
.login{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>