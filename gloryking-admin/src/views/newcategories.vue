<template>
  <el-form @submit.native.prevent label-width="auto">
     <el-form-item label="上级分类" size="normal">
          <el-select v-model="cat.parent">
              <el-option v-for="item in parents"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id">
              </el-option>
          </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="8">
<el-form-item label="分类名称" >
          <el-input v-model="cat.name"></el-input>
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
    cat:{},
    parents:[]
  }
},
methods: {
  async save(){//存储分类
    let res = await this.$http.post('/rest/categories/new',this.cat)
    console.log(res);
    this.$router.push('/categories/list')
    this.$message({
      type:'success',
      message:'新建成功~',
      duration:600
    })
  },
  async getparents(){//获取所有分类
let parents = await this.$http.get('/rest/categories/list')
this.parents = parents.data

  },
  cancel(){
    this.$router.push('/categories/list')
  }
},
async created() {
  await this.getparents()
},
}
</script>

<style>

</style>