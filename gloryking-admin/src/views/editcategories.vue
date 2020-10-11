<template>
  <el-form @submit.native.prevent label-width="auto">
      <el-form-item label="上级分类" size="normal">
          <!-- 
              option里的:key为了vue优化
              :label表示页面上显示啥
              :value表示每个option所代表的真正的值
             select后面的v-model则是把真正的值(:value)与cat.parent双向绑定
           -->
          <el-select v-model="cat.parent">
              <el-option v-for="item in parents"
                  :key="item._id" 
                  :label="item.name"
                  :value="item._id">
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="分类名称" >
          <el-input v-model="cat.name"></el-input>
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
    cat:{},
    parents:[],
  }
},
methods: {
    async getcategory(){//根据route中的id请求对应的数据
        let id = this.$route.params.id
        let res = await this.$http.get(`/rest/categories/edit/${id}`)
        console.log(res);
        this.cat = res.data
    },
    async getparents(){//就是请求所有的分类数据
      let pcat = await this.$http.get('/rest/categories/list')  
      this.parents = pcat.data
    },
    async edit(){//发送修改数据的put请求
        await this.$http.put(`/rest/categories/edit/${this.cat._id}`,this.cat)
        this.$router.push('/categories/list')
        this.$message({
      type:'success',
      message:'修改成功~',
      duration:600
    })
    },
    cancel(){
      this.$router.push('/categories/list')  
    }
},
async created() {
    await this.getcategory()
    await this.getparents()
},
}
</script>

<style>

</style>