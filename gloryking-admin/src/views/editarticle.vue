<template>
  <el-form @submit.native.prevent label-width="auto">
      <el-form-item label="所属分类" size="normal">
          <!-- 
              option里的:key为了vue优化
              :label表示页面上显示啥
              :value表示每个option所代表的真正的值
             select后面的v-model则是把真正的值(:value)与article.categories双向绑定
           -->
          <el-select v-model="article.categories" multiple>
              <el-option v-for="item in categories"
                  :key="item._id" 
                  :label="item.name"
                  :value="item._id">
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="文章标题" >
          <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="24">
<el-form-item label="文章内容">
          <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="article.detail"></vue-editor>
      </el-form-item>
        </el-col>
      </el-row>
       <el-form-item>
        <el-button type="primary" size="default"  native-type="submit" @click="edit">确认修改</el-button>
        <el-button type="info" size="default"  @click="cancel">取消</el-button>
         </el-form-item>
  </el-form>
</template>

<script>
 import { VueEditor } from 'vue2-editor'
export default {
    components: {
        VueEditor
    },
data() {
  return {
    article:{},
    categories:[],
  }
},
methods: {
  async handleImageAdded(file, Editor, cursorLocation, resetUploader){//vue2editor官网的传输形式，用formdata传输，并且把返回的图片的url嵌入文章中，文章就是一个html格式的字符串，点击确认修改后这个字符串保存在数据库中，而url存在字符串里。
     let formdata = new FormData()
     formdata.append('file',file)
     let res = await this.$http.post('upload',formdata)
     let url = res.data
     console.log(url);
     Editor.insertEmbed(cursorLocation, "image", url);
     resetUploader();
  },
    async getarticle(){//根据route中的id请求对应的数据
        let id = this.$route.params.id
        let res = await this.$http.get(`/rest/articles/edit/${id}`)
        console.log(res);
        this.article = res.data
    },
    async edit(){//发送修改数据的put请求
        await this.$http.put(`/rest/articles/edit/${this.article._id}`,this.article)
        this.$router.push('/articles/list')
        this.$message({
      type:'success',
      message:'修改成功~',
      duration:600
    })
    },
    async getcategories(){
        let cats = await this.$http.get('/rest/categories/list')
        this.categories = cats.data
    },
    cancel(){
      this.$router.push('/articles/list')  
    }
},
async created() {
    await this.getarticle()
    await this.getcategories()
},
}
</script>

<style>

</style>