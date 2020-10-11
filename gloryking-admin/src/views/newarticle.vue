<template>
  <el-form @submit.native.prevent label-width="auto">
     <el-form-item label="所属分类" size="normal">
          <el-select v-model="article.categories">
              <el-option v-for="item in categories"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id">
              </el-option>
          </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="8">
<el-form-item label="文章标题" >
          <el-input v-model="article.title"></el-input>
      </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
<el-form-item label="文章内容">
          <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="article.detail"></vue-editor>
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
 import { VueEditor } from 'vue2-editor'
export default {
  components: {
        VueEditor
    },
data() {
  return {
    article:{},
    categories:[]
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
  async save(){//存储文章
    let res = await this.$http.post('/rest/articles/new',this.article)
    console.log(res);
    this.$router.push('/articles/list')
    this.$message({
      type:'success',
      message:'新建成功~',
      duration:600
    })
  },
  async getparents(){//获取所有分类
let parents = await this.$http.get('/rest/categories/list')
this.categories = parents.data

  },
  cancel(){
    this.$router.push('/articles/list')
  }
},
async created() {
  await this.getparents()
},
}
</script>

<style>

</style>