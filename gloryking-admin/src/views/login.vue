<template>
<el-container class="login">
  <el-card class="card">
  <div slot="header" style="text-align:center;">
    <span>管理员登陆</span>
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
     register(){
       this.$router.push('/register')
     },
     async login(){
          let res = await this.$http.post('/login',this.user)
          localStorage.tokenZhouYC404 = res.data.token//存储token
          this.$router.push('/categories/list')
          this.$message({
              type:'success',
              message:'登陆成功',
              duration:600
          })
     }
 },
 created() {
     if (localStorage.token) {
         this.$router.push('/categories/list')
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