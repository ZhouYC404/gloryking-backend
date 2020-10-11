<template>
  <el-form @submit.native.prevent label-width="auto" >
     <el-row>
        <el-col :span="8">
      <el-form-item label="物品名称" >
          <el-input v-model="items.name"></el-input>
      </el-form-item>
        </el-col>
      </el-row>
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
        <el-button type="primary" size="default"  native-type="submit" @click="save">新建</el-button>
        <el-button type="info" size="default"   @click="cancel">取消</el-button>
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
  async save(){//存储物品
    let res = await this.$http.post('/rest/items/new',this.items)
    console.log(res);
    this.$router.push('/items/list')
    this.$message({
      type:'success',
      message:'新建成功~',
      duration:600
    })
  },
  cancel(){
    this.$router.push('/items/list')
  },
  afterupload(res){
    //console.log(res);
      this.$set(this.items,'icon',res)
  }
}
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>