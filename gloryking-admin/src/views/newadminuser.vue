<template>
  <el-form @submit.native.prevent label-width="auto">
      <el-row>
        <el-col :span="8">
<el-form-item label="管理员账号" >
          <el-input v-model="adminuser.username"></el-input>
      </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
<el-form-item label="管理员密码" >
          <el-input v-model="adminuser.password"></el-input>
      </el-form-item>
        </el-col>
      </el-row>
       <el-form-item>
        <el-button type="primary" size="default"  native-type="submit" @click="save">新建</el-button>
        <el-button type="info" size="default"   @click="cancel">取消</el-button>
         </el-form-item>
  </el-form>
</template>

<script>
export default {
data() {
  return {
    adminuser:{}
  }
},
methods: {
  async save(){//存储分类
    let res = await this.$http.post('/rest/adminusers/new',this.adminuser)
    console.log(res);
    this.$router.push('/adminusers/list')
    this.$message({
      type:'success',
      message:'新建成功~',
      duration:600
    })
  },
  cancel(){
    this.$router.push('/adminusers/list')
  }
},
async created() {

},
}
</script>

<style>

</style>