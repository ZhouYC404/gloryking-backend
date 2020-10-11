<template>
  <el-form @submit.native.prevent label-width="auto">


      <el-form-item label="广告位名称" size="normal">
          <el-row>
              <el-col :span="8" :offset="0">
              <el-input v-model="ad.name"></el-input>
              </el-col>
              <el-col :span="4" :offset="12">
      <el-button type="warning" size="small" @click="ad.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
      </el-col>
      </el-row>
          </el-form-item>
    
   

 <el-row type="flex" justify="space-around" class="rowtest">
      <el-col v-for="(item,index) in ad.items" :key="index" :span="10">
        <el-col :offset="0">
          <el-form-item label="广告图片">
      <el-upload
  class="avatar-uploader"
  :headers="uploadheader()"
  :action="$http.defaults.baseURL + '/upload'"
  :show-file-list="false"
  :on-success="res=>$set(item,'image',res)"
  ><!-- ↑item传不进on-success后面的函数里，用这种方法，可以传item -->
  <!--↑action默认post方式-->
  <img v-if="item.image" :src="item.image" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>

  <el-form-item label="广告跳转链接" size="normal">
              <el-input v-model="item.url"></el-input>
          </el-form-item>

 <el-form-item size="normal">
   <el-button type="danger" @click="isdelete(index)">删除广告</el-button>
   </el-form-item>
        </el-col>
      </el-col>
      <el-divider></el-divider>
</el-row>

       <el-form-item>
        <el-button type="primary" size="default"  native-type="submit" @click="edit">确认修改</el-button>
        <el-button type="info" size="default"   @click="cancel">取消</el-button>
         </el-form-item>
  </el-form>
</template>

<script>
export default {
data() {
  return {
    ad:{
        items:[]
    },
 
  }
},
methods: {
  uploaderr(err, file, fileList){
    let error =  JSON.parse(err.message)
    this.$message({
      type:'error',
      message:error.message,
    })
  },
 async edit(){//发送修改数据的put请求
        await this.$http.put(`/rest/ads/edit/${this.ad._id}`,this.ad)
        this.$router.push('/ads/list')
        this.$message({
      type:'success',
      message:'修改成功~',
      duration:600
    })
    },
  cancel(){
    this.$router.push('/ads/list')
  },
  async isdelete(index){
         try{
           this.index = index
           await  this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        })
        //1↓
          this.ad.items.splice(index,1)//确认删除就把skills数组的相应数据去除
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration:600
          });
          //1↑
        } catch (error) {
            //2↓

          //2↑
        }          
        },
        async getad(){//根据route中的id请求对应的数据
        let id = this.$route.params.id
        let res = await this.$http.get(`/rest/ads/edit/${id}`)
       // console.log(res);
        this.ad = Object.assign({},this.ad,res.data)//使用这种方式可以不让res.data覆盖this.ads，而是和其合并。
        console.log(this.ad);
    }, 
},
async created() {
 await this.getad()
},
}
</script>

<style>
</style>
