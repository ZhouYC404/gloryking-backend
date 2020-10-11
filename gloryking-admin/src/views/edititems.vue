<template>
  <el-form @submit.native.prevent label-width="auto">
      <el-form-item label="物品名称" >
          <el-input v-model="items.name"></el-input>
      </el-form-item>
       <el-form-item label="物品图标">
      <el-upload
  class="avatar-uploader"
  :headers="uploadheader()"
  :action="$http.defaults.baseURL + '/upload'"
  :show-file-list="false"
  :on-success="afterupload"
  >
  <!--↑action默认post方式  -->
  <img v-if="items.icon" :src="items.icon" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
   <el-form-item>
        <el-button type="primary" size="default"  native-type="submit" @click="edit">确认修改</el-button>
        <el-button type="info" size="default"  @click="cancel">取消</el-button>
         </el-form-item>
  </el-form>
</template>

<script>
export default {
data() {
  return {
    items:{}
  }
},
methods: {
    async getitems(){//根据route中的id请求对应的数据
        let id = this.$route.params.id
        let res = await this.$http.get(`/rest/items/edit/${id}`)
       // console.log(res);
        this.items = res.data
    },
    async edit(){//发送修改数据的put请求
        await this.$http.put(`/rest/items/edit/${this.items._id}`,this.items)
        this.$router.push('/items/list')
        this.$message({
      type:'success',
      message:'修改成功~',
      duration:600
    })
    },
    afterupload(res){
      this.$set(this.items,'icon',res)
  },
    cancel(){
      this.$router.push('/items/list')  
    }
},
async created() {
    await this.getitems()
},
}
</script>

<style>

</style>