<template>
  <el-table :data="adminusers">
        <el-table-column prop="_id" label="ID">
        </el-table-column>
        <el-table-column prop="username" label="管理员账号" >
        </el-table-column>
        <!-- <el-table-column prop="password" label="管理员密码">
        </el-table-column> -->
         <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="gotoedit(scope.row._id)">编辑</el-button>
        <el-button type="danger" size="small" @click="isdelete(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
</template>

<script>
export default {
    data() {
      return{
        adminusers:[],
        id:''
      }
    },
    methods: {
      async getadminusers(){//向后端获取分类数据
        let cats = await this.$http.get('/rest/adminusers/list')
        this.adminusers = cats.data
        //console.log(cats);
      },
      gotoedit(id){
        this.$router.push(`/adminusers/edit/${id}`)    
      },
         async isdelete(id){
            try {//使用try catch，如果await后面promise返回resolve，也就是点击确定按钮，那么执行1，但如果返回的是reject，会立马跳出try进入catch并执行2。
            this.id = id
              await  this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        })
        //1↓
            this.delete(this.id)
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
        async delete(id){//请求删除对应id的数据
          await this.$http.delete(`/rest/adminusers/delete/${id}`)
          this.getadminusers()
        }
    },
    created() {
      this.getadminusers()
      setTimeout(() => {
        console.log(this.adminusers);
      }, 3000);
    },
    
  };
</script>

<style>
</style>